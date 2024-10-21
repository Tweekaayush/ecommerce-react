import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Close } from '@mui/icons-material'
import { moveToCart, removeFromWishlist } from '../features/userSlice'

const ProductCard3 = ({product}) => {
    const {img, title, price, ratings, id} = product
    const navigate = useNavigate()
    const dispatch = useDispatch()

  return (
    <div className="product-card" onClick={()=>navigate(`/product/${id}`)}>
        <Close className='product-class-close' onClick={(e)=>[e.stopPropagation(), dispatch(removeFromWishlist(id))]}/>
        <div className="product-card-head">
            <img src={img} alt={title} className='product-card-img2'/>
        </div>
        <div className="product-card-content">
            <h3>{title}</h3>
            <p>
                {ratings}
                <Rating name='half-rating-read' value={ratings} precision={0.1} readOnly/>
            </p>
            <p>Rs. {price}</p>
            <button 
                className="section-btn"
                onClick={(e)=>[e.stopPropagation(), dispatch(moveToCart({...product, quantity: 1}))]}
            >
                Move To Cart
            </button>
        </div>

    </div>
  )
}

export default ProductCard3