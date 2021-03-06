import { Auth } from 'aws-amplify'
import React, { useState } from 'react'
import { FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap'
import './Login.css'

import LoaderButton from '../components/LoaderButton'
import { useFormFields } from '../libs/hooksLib'

export default function Login (props) {
  const [isLoading, setIsLoading] = useState(false)
  const [fields, handleFieldChange] = useFormFields({
    email: '', password: ''
  })

  function validateForm () {
    return fields.email.length > 0 && fields.password.length > 0
  }

  async function handleSubmit (event) {
    event.preventDefault()

    setIsLoading(true)

    try {
      await Auth.signIn(fields.email, fields.password)
      props.userHasAuthenticated(true)
    } catch (e) {
      console.error(e.message)
      setIsLoading(false)
    }
  }

  return (
    <div className='Login'>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='email' bsSize='large'>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId='password' bsSize='large'>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type='password'
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type='submit'
          bsSize='large'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  )
}
