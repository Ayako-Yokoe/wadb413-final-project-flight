import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Wrapper = styled.div`
    width: 50%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    ${mobile({ width: '75%'})}
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    width: 60%;
    margin : 10px 5px;
    padding: 10px;
    border: none;
    font-size: 1.0rem;

    &:focus {
        outline: none;
    }
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    margin: 10px;
    font-size: 1.0rem;
    background-color: #0052cc;
    color: white;
    cursor: pointer;
    ${mobile({ fontSize: '0.8em', width: '50%'})}

    &:disabled {
        color: #0052cc;
        cursor: not-allowed;
    }
`
const Error = styled.span`
    color: red;
`
const ToLink = styled.div`
    font-size: 0.9rem;
    margin: 10px;
    cursor: pointer;
`


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [userContext, setUserContext] = useContext(UserContext)
    const navigate = useNavigate()

    const formSubmitHandler = (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError('')

      // fetch(process.env.REACT_APP_API_ENDPOINT + 'api/v1/auth/signin', {
      fetch('/api/v1/auth/signin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      }).then(async response => {
        setIsSubmitting(false)
        if(!response.ok){
          if(response.status === 400){
            setError('Missing Credentials')
          } else if (response.status === 401){
            setError('Invalid email and/or password')
          } else {
            setError('Something went wrong. Please try again')
          }
        } else {
          const data = await response.json()
          setUserContext(prev => ({ ...prev, token: data.token, ...data }))
          navigate('/')
        }
      }).catch(err => {
        setIsSubmitting(false)
        setError('Something went wrong. Please try again')
    })
  }


  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={formSubmitHandler}>
          <Input type='email' id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type='password' id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button type='submit' >Log in</Button>
          {error && <Error>{error}</Error>}
      </Form>
      <Link to='/register' style={{ textDecoration: 'none', color: '#0d0d0d'}}>
        <ToLink>Create A New Account</ToLink>
      </Link>
      <Link to='/forgot' style={{ textDecoration: 'none', color: '#0d0d0d'}}>
        <ToLink>Forgot Password?</ToLink>
      </Link>
    </Wrapper>
  )
}

export default Login