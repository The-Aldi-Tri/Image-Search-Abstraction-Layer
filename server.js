require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./routes/api.js')
const connectDb = require('./connection/database.js')

const app = express()

app.use('/public', express.static(process.cwd() + '/public'))
app.use(cors({ origin: '*' }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect database
const MONGO_URI = process.env.MONGO_URI
connectDb(MONGO_URI)

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html')
  })

// User routes
userRoutes(app)

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found')
})

const portNum = process.env.PORT || 3000

// Start our server and tests!
app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`)
})

module.exports = app // For testing
