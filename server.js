require('dotenv').config()

const express = require('express')
const path = require('path')

const port = process.env.PORT || 3001
const app = express()

app.use(express.json({ extended: false }))

// Route setup
app.use('/api/auth', require('./controllers/AuthController'))
app.use('/api/users', require('./controllers/UsersController'))

// Send react app when not accessing api
app.use(express.static(path.resolve(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
