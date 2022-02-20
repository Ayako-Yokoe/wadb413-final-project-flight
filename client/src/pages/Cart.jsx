import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`
const Heading = styled.h2`
  font-size: 3rem;
  color: #0052cc;
`


const Cart = () => {
  return (
    <Container>
      <Heading>Thank you</Heading>
    </Container>
  )
}

export default Cart