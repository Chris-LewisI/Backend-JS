const HttpStatus = require('http-status-codes')

function profile (req, res) {
  return res
    .status(HttpStatus.OK)
    .send(req.employee)
}

module.exports = {
  profile
}
