import React from 'react'
import Hero from '../Components/Hero'
// import HeroStats from '../Components/HeroStats'
import ProductList from '../Components/ProductList'
import Carrusel from '../Components/Carrusel'
import Nosotros from '../Components/Nosotros' // Importamos la nueva sección introductoria
import AboutUs from '../Components/AboutUs'
import Servicios from '../Components/Servicios' // Importamos la nueva sección texturizada

const Homepage = () => {
  return (
    <div>
      <Hero />
      {/* <HeroStats /> */}
      <ProductList />
      <Carrusel />
      <Nosotros /> {/* Ubicada estratégicamente antes de AboutUs como carta de presentación */}
      <AboutUs />
      <Servicios /> {/* Ubicada estratégicamente para romper con los fondos oscuros anteriores */}
    </div>
  )
}

export default Homepage