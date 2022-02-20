import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import PrivateRoute from './container/PrivateRoute'
import ResetPasswordContainer from './container/ResetPasswordContainer'
import Home from './pages/Home'
import Cart from './pages/Cart'

import LoginContainer from './container/LoginContainer'
import RegisterContainer from './container/RegisterContainer'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />  
        </Route>

        <Route path='/register' element={<RegisterContainer />} />
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/passwordreset' element={<ResetPasswordContainer />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

