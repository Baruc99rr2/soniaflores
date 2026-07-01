import React from 'react'
import { BsInstagram, BsTwitterX } from 'react-icons/bs'
import { FaFacebook, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    // Conservamos el ID 'contact' para tu Navbar
    <div id="contact" className='bg-black text-white pt-12 pb-16 md:pb-20'>
      
      {/* Contenedor principal: una sola columna en móvil, dos columnas en PC */}
      <div className='max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 pb-10 border-b border-gray-800'>
        
        {/* Lado Izquierdo: Info del negocio, Datos de Contacto y Redes */}
        <div className='flex flex-col justify-center space-y-5 text-center md:text-left'>
          <div>
            <h2 className='text-3xl font-bold tracking-wide text-amber-500'>Express Web</h2>
            <p className='text-gray-400 text-sm max-w-sm mx-auto md:mx-0 mt-2'>
              Visit us at our physical store to discover the latest trends and exclusive collections.
            </p>
          </div>

          {/* Bloque de Datos de Contacto */}
          <div className='flex flex-col gap-3 bg-gray-900/50 p-4 rounded-xl max-w-sm mx-auto md:mx-0 border border-gray-800/60 text-left w-full'>
            
            {/* Dirección */}
            <div className='flex items-center gap-3'>
              <FaMapMarkerAlt className='text-amber-500 text-lg shrink-0 w-5' />
              <div>
                <p className='text-white font-semibold text-xs sm:text-sm'>Our Store</p>
                <p className='text-gray-400 text-xs'>Calle San Lorenzo N° 66</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className='flex items-center gap-3 border-t border-gray-800/60 pt-2'>
              <FaPhoneAlt className='text-amber-500 text-base shrink-0 w-5' />
              <div>
                <p className='text-white font-semibold text-xs sm:text-sm'>Phone</p>
                <p className='text-gray-400 text-xs'>+54 9 388 5174084</p>
              </div>
            </div>

            {/* Email */}
            <div className='flex items-center gap-3 border-t border-gray-800/60 pt-2'>
              <FaEnvelope className='text-amber-500 text-base shrink-0 w-5' />
              <div>
                <p className='text-white font-semibold text-xs sm:text-sm'>Email Address</p>
                <p className='text-gray-400 text-xs break-all'>baruc276@gmail.com</p>
              </div>
            </div>

          </div>
          
          {/* Redes Sociales y WhatsApp Directo */}
          <div className='flex justify-center md:justify-start space-x-6 pt-1 items-center'>
            <a href="https://wa.me/5493885174084" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className='text-2xl cursor-pointer hover:text-green-500 transition duration-300' title="Chat on WhatsApp"/>
            </a>
            <FaFacebook   className='text-2xl cursor-pointer hover:text-blue-500 transition duration-300 '/>
            <BsInstagram  className='text-2xl cursor-pointer hover:text-pink-500 transition duration-300 '/>
            <BsTwitterX   className='text-2xl cursor-pointer hover:text-gray-400 transition duration-300 '/>
          </div>
        </div>

        {/* Lado Derecho: Tu mapa de Google Maps */}
        <div className='w-full h-[250px] md:h-[360px] rounded-xl overflow-hidden shadow-lg border border-gray-800'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3745.8327098940704!2d-65.30151842234531!3d-24.199908948353993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1780254054824!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hummy Couture Location"
            className="grayscale invert opacity-75 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-500"
          ></iframe>
        </div>

      </div>

      {/* Copyright debajo de todo */}
      <div className='text-center pt-8'>
        <p className='text-gray-500 text-xs md:text-sm'>©SkyTech Jujuy 2026. All rights reserved.</p>
      </div>

    </div>
  )
}

export default Footer