import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Register from '../pages/Register'
import Home from '../pages/Home'
import styled from 'styled-components'


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('assets/register.jpg') center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const RegisterContainer = () => {
    const [userContext, setUserContext] = useContext(UserContext)

  return (
    <>
      {!userContext.token ? ( <Container><Register /></Container>) 
      : userContext.token ? ( <div><Home /></div> )
      : ( <div>Loading...</div> )
      }
    </>
  )
}

export default RegisterContainer