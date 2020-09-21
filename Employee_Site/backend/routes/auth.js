const HttpStatus = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config.js')

const Employee = require('../models/Employee')

function login (req, res) {
  var { email, password } = req.body
  console.log(`Email: ${req.body.email}\nPassword: ${req.body.password}`)

  Employee.findOne({ email })
    .then(employee => {
      if (!employee) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ status: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) })
      }
      bcrypt.compare(password, employee.password)
        .then(isCorrect => {
          if (isCorrect) {
            console.log('Logging in...')
            const accessToken = jwt.sign(employee.toJSON(), config.ENV.ACCESS_TOKEN_SECRET, {
              // expressed in seconds
              expiresIn: 60
            })
            return res
              .status(HttpStatus.OK)
              .send({
                status: HttpStatus.getStatusText(HttpStatus.OK),
                accessToken: accessToken
              })
          } else {
            return res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({
                status: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
              })
          }
        })
    })
}

function register (req, res) {
  const { fname, lname, email, password, employeeID } = req.body

  Employee.findOne({ email })
    .then(employee => {
      if (employee) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ status: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) })
      } else {
        const employee = new Employee({
          firstName: fname,
          lastName: lname,
          email,
          password,
          employeeID
        })
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err
          bcrypt.hash(employee.password, salt, (err, hash) => {
            if (err) throw err
            employee.password = hash
            employee
              .save()
            return res
              .status(HttpStatus.OK)
              .send({
                status: HttpStatus.getStatusText(HttpStatus.OK)
              })
          })
        })
      }
    })
    .catch(err => console.log(err))
}

module.exports = {
  login,
  register
}
