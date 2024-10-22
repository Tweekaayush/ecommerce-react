import { useSelector } from 'react-redux'
import CartSummary from './CartSummary'
import CheckoutCartList from './CheckoutCartList'

const CartCheckout = ({setCurrentStep, setOrder}) => {

    const {cartItems} = useSelector(state=>state.cart) 

    const placeOrder = (e) =>{
        setOrder({
            items: cartItems,
            totalPrice: e
        })

        setCurrentStep(2)
    }
  return (
    <div className="cart-checkout-container">
        <div className="cart-checkout-left-container">
            <CheckoutCartList/>
        </div>
        <div className="cart-checkout-right-container">
            <CartSummary placeOrder={placeOrder} btn={'Place order'}/>
        </div>
    </div>
  )
}

export default CartCheckout