import React, { useId, useRef } from 'react'
import {CardNumberElement, CardCvcElement, CardExpiryElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createOrder } from '../features/userSlice'
import CheckoutCartList from './CheckoutCartList'
import CartSummary from './CartSummary'
import DeliveryAddress from './DeliveryAddress'
import { v4 as uuidv4 } from 'uuid';


const Payment = ({order}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const order_id = uuidv4();

  const placeOrder = () =>{
    const date = new Date()
    const fullDate = String(date.getUTCDate()+'/'+date.getUTCMonth()+ '/' +date.getUTCFullYear())


    const updatedOrder = order.items.map((item)=>{
      let id = uuidv4();
      return {
        ...item,
        totalPrice: item.price*item.quantity,
        purchase_date: fullDate,
        order_status: 'Preparing to Dispatch',
        id: id,
        order_id: order_id
      }
    })
    dispatch(createOrder(updatedOrder))
    navigate('/success')
  }
 
  return (
      <div className="payment-container">
        <div className="cart-checkout-left-container">
          <DeliveryAddress/>
          <CheckoutCartList/>
        </div>
        <div className="cart-checkout-right-container">
          <CartSummary btn={'Checkout'} placeOrder={placeOrder}/>
        </div>
      </div>
  )
}

export default Payment