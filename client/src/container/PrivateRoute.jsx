import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


const PrivateRoute = () => {
    let [userContext] = useContext(UserContext)

  return Object.keys(userContext).length === 0 ? <Navigate to='/login' /> : <Outlet /> 
}

export default PrivateRoute