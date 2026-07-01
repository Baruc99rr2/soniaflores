import React, { useContext, useState, useEffect, useRef } from "react";
import { ShopContext } from "./ShopContext";
import { categoryItem } from "../data";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { MdAddShoppingCart, MdKeyboardArrowLeft as ArrowLeft, MdKeyboardArrowRight as ArrowRight } from 'react-icons/md';

// COMPONENTE AUXILIAR PARA EL EFECTO DE DESLIZAMIENTO
const ScrollReveal = ({ children, delay = "delay-0" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

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
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

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

const ProductCard = ({ product, addToCart }) => {
  const [localAmount, setLocalAmount] = useState(1);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleDecrease = () => {
    if (localAmount > 1) setLocalAmount(localAmount - 1);
  };

  const handleIncrease = () => {
    setLocalAmount(localAmount + 1);
  };

  const handleAdd = () => {
    addToCart(product, product.id, localAmount);
    setLocalAmount(1); 
  };

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImgIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-2.5 md:p-3 transition-transform duration-200 hover:shadow-md flex flex-col justify-between group">
      <div>
        {/* CORRECCIÓN ALTURA DE TARJETA: h-[170px] en celulares evita que sea estirada */}
        <div className="relative w-full h-[170px] md:h-[250px] overflow-hidden rounded-md mb-2 bg-gray-50/50 flex items-center justify-center">
          
          <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
            <img
              src={images[currentImgIndex]}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105 select-none pointer-events-none"
            />
          </Link>

          {images.length > 1 && (
            <>
              
              <button
                onClick={prevImage}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 md:bg-white/80 p-1 rounded-full text-gray-800 shadow hover:bg-white transition opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10 active:scale-75"
                title="Imagen anterior"
              >
                <ArrowLeft className="text-lg md:text-xl" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 md:bg-white/80 p-1 rounded-full text-gray-800 shadow hover:bg-white transition opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10 active:scale-75"
                title="Siguiente imagen"
              >
                <ArrowRight className="text-lg md:text-xl" />
              </button>

              {/* Indicadores ocultos sutilmente en mobile para limpiar la foto compacta, visibles en PC */}
              <div className="absolute bottom-1.5 hidden md:flex gap-1 justify-center w-full">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 w-1 rounded-full transition-all ${idx === currentImgIndex ? 'bg-amber-500 w-2.5' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="text-left px-0.5">
          <h4 className="text-xs md:text-sm font-medium text-gray-700 truncate">
            {product.name}
          </h4>
          
          <div className="flex items-center justify-between mt-1 md:mt-1.5">
            <p className="text-black font-bold text-base md:text-lg">
              ${product.price}
            </p>
            
            <button
              onClick={handleAdd}
              className="w-8 h-7 md:w-10 md:h-8 border border-black bg-black text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 active:scale-90"
              title="Añadir al carrito"
            >
              <MdAddShoppingCart className="text-sm md:text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* CORRECCIÓN DESBORDAMIENTO CANTIDAD: Ajuste de padding, gap y tamaño de fuentes para pantallas pequeñas */}
      <div className="flex items-center justify-between mt-2.5 bg-gray-50 py-1 px-1.5 md:px-2 rounded-md border border-gray-150">
        <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">Cant.</span>
        <div className="flex items-center gap-1.5 md:gap-3">
          <button 
            onClick={handleDecrease}
            className="w-4.5 h-4.5 md:w-5 md:h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition active:scale-95 text-[10px] md:text-xs font-bold"
          >
            <IoMdRemove />
          </button>
          <span className="text-xs md:text-sm font-semibold w-3 md:w-4 text-center select-none text-gray-800">{localAmount}</span>
          <button 
            onClick={handleIncrease}
            className="w-4.5 h-4.5 md:w-5 md:h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition active:scale-95 text-[10px] md:text-xs font-bold"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const { products, addToCart } = useContext(ShopContext);
  const [category, setCategory] = useState("All");

  return (
    <div id="dishes" className="px-3 md:px-4 py-8 md:py-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* SECCIÓN 1: SHOP BY CATEGORY */}
      <ScrollReveal>
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">Shop By Category</h1>
        </div>
        
        <div className="mb-1 py-4 md:py-6">
          <ul className="flex flex-wrap justify-center gap-4 md:gap-10">
            {categoryItem.map((item, index) => {
              const isActive = category === item.category_title;
              return (
                <li
                  key={index}
                  onClick={() =>
                    setCategory((prev) =>
                      prev === item.category_title ? "All" : item.category_title
                    )
                  }
                  className="list-none cursor-pointer"
                >
                  <div
                    className={`
                      relative h-20 w-20 md:h-30 md:w-30 rounded-full overflow-hidden
                      border-2 transition-all duration-300
                      ${isActive ? "border-amber-500 ring-2 ring-amber-400 scale-105" : "hover:border-amber-400 hover:scale-105"}
                    `}
                  >
                    <img
                      src={item.image}
                      alt={item.category_title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-end justify-center">
                      <span
                        className={`
                          mb-1.5 px-2 py-0.5 md:px-4 md:py-1 rounded-full text-[9px] md:text-xs font-semibold
                          text-white backdrop-blur
                          ${isActive ? "bg-amber-500" : "bg-black/60"}
                        `}
                      >
                        {item.category_title}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </ScrollReveal>

      {/* SECCIÓN 2: OUR COLLECTION */}
      <ScrollReveal delay="delay-100">
        <h2 className="mt-4 md:mt-6 text-2xl md:text-4xl text-center mb-4 md:mb-6 font-semibold">
          Our Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-1 md:px-0">
          {products.length > 0 ? (
            products
              .filter((product) => category === "All" || category === product.category)
              .map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  addToCart={addToCart} 
                />
              ))
          ) : (
            <p className="text-sm col-span-full text-center text-gray-500">
              Nothing in the menu
            </p>
          )}
        </div>
      </ScrollReveal>

    </div>
  );
};

export default ProductList;