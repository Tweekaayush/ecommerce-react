import React, { useEffect } from 'react'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { useNavigate, useParams  } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateOrders } from '../features/userSlice'

const Failed = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()

  useEffect(()=>{
    window.scrollTo(0, 0)
    document.title = 'Order Confirmed'
    dispatch(updateOrders(id))
  }, [])  
  return (
    <section id="success">
        <div className="success-container">
            <ErrorOutlineRounded style={{color: 'rgb(250, 11, 102)'}}/>
            <h1>Order Failed!</h1>
            <p className='body-text'>Something went wrong while placing your order. Any money deducted will be refunded to the source in 5-7 business days.</p>
            <button className='section-btn' onClick={()=>navigate('/')}>Back To Home</button>
        </div>
    </section>
  )
}

export default Failed