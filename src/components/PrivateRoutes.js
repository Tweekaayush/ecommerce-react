import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const {uid} = useSelector(state => state.user)
  return (
    <>
        {
            uid?(
                <Outlet/>
            ):(
                <Navigate to ='/login' />
            )   
        }
    </>
  )
}

export default PrivateRoutes