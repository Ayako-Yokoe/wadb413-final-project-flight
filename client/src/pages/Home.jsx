import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useNavigate } from 'react-router-dom'


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('assets/home.jpg') center;
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
const FormLabel = styled.span`
    font-size: 1.5rem;
    font-weight: 300;
    padding: 1rem;
    ${mobile({ marginRight: 0})}
`
const Select = styled.select`
    padding: 10px;
    width: 60%;
    background-color: #fff;
    border: none;
    ${mobile({ margin : '10px'})}
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
const Option = styled.option``

const Logout = styled.p`
  margin-top: 0.1rem;
  cursor: pointer;
`


const Home = () => {
    const [departure, setDeparture] = useState('')
    const [destination, setDestination] = useState('')
    const [ticketType, setTicketType] = useState('')
    const [date, setDate] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const [userContext, setUserContext] = useContext(UserContext)

    const formSubmitHandler = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')
  
        fetch(process.env.REACT_APP_API_ENDPOINT + 'api/v1/auth/cart', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ departure, destination, ticketType, date }),
          credentials: "include"
        }).then(async response => {
          setIsSubmitting(false)
  
          if(!response.ok){
            if(response.status === 400){
              setError('Missing Field')
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
            setUserContext(prev => ({ ...prev, ...data }))
          }
        }).catch(error => {
          setIsSubmitting(false)
          setError('Something went wrong. Please try again')
      })
    }

    const logoutHandler = () => {
      fetch('/api/v1/auth/logout', {
        method: 'POST',
          headers: { "Content-Type": "application/json" },
          credentials: "include"
      })
      .then(async response => {
        if(response.status === 200){
          setUserContext({})
          navigate('/')
        }
      })
    }


  return (
    <Container>
    <Wrapper>
        <Title>Flight</Title>
        <Form onSubmit={formSubmitHandler}>

            <FormLabel>Leaving from</FormLabel>
            <Select name='departure' value={departure} onChange={(e) => setDeparture(e.target.value)}>
                <Option disabled>from</Option>
                <Option>Toronto Pearson International Airport (YYZ)</Option>
                <Option>Montréal-Trudeau International Airport (YUL)</Option>
                <Option>Vancouver International Airport (YVR)</Option>
                <Option>Calgary International Airport (YYC)</Option>
                <Option>Toronto City Airport (YTZ)</Option>
            </Select>

            <FormLabel>Going to</FormLabel>
            <Select name='destination' value={destination} onChange={(e) => setDestination(e.target.value)}>
                <Option disabled>to</Option>
                <Option>Toronto Pearson International Airport (YYZ)</Option>
                <Option>Montréal-Trudeau International Airport (YUL)</Option>
                <Option>Vancouver International Airport (YVR)</Option>
                <Option>Calgary International Airport (YYC)</Option>
                <Option>Toronto City Airport (YTZ)</Option>
            </Select>

            <FormLabel>Ticket Type</FormLabel>
            <Select name='ticketType' value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                <Option>Round-trip</Option>
                <Option>One-Way</Option>
            </Select>

            <FormLabel htmlFor='date'>Departure Date</FormLabel>
            <Input type='date' id='date' name='date' value={date} onChange={(e) => setDate(e.target.value)} />

      </Form>
      <Button type='submit' onClick={() => navigate('/cart')}>Buy Ticket</Button>

      <Logout onClick={logoutHandler}>Logout</Logout>
    </Wrapper>
    </Container>
  )
}

export default Home
