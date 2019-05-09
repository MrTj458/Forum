const express = require('express')
const { check, validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const auth = require('../middleware/auth')

const router = express.Router()

/**
 * Get user with a jwt
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: 'password' },
    })
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).send('Server Error')
  }
})

/**
 * Log in a user
 */
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email or password is incorrect' }] })
      }

      const isMatch = bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email or password is incorrect' }] })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }

      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600,
      })

      return res.json(token)
    } catch (err) {
      console.error(err)
      return res.status(500).send('Server Error')
    }
  }
)

module.exports = router
