import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Homepage from './Pages/Homepage'
import Cart from './Components/Cart'
import ProductDetails from './Pages/ProductDetails'
// IMPORTAMOS EL NUEVO COMPONENTE DE BÚSQUEDA
import Busqueda from './Components/Busqueda/Busqueda' 
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <Routes>
        <Route path='/' element = {<Homepage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetails />} /> 
        
        {/* AGREGAMOS LA RUTA PARA LA PÁGINA DE BÚSQUEDA */}
        <Route path='/busqueda' element={<Busqueda />} /> 
      </Routes>

      <Footer />
    </div>
  )
}

export default App