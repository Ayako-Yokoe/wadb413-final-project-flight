import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Login from '../pages/Login'
import styled from 'styled-components'
import Home from '../pages/Home'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('assets/login.jpg') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const LoginContainer = () => {
    const [userContext, setUserContext] = useContext(UserContext)

  return (
    <>
      {!userContext.token ? ( <Container><Login /></Container>) 
      : userContext.token ? ( <Home /> )
      : ( <div>Loading...</div> )
      }
    </>
  )
}

export default LoginContainer