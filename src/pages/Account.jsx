import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import OrderHistoryPrev from '../components/OrderHistoryPrev'

const Account = () => {

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
        <Profile/>  
    </>
  )
}

export default Account