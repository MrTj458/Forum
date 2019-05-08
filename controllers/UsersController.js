const express = require('express')
const Sequelize = require('sequelize')

const router = express.Router()
const { Op } = Sequelize

// Model imports
const { User } = require('../models')

/**
 * Get all users
 */
router.get('/', async (req, res) => {
  // Find users
  const users = await User.findAll({ attributes: { exclude: 'password' } })

  // Return users
  return res.json(users)
})

/**
 * Get a single user by id
 */
router.get('/:id', async (req, res) => {
  // Find user
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: 'password',
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
 * Create a new user
 */
router.post('/', async (req, res) => {
  // Check for existing user with inputted email or user name
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { userName: req.body.userName }],
    },
  })

  if (user) {
    if (user.email === req.body.email) {
      // Email already in use
      return res.status(400).json({ email: 'Email already in use.' })
    }
    // User name already in use
    return res.status(400).json({ userName: 'User name already taken.' })
  }
  // Create the new user
  const newUser = await User.create(req.body)

  // Remove password before sending back user
  newUser.password = ''

  // Return the new user
  return res.status(201).json(newUser)
})

/**
 * Update an existing user
 */
router.put('/:id', async (req, res) => {
  // Find the user to update
  const user = await User.findOne({ where: { id: req.params.id } })

  // Update the user
  const updatedUser = await user.update(req.body)

  // Remove password before sending back user
  updatedUser.password = ''

  // Return the updated user
  return res.json(updatedUser)
})

/**
 * Delete a user by id
 */
router.delete('/:id', async (req, res) => {
  // Delete the user
  await User.destroy({ where: { id: req.params.id } })

  // Return a success status
  return res.status(204).json()
})

module.exports = router
