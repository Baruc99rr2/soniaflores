import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdBed, MdBathtub, MdSquareFoot, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const PropertySearchCard = ({ 
  product, 
  viewMode, 
  onHover, 
  onLeave 
}) => {
  const images = product.images && product.images.length > 0 ? product.images : ['/propiedades/unisex.jpg'];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const changeSlide = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => 
      direction === "next" 
        ? (prev === images.length - 1 ? 0 : prev + 1) 
        : (prev === 0 ? images.length - 1 : prev - 1)
    );
  };

  const isGrid = viewMode === "grid";
  const isTerreno = product.detalles?.tipo === "Terreno";
  const isInversion = isTerreno && product.category === "Venta";
  const isNuevo = product.detalles?.antiguedad !== undefined && product.detalles.antiguedad <= 5;

  return (
    <div 
      onMouseEnter={onHover} 
      onMouseLeave={onLeave} 
      className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex ${
        isGrid 
          ? "flex-col w-full" 
          : "flex-col sm:flex-row w-full"
      } group`}
    >
      {/* Imagen */}
      <div className={`relative overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center ${
        isGrid 
          ? "h-[165px] md:h-[175px]" 
          : "w-full sm:w-[230px] h-[195px] sm:h-[168px]"   // ← Altura controlada en lista
      }`}>
        <img 
          src={images[currentImgIndex]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          loading="lazy" 
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => changeSlide(e, "prev")} 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10"
            >
              <MdChevronLeft size={20} />
            </button>
            <button 
              onClick={(e) => changeSlide(e, "next")} 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10"
            >
              <MdChevronRight size={20} />
            </button>
          </>
        )}

        <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1">
          <span className="text-[10px] font-bold text-gray-900 bg-white/95 px-2 py-1 rounded shadow-md uppercase">
            {product.category || "VENTA"}
          </span>
          {isInversion && <span className="text-[10px] font-bold text-white bg-amber-500 px-2 py-1 rounded shadow-md uppercase">Inversión</span>}
          {isNuevo && <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-1 rounded shadow-md uppercase">Nuevo</span>}
        </div>
      </div>

      {/* Información */}
      <div className="flex-1 p-4 flex flex-col justify-between min-h-0">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 uppercase truncate">
              <MdLocationOn className="text-red-500 flex-shrink-0" />
              {product.detalles?.barrio || "Ubicación"}
            </div>
            <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded uppercase">
              {product.detalles?.tipo || "Inmueble"}
            </span>
          </div>

          <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 leading-tight mb-3 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            {!isTerreno && (
              <>
                <span className="flex items-center gap-1"><MdBed className="text-gray-600" /> {product.detalles?.dormitorios || 0}</span>
                <span className="flex items-center gap-1"><MdBathtub className="text-gray-600" /> {product.detalles?.banos || 0}</span>
              </>
            )}
            <span className="flex items-center gap-1"><MdSquareFoot className="text-gray-600" /> {product.detalles?.superficie_m2 || 0} m²</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="font-extrabold text-lg text-gray-900">
            {product.price > 0 
              ? `USD ${new Intl.NumberFormat('es-AR').format(product.price)}${product.category === 'Alquiler' ? ' / mes' : ''}` 
              : 'A consultar'}
          </div>
          <Link 
            to={`/product/${product.id}`} 
            className="bg-gray-900 hover:bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchCard;