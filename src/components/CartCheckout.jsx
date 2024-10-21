import CartItem2 from './CartItem2'
import { useSelector } from 'react-redux'
import CartSummary from './CartSummary'

const CartCheckout = ({setCurrentStep}) => {

    const {cartItems, totalProducts} = useSelector(state=>state.cart) 

    const placeOrder = (e) =>{
        const order = {
            items: cartItems,
            price: e
        }
        setCurrentStep(2)
    }
  return (
    <div className="cart-checkout-container">
        <div className="cart-checkout-left-container">
            <h1 className="heading-2">
                Cart items ({totalProducts} items):
            </h1>
            <div className="cart-checkout-items">
                {
                    cartItems?.map((item)=>{
                        return <CartItem2 key={item.id} {...item}/>
                    })
                }
            </div>
        </div>
        <div className="cart-checkout-right-container">
            <CartSummary placeOrder={placeOrder} btn={'Place order'}/>
        </div>
    </div>
  )
}

export default CartCheckout