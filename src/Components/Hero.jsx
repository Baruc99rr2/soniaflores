import React, { useState, useEffect } from 'react';
// IMPORTACIÓN DE ICONOS PARA LA INFO DE CONTACTO
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150); // Evita ejecuciones excesivas en cambios de orientación de pantalla
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const isResponsiveMode = windowWidth < 1100;
  const isMobile = windowWidth < 640;

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${isResponsiveMode ? 'pt-24 pb-12' : 'pt-0'}`}>
      
      {/* 1. Video de Fondo (Ruta directa desde public y optimizado para streaming) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg" // <-- AGREGA UNA FOTO AQUÍ PARA EVITAR LA PANTALLA NEGRA
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ willChange: "transform" }} // Fuerza aceleración por hardware
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Tu navegador no soporta videos integrados.
      </video>

      {/* 2. Capa oscura para legibilidad */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/45 z-10" />

      {/* 3. Contenedor de Texto Responsivo */}
      <div className="relative flex justify-center items-center px-6 sm:px-12 md:px-24 w-full max-w-screen-xl z-20 text-center">
        
        <div className={`w-full text-white select-none transition-all duration-300 flex flex-col items-center ${isResponsiveMode ? 'max-w-md' : 'max-w-4xl'}`}>
          
          {/* Título Principal */}
          <h1 className="font-bold leading-tight tracking-wide drop-shadow-md text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Tu futuro empieza en la puerta de tu nuevo hogar
          </h1>

          {/* Bloque de Datos de Contacto Inferior - Optimizado sin blur pesado en móviles */}
          <div className={`mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-stone-200 text-xs sm:text-sm md:text-base font-light tracking-wide bg-black/40 sm:bg-black/20 px-5 py-3 sm:py-2 rounded-2xl sm:rounded-full border border-white/5 shadow-lg ${!isMobile ? 'backdrop-blur-xs' : ''}`}>
            
            {/* Ubicación */}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500 shrink-0" />
              <span>Independencia 1172, San Salvador de Jujuy, Argentina.</span>
            </div>

            {/* Separador visual para pantallas medianas/grandes */}
            <span className="hidden sm:inline text-white/30">|</span>

            {/* Teléfono directo para Llamadas con horarios aclarados */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <a 
                href="tel:+5438854881245" 
                className="flex items-center gap-2 hover:text-red-400 transition-colors cursor-pointer"
                title="Llamar por teléfono"
              >
                <FaPhoneAlt className="text-red-500 shrink-0 text-xs" />
                <span className="font-medium">388 54881245</span>
              </a>
              <span className="text-xs text-stone-400 font-normal">
                (Solo llamadas • 9 a 12 y 16 a 18 hs)
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;