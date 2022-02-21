import React, { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
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
`

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const userId = searchParams.get('id')

    const formSubmitHandler = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        const genericError = 'Something went wrong. Please try again.'
  
        if(password === ''){
          setIsSubmitting(false)
          return setError('Please enter a new password')
        }
        fetch(
          // process.env.REACT_APP_API_ENDPOINT + 'api/v1/auth/resetpassword', 
          '/api/v1/auth/resetpassword', 
          {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password, token, userId }),
            credentials: "include"
          }
        )
        .then( async (response) => {
          setIsSubmitting(false)

          if(!response.ok) {
            if(response.status === 401){
              setError('Invalid Password')
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
            navigate('/')
          }
        }).catch(error => {
          setIsSubmitting(false)
          setError(genericError)
        })
      }

      return (
        <Container>
          <Wrapper>
            <Title>New Password</Title>
        
            <Form onSubmit={formSubmitHandler}>

                <Input type='password' id='password' placeholder='New Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        
                <Button type='submit' isSubmitting={isSubmitting}>Reset Password</Button>
                {error && <Error>{error}</Error>}
            </Form>
    
            <Link to='/' style={{ textDecoration: 'none', color: '#0d0d0d'}}>Home</Link>
          </Wrapper>
        </Container>
      )
}

export default ResetPassword