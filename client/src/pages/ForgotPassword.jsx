import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('assets/register.jpg') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`
const Wrapper = styled.div`
    width: 50%;
    height: auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    ${mobile({ width: '75%'})}
`
const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    margin: 20px 30px;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${mobile({ flexDirection: 'column'})}
`
const Input = styled.input`
    padding: 10px;
    width: 60%;
    background-color: #fff;
    border: none;
    ${mobile({ margin : '10px'})}
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    margin: 1.5rem;
    font-size: 1.0rem;
    font-weight: 400;
    background-color: #0052cc;
    color: white;
    cursor: pointer;
    ${mobile({ fontSize: '0.8em', width: '50%'})}

    &:disabled {
        color: #0052cc;
        cursor: not-allowed;
    }
`
const Error = styled.p`
    color: red;
    margin-bottom: 0.8rem;
`
const Success = styled.p`
    color: green;
    margin-bottom: 0.8rem;
`

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [disableButton, setDisableButton] = useState(false)

    const formSubmitHandler = (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError('')
      setSuccess('')
      setDisableButton(false)

      const genericError = 'Something went wrong. Please try again.'

      if(email === ''){
        setIsSubmitting(false)
        return setError('Please enter an email')
      }

      fetch(
        process.env.REACT_APP_API_ENDPOINT + 'api/v1/auth/requestresetpassword', 
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include"
        }
      )
      .then( async (response) => {
        setIsSubmitting(false)

        if(!response.ok) {
          if(response.status === 401){
            setError('Invalid Email')
          } else if (response.status === 500) {
            const data = await response.json()
            if (data.error) {
              setError(data.error || genericError)
            } else {
              setError(genericError)
            }
          } else {
            setError(genericError)
          }
        } else {
          setDisableButton(true)
          return setSuccess('Instruction to reset password has been sent to your email address')
        }
      }).catch(error => {
        setIsSubmitting(false)
        setError(genericError)
      })
    }

  return (
    <Container>
      <Wrapper>
        <Title>Reset Password</Title>
          <Form onSubmit={formSubmitHandler}>
              <Input type='email' id='email' placeholder='Email' value={email} disabled={disableButton} onChange={(e) => setEmail(e.target.value)} />

              <Button type='submit' isSubmitting={isSubmitting} disabled={disableButton}>Send Me Email</Button>
          </Form>

          {error && <Error>{error}</Error>}<br/>
          {success && <Success>{success}</Success>}<br/>

        <Link to='/' style={{ textDecoration: 'none', color: '#0d0d0d'}}>Home</Link>
    </Wrapper>
    </Container>
  )
}

export default ForgotPassword