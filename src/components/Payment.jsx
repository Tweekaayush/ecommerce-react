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
    navigate(`/success/${order_id}`)
  }
 
  return (
      <div className="checkout-container">
        <div className="checkout-left-container">
          <DeliveryAddress/>
          <div className="payment-options-container">
            <h2 className="heading-2">
              Payment Options
            </h2>
            <div className="payment-options-content">
              <div className="payment-options-content-left">
                <h4>Credit/Debit Card</h4>
              </div>
              <div className="payment-options-content-right">
                <div>
                  <h1 className="heading-3">Card Number</h1>
                  <CardNumberElement className='paymentInput'/>
                </div>
                <div>
                <h1 className="heading-3">Expiration Date</h1>
                  <CardExpiryElement className='paymentInput'/>
                </div>
                <div>
                <h1 className="heading-3">Security Code</h1>
                  <CardCvcElement className='paymentInput'/>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="checkout-right-container">
          <CartSummary btn={`Pay $${order?.totalPrice}`} placeOrder={placeOrder}/>
        </div>
      </div>
  )
}

export default Payment