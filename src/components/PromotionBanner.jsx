import React from 'react'
import banner from '../assets/images/Hero/banner2.jpg'

const PromotionBanner = () => {
  return (
    <section id="promotion">
        <div className="promotion-container">
            <div className="promotion-left-container">
                <img src={banner} alt="" className="promotion-banner-img" />
            </div>
            <div className="promotion-right-container">
                <h1>
                    Comfortable & Elegante Living
                </h1>
                <p className="body-text">
                RAOUF Products are all made to standard sizes so that you can mix and match them freely.
                </p>
                <a href="/browse" className="section-btn">Shop Now</a>
            </div>
        </div>
    </section>
  )
}

export default PromotionBanner