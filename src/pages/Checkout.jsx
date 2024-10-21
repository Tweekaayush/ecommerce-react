import React, { useState } from 'react'
import Stepper from '../components/Stepper'
import CartCheckout from '../components/CartCheckout'
import AddressCheckout from '../components/AddressCheckout'
import Payment from '../components/Payment'

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const checkoutSteps = [
    {
      name: 'Cart',  
      component: <CartCheckout setCurrentStep={setCurrentStep}/>
    },
    {
      name: 'Address',
      component: <AddressCheckout setCurrentStep={setCurrentStep}/>
    },
    {
      name: 'Payment',
      component: <Payment setCurrentStep={setCurrentStep}/>
    },
  ]

  const ActiveComponent = () => checkoutSteps[currentStep-1].component

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