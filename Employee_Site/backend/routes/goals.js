const HttpStatus = require('http-status-codes')

const Goals = require('../models/Goals')

function addGoal (req, res) {
  var { goalTitle, goalDescription } = req.body
  console.log(`Goal Title: ${goalTitle}\nGoal Description: ${goalDescription}`)

  Goals.findOne({ goalTitle })
    .then(goals => {
      if (goals) {
        console.log('Goal with that title already created.')
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ status: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) })
      } else {
        const goals = new Goals({
          goalTitle,
          goalDescription,
          employeeID: req.employeeID
        })
          .populate('employeeID')
        goals
          .save((err) => {
            if (!err) {
              Goals.find({})
                .populate('employeeID')
            }
          })
        return res
          .status(HttpStatus.OK)
          .send({ status: HttpStatus.getStatusText(HttpStatus.OK) })
      }
    })
}

function myGoals (req, res) {
  Goals.find({})
    .then(goal => {
      if (goal) {
        return res
          .status(HttpStatus.OK)
          .send(goal)
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send({ error: 'No goals added' })
      }
    })
}

function deleteGoal (req, res) {
  var completedGoal = req.body.completedGoal
  Goals.findOneAndDelete({ goalTitle: completedGoal })
    .then()
  return res
    .status(HttpStatus.OK)
    .send({ status: 'Goal removed.' })
}

module.exports = {
  addGoal,
  myGoals,
  deleteGoal
}
