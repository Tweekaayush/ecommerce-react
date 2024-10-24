import React, { useEffect } from 'react'
import { CheckCircleOutline } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

const Success = () => {

    const {id} = useParams()
    const navigate = useNavigate()

  useEffect(()=>{
    window.scrollTo(0, 0)
    document.title = 'Order Confirmed'
  }, [])  
  return (
    <section id="success">
        <div className="success-container">
            <CheckCircleOutline/>
            <h1>Order Confirmed.</h1>
            <p className='body-text'>Your payment has been received and your order will be delivered shortly.</p>
            <p className='body-text'>Order Id - {id}</p>
            <button className='section-btn' onClick={()=>navigate('/')}>Back To Home</button>
        </div>
    </section>
  )
}

export default Success