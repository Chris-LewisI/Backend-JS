import React from 'react'
import { CardContent, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import SignIn from './SignIn/Login'
import bfwLogo from '../../Assets/bfwLogo.png'
import './Form.css'

const useStyles = makeStyles({
  builderCard: {
    backgroundColor: 'rgb(218, 218, 218)',
    display: 'flex',
    boxShadow: '0px 2px 1px #ccc',
    margin: ' auto',
    flexFlow: 'column',
    alignItems: 'center',
    width: '70%'
  },
  SubmitStyle: {
    backgroundColor: '#ffab00',
    color: 'white'
  }
})

const FormB = (props) => {
  const classes = useStyles()

  return (
    <Card variant="outlined" className={classes.builderCard} >
      <CardContent className={classes.builderCard}>
        <img src={bfwLogo} className={classes.logo} alt="burgerLogo" width="75" height="75"/>
        <SignIn></SignIn>
      </CardContent>
    </Card>
  )
}

export default FormB
