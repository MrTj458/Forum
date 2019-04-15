require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const port = process.env.PORT || 3001
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Controller imports
const UsersController = require('./controllers/UsersController')

// Route setup
app.use('/api/users', UsersController)

// Send react app when not accessing api
app.use(express.static(path.resolve(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
