import React, { useState, useEffect } from 'react'
import ml1Orange from '../assets/ml1-orange.png'
import ml1Green from '../assets/ml1-green.png'
import ml1Blue from '../assets/ml1-blue.png'
import ml1Red from '../assets/ml1-red.png'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const colorStates = [
    { id: 'orange', bgClass: 'bg-orange-500', img: ml1Orange },
    { id: 'green',  bgClass: 'bg-emerald-600', img: ml1Green },
    { id: 'blue',   bgClass: 'bg-blue-600',    img: ml1Blue },
    { id: 'red',    bgClass: 'bg-rose-600',    img: ml1Red }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colorStates.length);
    }, 5000);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const current = colorStates[currentIndex];

  // BREAKPOINT CRÍTICO SOLICITADO (1100px)
  const isResponsiveMode = windowWidth < 1100;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-1000 delay-200 ease-in-out ${current.bgClass} ${isResponsiveMode ? 'pt-28 pb-12' : 'pt-0'}`}>
      
      {/* Contenedor dinámico basado en los 1100px */}
      <div className={`flex justify-between items-center px-6 md:px-12 lg:px-24 gap-8 w-full max-w-screen-xl z-10 ${isResponsiveMode ? 'flex-col text-center' : 'flex-row text-left'}`}>
        
        {/* Contenido Izquierdo (Textos) */}
        <div className={`w-full text-white select-none ${isResponsiveMode ? 'max-w-xl order-2' : 'max-w-[50%] order-1'}`}>
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-semibold text-black/40 bg-white/20 px-4 py-1 rounded-full w-fit backdrop-blur-sm ${isResponsiveMode ? 'mx-auto' : 'mx-0'}`}>
            Where Designs Meet Couture
          </h2>
          <h1 className={`font-bold mt-3 leading-tight ${isResponsiveMode ? 'text-3xl sm:text-4xl' : 'text-4xl lg:text-5xl xl:text-6xl'}`}>
            Effortlessly Style Yourself With Premium Collection
          </h1>
          <p className="text-base md:text-lg text-white/80 mt-4 font-medium">
            From everyday essentials to statement pieces, redefine your style with fashion that’s as bold and unique as you are.
          </p>
        </div>

        {/* Contenido Derecho (Prenda + Sombra) */}
        <div className={`w-full flex flex-col justify-center items-center ${isResponsiveMode ? 'max-w-xs order-1 mb-4' : 'max-w-[50%] order-2'}`}>
          
          {/* Contenedor maestro con "will-change" para forzar aceleración por GPU */}
          <div className="relative flex flex-col items-center justify-center will-change-transform animate-[premiumFloat_4s_ease-in-out_infinite]">
            
            {/* La Prenda */}
            <img 
              src={current.img} 
              alt="Hero Collection" 
              className={`w-full h-auto object-contain select-none pointer-events-none transition-all duration-200 ease-out drop-shadow-xl ${isResponsiveMode ? 'max-w-[280px]' : 'max-w-[410px] lg:max-w-[440px]'}`}
            />
            
            {/* Sombra integrada */}
            <div className="w-40 h-3.5 bg-black/15 rounded-full blur-md mt-2 transition-transform duration-500"></div>
          </div>

        </div>
      </div>

      {/* Estilos CSS ultra fluidos */}
      <style>{`
        @keyframes premiumFloat {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1); 
          }
          50% { 
            transform: translate3d(0, -14px, 0) scale(0.98); 
          }
        }
      `}</style>
    </div>
  )
}

export default Hero;