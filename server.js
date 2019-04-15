require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3001
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Controller imports
const UsersController = require('./controllers/UsersController')

// Route setup
app.use('/', express.static('public'))
app.use('users', UsersController)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
