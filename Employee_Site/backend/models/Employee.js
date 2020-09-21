var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.set('useCreateIndex', true)

var employeeSchema = new Schema({
  firstName: {
    type: String,
    unique: false,
    required: true
  },
  lastName: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  employeeID: {
    type: String,
    required: true,
    unique: true
  }
},
{ collection: 'Employees' }
)

module.exports = mongoose.model('Employee', employeeSchema)
