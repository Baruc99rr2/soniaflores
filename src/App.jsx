import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Homepage from './Pages/Homepage'
import Cart from './Components/Cart'
import ProductDetails from './Pages/ProductDetails'
import { Routes, Route } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa' // Importamos el ícono para el botón flotante

const App = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <Routes>
        <Route path='/' element = {<Homepage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetails />} /> 
      </Routes>

      {/* BOTÓN FLOTANTE DE WHATSAPP
        - fixed: Lo clava en la pantalla aunque hagas scroll.
        - bottom-6 right-6: Margen cómodo abajo a la derecha.
        - z-50: Asegura que flote por encima de cualquier otro elemento o imagen.
      */}
      <a 
        href="https://wa.me/5493885174084" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group animate-bounce-subtle"
        title="Chatear por WhatsApp"
      >
        <FaWhatsapp className="text-3xl md:text-4xl filter drop-shadow-sm" />
        
        {/* Tooltip flotante: aparece con un efecto suave al pasar el mouse (solo en PC) */}
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md hidden sm:block">
          ¿Necesitas ayuda? 👋
        </span>
      </a>

      <Footer />
    </div>
  )
}

export default App