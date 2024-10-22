import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import CategoryBar from '../components/CategoryBar'
import Trending from '../components/Trending'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import PromotionBanner from '../components/PromotionBanner'

const Home = () => {

  useEffect(()=>{
    window.scrollTo(0, 0)
    document.title = 'Ecommerce'
  }, [])

  return (
    <>
        <Hero />
        <CategoryBar />
        <Trending />
        <Category />
        <BestSeller />
        <PromotionBanner />
    </>
  )
}

export default Home