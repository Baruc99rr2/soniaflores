import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// IMPORTACIÓN DE TU COMPONENTE LOCAL RIPPLE BUTTON
import { RippleButton, RippleButtonRipples } from './RippleButton';

// 1. IMPORTACIÓN DEL FONDO DESDE TU RUTA REAL (src/Components/bubble.jsx)
import { BubbleBackground } from './bubble';

// 2. TU COMPONENTE EXACTO (Adaptado a JS tradicional eliminando los tipos de TS si usas .jsx)
const BubbleBackgroundDemo = ({ interactive }) => {
  return (
    <BubbleBackground
      interactive={interactive}
      className="absolute inset-0 flex items-center justify-center rounded-xl"
    />
  );
};

// COMPONENTE AUXILIAR PARA EL EFECTO DE DESLIZAMIENTO AL CARGAR
const ScrollReveal = ({ children, delay = "delay-0" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transform transition-all duration-1000 ease-out ${delay} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

// TARJETA DE PROPIEDAD ESTILO BANNER 3D
const ProductCard = ({ product, dimensions, index, totalItems }) => {
  const displayImage = product.images && product.images.length > 0 ? product.images[0] : '/propiedades/unisex.jpg';

  const anglePerItem = 360 / totalItems;
  const currentAngle = anglePerItem * index;
  
  const radius = Math.max(
    180, 
    (parseInt(dimensions.width) / 2) / Math.tan((anglePerItem / 2) * Math.PI / 180) + 10
  );

  return (
    <div 
      className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl select-none group transition-all duration-300 bg-black/30 backdrop-blur-xs border border-white/10"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        transform: `rotateY(${currentAngle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d"
      }}
    >
      <img
        src={displayImage}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-700 group-hover:scale-105 opacity-75"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between items-start text-white z-10">
        <div className="w-full text-left flex justify-between items-start gap-2">
          <div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-red-400 bg-black/50 px-2 py-0.5 rounded border border-red-500/30">
              {product.category || "VENTA"}
            </span>
            {product.detalles?.tipo && (
              <span className="ml-1.5 text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                {product.detalles.tipo}
              </span>
            )}
          </div>
        </div>

        <div className="w-full mt-auto mb-3">
          <h4 className="text-xs md:text-base font-semibold text-white drop-shadow-md line-clamp-2 leading-tight">
            {product.name}
          </h4>
          {product.detalles?.barrio && (
            <p className="text-[10px] md:text-[11px] text-gray-300 flex items-center gap-0.5 mt-1">
              <MdLocationOn className="text-red-500 text-xs" /> {product.detalles.barrio}
            </p>
          )}
        </div>

        <div className="w-full flex justify-between items-center border-t border-white/10 pt-2">
          <span className="text-[9px] md:text-xs font-normal tracking-widest text-gray-300 uppercase">
            Ver detalles
          </span>

          <Link 
            to={`/product/${product.id}`}
            className="flex items-center justify-center border border-white/60 w-6 h-6 md:w-7 md:h-7 rounded-lg hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all duration-300 cumulative-button z-20 pointer-events-auto"
            title="Ver detalles de la propiedad"
          >
            <svg 
              className="w-2.5 h-2.5 md:w-3 md:h-3 fill-none stroke-current stroke-2 ml-0.5" 
              viewBox="0 0 24 24"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL CON ENTORNO 3D CONTROLADO POR BOTONES
const Carrusel = () => {
  const { products } = useContext(ShopContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width < 640;

  const baseProducts = products && products.length > 0 ? products.slice(-7) : [];
  const totalItems = baseProducts.length;
  const anglePerItem = totalItems > 0 ? 360 / totalItems : 0;

  const handlePrev = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  const currentRotation = activeIndex * -anglePerItem;

  const cardDimensions = {
    width: isMobile ? "200px" : "290px",
    height: isMobile ? "240px" : "320px"
  };

  return (
    /* 3. CONTENEDOR PRINCIPAL CON LOS COLORES BASE (Atenuado para favorecer el resalte del Canvas) */
    <div 
      id="recommendations-section" 
      className="relative w-full pt-24 pb-40 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black animate-gradient-slow"
      style={{
        backgroundSize: '400% 400%'
      }}
    >
      
      {/* 4. INYECCIÓN CORREGIDA DEL COMPONENTE DE BURBUJAS (Sin filtros que distorsionen la paleta) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
        <BubbleBackgroundDemo interactive={true} />
      </div>

      {/* SECCIÓN TITULO */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        <ScrollReveal>
          <div className="text-center flex flex-col items-center select-none">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide drop-shadow-md">
              Nuestras Recomendaciones
            </h1>
            <p className="text-base md:text-xl text-gray-200 mt-3 font-medium max-w-2xl drop-shadow-sm">
              Contamos con distintas propiedades que se ajustan a tu presupuesto en todo Jujuy
            </p>
            
            <div className="flex items-center w-full max-w-[240px] sm:max-w-[320px] mt-5">
              <div className="flex-1 h-[2px] bg-white/20" />
              <span className="px-3 text-xl text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]">
                <MdLocationOn />
              </span>
              <div className="flex-1 h-[2px] bg-white/20" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ESCENARIO TRIDIMENSIONAL DEL CARRUSEL Y CONTROLES INTERACTIVOS */}
      <ScrollReveal delay="delay-100">
        <div className="relative max-w-6xl mx-auto px-4 mt-20 flex flex-col items-center justify-center gap-8">
          
          <div 
            className="relative w-full flex items-center justify-center z-10"
            style={{ 
              perspective: "1400px",
              perspectiveOrigin: "50% 35%",
              height: isMobile ? "260px" : "360px"
            }}
          >
            {totalItems > 0 ? (
              <div 
                className="relative flex items-center justify-center transition-transform duration-700 ease-out select-none"
                style={{
                  width: cardDimensions.width,
                  height: cardDimensions.height,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${currentRotation}deg)`
                }}
              >
                {baseProducts.map((product, index) => (
                  <ProductCard 
                    key={`${product.id}-${index}`} 
                    product={product} 
                    dimensions={cardDimensions}
                    index={index}
                    totalItems={totalItems}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-center text-gray-300 w-full py-8">
                No hay recomendaciones disponibles en este momento.
              </p>
            )}
          </div>

          <div className="w-full flex flex-row justify-center items-center gap-6 md:block md:static">
            
            <div className="md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2 z-30">
              <RippleButton 
                onClick={handlePrev}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-full shadow-2xl transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
                <RippleButtonRipples />
              </RippleButton>
            </div>

            <div className="md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2 z-30">
              <RippleButton 
                onClick={handleNext}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-full shadow-2xl transition-all"
              >
                <ChevronRight className="w-6 h-6" />
                <RippleButtonRipples />
              </RippleButton>
            </div>

          </div>

        </div>
      </ScrollReveal>

      <style>{`
        @keyframes gradientSlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          animation: gradientSlow 18s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Carrusel;