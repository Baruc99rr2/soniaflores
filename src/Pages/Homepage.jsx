import React from 'react'
import Hero from '../Components/Hero'
// import HeroStats from '../Components/HeroStats'
import ProductList from '../Components/ProductList'
import Carrusel from '../Components/Carrusel'
import AboutUs from '../Components/AboutUs' // 1. Importamos la nueva sección

const Homepage = () => {
  return (
    <div>
      <Hero />
      {/* <HeroStats /> */}
      <ProductList />
      <Carrusel />
      <AboutUs /> {/* 2. La ubicamos debajo del Carrusel */}
    </div>
  )
}

export default Homepage