var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.set('useCreateIndex', true)

var goalsSchema = new Schema({
  goalTitle: {
    type: String,
    unique: false
  },
  goalDescription: {
    type: String,
    unique: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    unique: false
  }
},
{ collection: 'Goals' }
)

module.exports = mongoose.model('Goals', goalsSchema)
