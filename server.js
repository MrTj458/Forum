require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3001
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ message: 'Success!' })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
