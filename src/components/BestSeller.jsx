import React from 'react'
import ProductCard2 from './ProductCard2'
import { useSelector } from 'react-redux'

const BestSeller = () => {

    const {bestSellingProducts} = useSelector(state=>state.products.data)
  return (
    <section id="bestseller">
        <div className="bestseller-container">
            <h1 className="section-heading">
                Best Sellers
            </h1>
            <div className="bestseller-list">
                {
                    bestSellingProducts?.map((product)=>{
                        return <ProductCard2 key={product.id} {...product}/>
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default BestSeller