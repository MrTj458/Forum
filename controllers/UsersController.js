const express = require('express')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const router = express.Router()

// Model imports
const { User } = require('../models')

/**
 * Register User
 */
router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('userName', 'User name must be at least 2 characters').isLength({
      min: 2,
    }),
    check('password', 'Password must be 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { userName, email, password } = req.body

    try {
      let user = await User.findOne({
        where: { email },
      })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'This email is already in use' }] })
      }

      user = await User.findOne({
        where: { userName },
      })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'This user name is already in use' }] })
      }

      user = new User()
      user.email = email
      user.userName = userName

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

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

/**
 * Get a single user by id or user name
 */
router.get('/:id', async (req, res) => {
  // Find user
  const user = await User.findOne({
    where: !isNaN(req.params.id)
      ? { id: req.params.id }
      : { userName: req.params.id },
    attributes: {
      exclude: ['password', 'email'],
    },
  })

  // Check if a user was found
  if (!user) {
    // Return a not found message
    return res.status(404).json({ error: 'No user found' })
  }

  // Return the user
  return res.json(user)
})

/**
 * Update an existing user
 */
router.put('/', auth, async (req, res) => {
  try {
    // Find the user to update
    const user = await User.findOne({ where: { id: req.user.id } })

    // Update the user
    const updatedUser = await user.update(req.body)

    // Remove password before sending back user
    updatedUser.password = ''

    // Return the updated user
    return res.json(updatedUser)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Server Error')
  }
})

/**
 * Delete a user by id
 */
router.delete('/', auth, async (req, res) => {
  try {
    // Delete the user
    await User.destroy({ where: { id: req.user.id } })

    // Return a success status
    return res.status(204).json()
  } catch (err) {
    console.error(err)
    return res.status(500).send('Server Error')
  }
})

module.exports = router
