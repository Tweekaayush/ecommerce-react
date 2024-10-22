import React, { useRef } from 'react'
import {CardNumberElement, CardCvcElement, CardExpiryElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createOrder } from '../features/userSlice'

const Payment = ({order}) => {

  const stripe = useStripe()
  const elements = useElements()
  const payBtn = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {username, email} = useSelector(state=>state.user.data)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    payBtn.current.disabled = true

    try{
      if(!stripe || !elements) return

      const result = await stripe.confirmCardPayment(process.env.REACT_APP_STRIPE_SECRET_KEY, {
        payment_method:{
          card: elements.getElement(CardNumberElement),
          order: {...order}
        }
      })
  
      if(result.error){
        payBtn.current.disable = false
        alert(result.error.message)
      }else{
        order = { ...order,
          id: result.paymentIntent.id,
          status: result.paymentIntent.status
        }
        dispatch(createOrder(order))
        if(result.paymentIntent.status === "succeeded"){
          navigate("/success")
        }else{
          navigate('/unsuccess')
        }
      }
    }catch(error){
      payBtn.current.disable = false
      alert(error.response.data.message)
    }
  }

  return (
      <div className="payment-contaienr">
        <form onSubmit={handleSubmit}>
          <CardNumberElement/>
          <CardCvcElement/>
          <CardExpiryElement/>
          <input type="submit" value="Pay" ref={payBtn}/>
        </form>
      </div>
  )
}

export default Payment