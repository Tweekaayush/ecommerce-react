import React, { useEffect, useState } from 'react'
import ProductCard3 from '../components/ProductCard3'
import { useSelector } from 'react-redux'
import emptyWishlist from '../assets/images/cart/wishlist.png'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {

    const {wishlist} = useSelector(state => state.user)
    const [wishlistLength, setWishlistLength] = useState(0)
    const navigate = useNavigate()

    const handleRedirect = () =>{
        navigate('/login')
    }

    useEffect(()=>{
        setWishlistLength(wishlist?.length || 0)
    },[wishlist])

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

  return (
    <section id="wishlist">
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h1 className="section-heading">
                    My Wishlist
                    <p>
                        ( {wishlistLength} items )
                    </p>
                </h1>
            </div>
            {
                wishlist.length?(            
                    <div className="wishlist-grid">
                        {
                            wishlist?.map((product)=>{
                                return <ProductCard3 key={product.id} {...product}/>
                            })
                        }
                    </div>
                ):(
                    <div className='empty-wishlist'>
                        <img src={emptyWishlist} alt="empty-wishlist" />
                        <button className="section-btn" onClick={handleRedirect}>
                            Sign in to View your Wishlist!
                        </button>
                    </div>
                )
            }
        </div>
    </section>
  )
}

export default Wishlist