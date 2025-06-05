import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoute = ({allowedRole}) => {
    console.log(allowedRole);
    
  return (
    <Outlet/>
  )
}

export default PrivateRoute