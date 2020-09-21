const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const ENV = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}

module.exports = { ENV }
