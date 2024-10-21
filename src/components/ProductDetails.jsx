import React from 'react'

const ProductDetails = ({product}) => {
    const {size, weight, texture} = product
  return (
    <section id="product-details">
        <div className="product-detail-container">
            <h1 className="section-heading">Product Details</h1>
            <ul className="product-details-content">
                <li>
                    <h2>Dimension(cm):</h2>
                    <p>{size}</p>
                </li>
                <li>
                    <h2>Weight:</h2>
                    <p>{weight}</p>
                </li>
                <li>
                    <h2>Texture:</h2>
                    <p>{texture}</p>
                </li>
            </ul>
        </div>
    </section>
  )
}

export default ProductDetails