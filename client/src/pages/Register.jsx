import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Wrapper = styled.div`
    width: 50%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    ${mobile({ width: '75%' })}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${mobile({ flexDirection: 'column'})}
`
const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
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
    margin: 1rem;
    padding: 15px 20px;
    font-size: 1.0rem;
    background-color: #0052cc;
    color: white;
    cursor: pointer;
    ${mobile({ fontSize: '0.8em', width: '50%'})}
`
const Error = styled.span`
    color: red;
`
const ToLogin = styled.div`
    font-size: 0.9rem;
    margin: 10px;
    cursor: pointer;
`


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const [userContext, setUserContext] = useContext(UserContext)

    const formSubmitHandler = (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError('')
      
      fetch(process.env.REACT_APP_API_ENDPOINT + 'api/v1/auth/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include"
      }).then(async response => {
        setIsSubmitting(false)

        if(!response.ok){
          if(response.status === 400){
            setError('Missing Field')
          } else if (response.status === 401){
            setError('Invalid email and/or password')
          } else if (response.status === 500) {
            const data = await response.json()
            if(data.message){
              setError(data.message || 'Something went wrong. Please try again')
            } else {
              setError('Something went wrong. Please try again')
            }
          } else {
            setError('Something went wrong. Please try again')
          }
        } else {
          const data = await response.json()
          setUserContext(prev => ({ ...prev, token: data.token }))
        }
      }).catch(error => {
        setIsSubmitting(false)
        setError('Something went wrong. Please try again')
    })
  }

  return (
    <Wrapper>
      <Title>CREATE AN ACCOUNT</Title>
      <Form onSubmit={formSubmitHandler}>
          <Input type='text' id='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          <Input type='email' id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type='password' id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button type='submit'>Register</Button>

          {error && <Error>{error}</Error>}
      </Form>
      <Link to='/login' style={{ textDecoration: 'none', color: '#0d0d0d'}}>
        <ToLogin >Already have an account</ToLogin>
      </Link>
    </Wrapper>
  )
}

export default Register