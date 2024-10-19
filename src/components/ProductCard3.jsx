import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import { Close } from '@mui/icons-material'

const ProductCard3 = ({img, title, price, ratings, id}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

  return (
    <div className="product-card" onClick={()=>navigate(`/product/${id}`)}>
        <Close className='product-class-close'/>
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
                onClick={(e)=>[e.stopPropagation(), dispatch(addToCart({id: id, title: title, price: price, ratings:ratings, img:img, quantity: 1}))]}
            >
                Move To Cart
            </button>
        </div>

    </div>
  )
}

export default ProductCard3