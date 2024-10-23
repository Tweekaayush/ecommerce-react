import React, { useEffect, useState } from 'react'
import {Close} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changeItemQuantity, removeFromCart } from '../features/cartSlice';

const CartItem = ({img, title, price, quantity, id}) => {

    const dispatch = useDispatch()
    const [itemQuantity, setItemQuantity] = useState(quantity)

    useEffect(()=>{
        dispatch(changeItemQuantity({quantity: itemQuantity, id: id}))
    }, [itemQuantity])

    useEffect(()=>{
        setItemQuantity(quantity)
    }, [quantity])

  return (
    <div className="cart-item">
        <div className="cart-item-img">
            <img src={img} alt="" />
        </div>
        <div className="cart-middle">
            <h3>{title}</h3>
            <p>
                <span>$ </span>
                {price}
            </p>
            <div className="cart-quantity-container">
                <button onClick={()=>setItemQuantity(prev=> prev-1)}>-</button>
                <p>{itemQuantity}</p>
                <button onClick={()=>setItemQuantity(prev => prev+1)}>+</button>
            </div>
        </div>
        <Close onClick={()=>dispatch(removeFromCart(id))} />
    </div>
  )
}

export default CartItem