import React, { useEffect, useState } from 'react'
import {Favorite, ShoppingCart} from '@mui/icons-material';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { addToWishlist } from '../features/userSlice';

const ProductContent = ({product}) => {

    const {title, description, price, ratings, img, otherImgs, id} = product
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [displayImg, setDisplayImg] = useState(img)
    const {wishlist} = useSelector(state=>state.user.data)
    const [inWishlist,  setInWishlist] = useState(false)

    const checkWishlist = () =>{
        const found = wishlist?.find((product)=>product.id === id)
        if(found !== undefined){
            setInWishlist(true)
        }
        else{
            setInWishlist(false)
        }
    }

    useEffect(()=>{
        setDisplayImg(img)
    }, [img])

    useEffect(()=>{
        checkWishlist()
    }, [wishlist, id])

  return (
    <section id="product-content">
        <div className="product-content-container">
            <div className="product-content-left">
                <div className="product-img-display">
                    <img src={displayImg} alt={title} />
                </div>
                <div className="product-img-list">
                    <div key={img} className='product-img-item' onClick={()=>setDisplayImg(img)}>
                        <img src={img} alt={title} />
                    </div>
                    {
                        otherImgs?.map((imgs)=>{
                            return <div key={imgs} className='product-img-item' onClick={()=>setDisplayImg(imgs)}>
                                        <img src={imgs} alt={title} />
                                    </div>
                        })
                    }
                </div>
            </div>
            <div className="product-content-right">
                <div className="product-headers">
                    <h1>{title}</h1>
                    <h2>
                        {ratings} 
                        {ratings && <Rating name='half-rating-read' value={ratings} precision={0.1} readOnly/>}
                    </h2>
                </div>
                <p className="body-text">
                    {description}
                </p>
                <p className="product-price">
                    $ {price} 
                </p>
                <div className="product-quantity-container">
                    <button onClick={()=>quantity !== 1?setQuantity(quantity-1):setQuantity(1)}>-</button>
                    <p>{quantity}</p>
                    <button onClick={()=>setQuantity(quantity + 1)}>+</button>
                </div>
                <div className="product-btns">
                    <button onClick={()=>dispatch(addToCart({...product, quantity: quantity }))}> <ShoppingCart/> Add to cart</button>
                    <button disabled={inWishlist} className={inWishlist?'product-in-wishlist':''} onClick={()=>dispatch(addToWishlist({...product}))}> <Favorite/> wishlist</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProductContent