import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Homepage from './Pages/Homepage'
import Cart from './Components/Cart'
import ProductDetails from './Pages/ProductDetails'
import Busqueda from './Components/Busqueda/Busqueda' 
import { Routes, Route } from 'react-router-dom'

// IMPORTAMOS TU LOGO DESDE LA RUTA ESPECIFICADA
import SoniaLogo from './assets/SoniaLogo.png'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Verificamos si es la primera vez que ingresa en esta sesión
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

    if (hasLoadedBefore) {
      // Si ya ingresó antes en esta sesión, quitamos la pantalla de carga inmediatamente
      setIsLoading(false);
      return;
    }

    // Duración total de la carga: 8000 milisegundos
    const duration = 6500; 
    const intervalTime = 16; // Aproximadamente 60fps (1000ms / 60 frames = 16.6ms)
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    // Al finalizar los 4.5s iniciamos el desvanecimiento suave (fade out)
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
      sessionStorage.setItem('hasLoadedBefore', 'true'); // Guardamos registro para no repetir
      
      // Esperamos que termine la transición de opacidad (500ms) antes de desmontar del DOM
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimeout);
    };
  }, []);

  return (
    <>
      {/* PANTALLA DE CARGA (A 60 FPS CON TU IDENTIDAD DE MARCA) */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-red-700 via-red-950 to-neutral-950 transition-opacity duration-500 ease-out ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ willChange: 'opacity' }} // Forzar aceleración GPU
        >
          {/* Logo animado con un leve pulso fluido */}
          <div className="relative mb-8 max-w-[200px] sm:max-w-[260px] px-4 select-none animate-smooth-pulse">
            <img 
              src={SoniaLogo} 
              alt="Inmobiliaria Sonia Flores" 
              className="w-full h-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              loading="eager"
            />
          </div>

          {/* Contenedor de la barra de progreso */}
          <div className="w-[180px] sm:w-[240px] h-[3px] bg-black/40 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-white rounded-full transition-all ease-out"
              style={{ 
                width: `${progress}%`,
                transitionDuration: '16ms', // Sincronizado a 60fps
                willChange: 'width', // Optimización de renderizado para evitar lagunas visuales
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>

          {/* Texto secundario minimalista */}
          <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase mt-4 font-medium animate-pulse">
            Inmobiliaria Sonia Flores
          </p>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL DE LA APLICACIÓN */}
      <div 
        className={`relative min-h-screen transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ willChange: 'opacity' }}
      >
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/propiedades/:id' element={<ProductDetails />} /> 
          <Route path='/busqueda' element={<Busqueda />} /> 
        </Routes>

        <Footer />
      </div>

      {/* ESTILOS EXTRA PARA LA ANIMACIÓN FLUIDA DEL LOGO */}
      <style>{`
        @keyframes smoothPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
          }
          50% {
            transform: scale(1.025);
            filter: drop-shadow(0 6px 20px rgba(220,38,38,0.25));
          }
        }
        .animate-smooth-pulse {
          animation: smoothPulse 3.5s ease-in-out infinite;
          will-change: transform, filter;
        }
      `}</style>
    </>
  )
}

export default App