import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Homepage from './Pages/Homepage'
import Cart from './Components/Cart'
import ProductDetails from './Pages/ProductDetails'
import Busqueda from './Components/Busqueda/Busqueda' 
import { Routes, Route } from 'react-router-dom'

import SoniaLogo from './assets/SoniaLogo.png'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // NUEVOS ESTADOS PARA CONTROLAR EL COMPONENTE HERO
  const [isVideoReady, setIsVideoReady] = useState(false);
  const isVideoReadyRef = useRef(false);

  // Función que llamará Hero cuando el video esté listo
  const handleVideoLoaded = () => {
    setIsVideoReady(true);
    isVideoReadyRef.current = true;
  };

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

    if (hasLoadedBefore) {
      setIsLoading(false);
      return;
    }

    // Bajamos la duración visual de la barra a 3 segundos para que sea más ágil
    const duration = 3000; 
    const intervalTime = 16; 
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95 && !isVideoReadyRef.current) {
          // Si llega al 95% pero el video NO cargó, frena la barra ahí para esperar
          return 95;
        }
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    // Bucle de chequeo continuo para decidir cuándo ocultar el Loader de forma segura
    const checkUnmountInterval = setInterval(() => {
      // Se apaga si: El progreso llegó al final Y el video está listo
      if (isVideoReadyRef.current) {
        setProgress(100);
        clearInterval(timer);
        clearInterval(checkUnmountInterval);
        clearTimeout(safetyTimeout); // Cancelamos el tiempo de seguridad

        // Gatillamos el desvanecimiento
        setFadeOut(true);
        sessionStorage.setItem('hasLoadedBefore', 'true');
        
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 100);

    // TIEMPO DE SEGURIDAD (6.5 segundos): Si el video tarda una eternidad por mal internet, 
    // forzamos la entrada igual para mostrar la hermosa imagen fija que pusimos de fondo.
    const safetyTimeout = setTimeout(() => {
      isVideoReadyRef.current = true; 
    }, 6500);

    return () => {
      clearInterval(timer);
      clearInterval(checkUnmountInterval);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <>
      {/* PANTALLA DE CARGA */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-red-700 via-red-950 to-neutral-950 transition-opacity duration-500 ease-out ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ willChange: 'opacity' }}
        >
          <div className="relative mb-8 max-w-[200px] sm:max-w-[260px] px-4 select-none animate-smooth-pulse">
            <img 
              src={SoniaLogo} 
              alt="Inmobiliaria Sonia Flores" 
              className="w-full h-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              loading="eager"
            />
          </div>

          <div className="w-[180px] sm:w-[240px] h-[3px] bg-black/40 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-white rounded-full transition-all ease-out"
              style={{ 
                width: `${progress}%`,
                transitionDuration: '16ms',
                willChange: 'width',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>

          <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase mt-4 font-medium animate-pulse">
            Inmobiliaria Sonia Flores
          </p>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div 
        className={`relative min-h-screen transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ willChange: 'opacity' }}
      >
        <Navbar />
        
        <Routes>
          {/* IMPORTANTE: Pasamos la función controladora de video a la Homepage */}
          <Route path='/' element={<Homepage onVideoLoaded={handleVideoLoaded} />} />
          <Route path='/propiedades/:id' element={<ProductDetails />} /> 
          <Route path='/busqueda' element={<Busqueda />} /> 
        </Routes>

        <Footer />
      </div>

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