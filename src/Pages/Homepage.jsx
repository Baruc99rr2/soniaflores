import React from 'react'
import { Helmet } from 'react-helmet'
import Hero from '../Components/Hero'
import ProductList from '../Components/ProductList'
import Carrusel from '../Components/Carrusel'
import Nosotros from '../Components/Nosotros' // Importamos la nueva sección introductoria
import AboutUs from '../Components/AboutUs'
import Servicios from '../Components/Servicios' // Importamos la nueva sección texturizada

// Importamos el logo para que Vite/React resuelva la ruta física del asset
import SoniaLogo from '../assets/SoniaLogo.png'

const Homepage = () => {
  // Construimos de forma dinámica las URLs absolutas que exigen las redes sociales
  const absoluteLogoUrl = `${window.location.origin}${SoniaLogo}`
  const currentUrl = window.location.href

  return (
    <>
      <Helmet>
        <title>Inmobiliaria Sonia Flores | Propiedades en Jujuy</title>
        <meta name="description" content="Encontrá tu próximo hogar en San Salvador de Jujuy. Alquiler y venta de casas, departamentos, terrenos y locales comerciales. Martillera Sonia Flores MP 177." />
        
        {/* Open Graph / Facebook para la Home */}
        <meta property="og:title" content="Inmobiliaria Sonia Flores | Propiedades en Jujuy" />
        <meta property="og:description" content="Buscás casa, departamento o terreno? Alquileres y ventas en Jujuy con asesoramiento profesional. Martillera Sonia Flores MP 177." />
        <meta property="og:image" content={absoluteLogoUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Inmobiliaria Sonia Flores" />

        {/* Twitter Card para la Home */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Inmobiliaria Sonia Flores | Propiedades en Jujuy" />
        <meta name="twitter:description" content="Alquiler y venta de propiedades en San Salvador de Jujuy." />
        <meta name="twitter:image" content={absoluteLogoUrl} />
      </Helmet>

      <div>
        <Hero />
        <ProductList />
        <Carrusel />
        <Nosotros /> {/* Ubicada estratégicamente antes de AboutUs como carta de presentación */}
        <AboutUs />
        <Servicios /> {/* Ubicada estratégicamente para romper con los fondos oscuros anteriores */}
      </div>
    </>
  )
}

export default Homepage