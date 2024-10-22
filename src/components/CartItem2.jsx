import React, { useEffect, useState } from 'react'
import {Delete} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changeItemQuantity, removeFromCart } from '../features/cartSlice';

const CartItem2 = ({img, title, price, quantity, id}) => {

    const dispatch = useDispatch()
    const [itemQuantity, setItemQuantity] = useState(quantity)

    useEffect(()=>{
        dispatch(changeItemQuantity({quantity: itemQuantity, id: id}))
    }, [itemQuantity])

    useEffect(()=>{
        setItemQuantity(quantity)
    }, [quantity])

  return (
    <div className="cart-checkout-item">
        <div className="cart-checkout-item-details">
            <div>
                <img src={img} alt="" />
            </div>
            <h3>{title}</h3>
        </div>
        <div className="cart-checkout-item-price">
            <p>
                <span>Rs.</span>
                {price}
            </p>
        </div>
        <div className="cart-quantity-container">
            <button onClick={()=>setItemQuantity(prev=> prev-1)}>-</button>
                <p>{itemQuantity}</p>
            <button onClick={()=>setItemQuantity(prev => prev+1)}>+</button>
        </div>
        <div className="cart-checkout-item-subtotal">
            <p>
                Rs. {price * quantity}
            </p>
        </div>
        <div>
            <Delete onClick={()=>dispatch(removeFromCart(id))} />
        </div>
    </div>
  )
}

export default CartItem2