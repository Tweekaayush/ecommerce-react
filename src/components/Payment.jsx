import React, { useRef } from 'react'
import {CardNumberElement, CardCvcElement, CardExpiryElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createOrder } from '../features/userSlice'

const Payment = ({order}) => {

  const stripe = useStripe(process.env.REACT_APP_STRIPE_SECRET_KEY)
  const elements = useElements()
  const payBtn = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    payBtn.current.disable = true

    try{

      if(!stripe || !elements) return

      var intent = stripe.elements({
        mode: 'payment',
        currency: 'inr',
        amount: order.totalPrice
      })

      const result = await stripe.confirmCardPayment(intent, {
        payment_method:{
          card: elements.getElement(CardNumberElement),
          billing_details: {...order}
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
      console.log(error, order.totalAmount)
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