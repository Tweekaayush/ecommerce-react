import React, { useState, useEffect } from 'react'
import Stepper from '../components/Stepper'
import CartCheckout from '../components/CartCheckout'
import AddressCheckout from '../components/AddressCheckout'
import Payment from '../components/Payment'
import {ShoppingCart, Home, AccountBalance} from '@mui/icons-material';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const Checkout = () => {
  const [order, setOrder] = useState({})
  const [currentStep, setCurrentStep] = useState(1)

  const checkoutSteps = [
    {
      name: 'Cart',  
      component: <CartCheckout setCurrentStep={setCurrentStep} order={order} setOrder={setOrder}/>,
      icon: <ShoppingCart/>,
      title: 'Shopping Cart'
    },
    {
      name: 'Address',
      component: <AddressCheckout setCurrentStep={setCurrentStep} order={order} setOrder={setOrder}/>,
      icon: <Home/>,
      title: 'Delivery Address'
    },
    {
      name: 'Payment',
      component: <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY)}>
                  <Payment setCurrentStep={setCurrentStep} order={order} setOrder={setOrder}/>
                </Elements>,
      icon: <AccountBalance/>,
      title: 'Review Order'
    },
  ]

  const ActiveComponent = () => checkoutSteps[currentStep-1]?.component

  useEffect(()=>{
    document.title = checkoutSteps[currentStep-1]?.title
  }, [currentStep])

  return (
    <>
      <section id='checkout'>
        <div className="checkout-pg-container">
          <Stepper checkoutSteps={checkoutSteps} currentStep={currentStep} setCurrentStep={setCurrentStep}/>
          <ActiveComponent/>
        </div>
      </section>
    </>
  )
}

export default Checkout