import React from 'react'
import { FiTruck, FiShoppingBag, FiDollarSign, FiMessageSquare } from 'react-icons/fi'

const AboutUs = () => {
  // Array de datos escalable con traducción al inglés
  const aboutData = [
    {
      id: 1,
      icon: <FiTruck className="text-2xl sm:text-3xl text-amber-600" />,
      title: "Shipping",
      text: "Shipping with a minimum surcharge."
    },
    {
      id: 2,
      icon: <FiShoppingBag className="text-2xl sm:text-3xl text-amber-600" />,
      title: "About Us",
      text: "We are entrepreneurs in the textile industry."
    },
    {
      id: 3,
      icon: <FiDollarSign className="text-2xl sm:text-3xl text-amber-600" />,
      title: "Payments",
      text: "The minimum purchase amount is 60,000 pesos."
    },
    {
      id: 4,
      icon: <FiMessageSquare className="text-2xl sm:text-3xl text-amber-600" />,
      title: "Special Orders",
      text: "For custom orders, please contact us directly."
    }
  ]

  return (
    // Degradez
    <div id="about" className="w-full bg-gradient-to-b from-gray-300 via-gray-700 to-black py-16 px-4 sm:px-6 md:px-24 border-b border-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Grilla responsiva: 2 columnas en móvil (2x2), 4 columnas en PC */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {aboutData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Contenedor del Icono */}
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-amber-50 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              
              {/* Título en Negrita */}
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 uppercase tracking-wide">
                {item.title}
              </h3>
              
              {/* Descripción */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AboutUs