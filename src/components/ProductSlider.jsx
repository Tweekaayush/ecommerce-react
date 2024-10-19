import React from 'react'
import ProductCard from './ProductCard'

const ProductSlider = ({products}) => {
  return (
    <div className="slider-container" id="trendingSlider">
        {
            products?.map((product)=>{
                return <ProductCard key={product.id} {...product}/>
            })
        }
    </div>
  )
}

export default ProductSlider