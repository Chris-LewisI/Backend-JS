import React from 'react'
import { Formik } from 'formik'
import Axios from 'axios'
import { TextField, Button } from '@material-ui/core'
import './Login.css'

const BasicSignIn = () => {
  return (
    <div>
      <Formik initialValues={{ email: '', password: '' }}
        onSubmit={(data, { setSubmitting }) => {
          Axios({
            method: 'post',
            url: 'api/login',
            data
            })          
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }}

        validate={data => {
          const errors = {}
          if (!data.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
          ) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
          <form className='signin-form'>
            <div style={{ padding: 10 }}>
              <TextField
                error={errors.email}
                helperText={errors.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label="Email"
                type="email"
                variant="outlined" />
            </div>
            <div style={{ padding: 10 }}>
              <TextField
                error={errors.password}
                helperText={errors.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined" />
            </div>

            <div style={{justifyContent:'center',margin:'0',display: 'flex'}}>
              <Button 
                type="submit"
                variant="outlined"
                size="large"
                
                onClick={handleSubmit}>Submit</Button>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}
export default BasicSignIn
