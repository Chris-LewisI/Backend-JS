// import all required packages and libraries
const express = require('express')
const bodyParser = require('body-parser')
const proxy = require('express-http-proxy')
const mongoose = require('mongoose')
const config = require('./config/config.js')

// establish connection to AWS database with MongoDB
try {
  mongoose.connect(config.ENV.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('Connected to MongoDB AWS Database.')
} catch (err) {
  console.log('Could not connect to DB.')
  console.log(err)
}

// initialize server client
const app = express()
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routes'))

// Proxy to reroute requests
app.get('/*', proxy('localhost:3000'))

// open port to connect to
app.listen(config.ENV.PORT)
