const router = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../config/config.js')
const HttpStatus = require('http-status-codes')

const { login, register } = require('./auth')
const { profile } = require('./profile')
const { addGoal, myGoals, deleteGoal } = require('./goals')

// Account Routes
router.post('/api/login', login)
router.post('/api/register', register)
router.get('/api/profile', authenticateToken, profile)

// Task Routes
router.post('/api/addGoal', addGoal)
router.post('/api/deleteGoal', deleteGoal)
router.get('/api/myGoals', myGoals)

function authenticateToken (req, res, next) {
  const authHeader = req.headers.authorization
  var token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send(HttpStatus.getStatusText.UNAUTHORIZED)
  }
  jwt.verify(token, config.ENV.ACCESS_TOKEN_SECRET, (err, employee) => {
    if (err) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .send(HttpStatus.getStatusText.FORBIDDEN)
    } else {
      req.employee = employee
      next()
    }
  })
}
module.exports = router
