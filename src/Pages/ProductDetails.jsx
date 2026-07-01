import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Components/ShopContext'
import { useParams } from 'react-router-dom'
import { productsData } from '../data'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi' // Importamos las flechas

const ProductDetails = () => {
  const { addToCart } = useContext(ShopContext)
  const { id } = useParams()
  const [detailAmount, setDetailAmount] = useState(1);
  const [currentImgIndex, setCurrentImgIndex] = useState(0); // Estado para la foto activa

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImgIndex(0); // Resetea a la primera imagen al cambiar de producto
  }, [id]);

  const product = productsData.find((product) => product.id === parseInt(id))

  const handleDecrease = () => {
    if (detailAmount > 1) setDetailAmount(detailAmount - 1);
  };

  const handleIncrease = () => {
    setDetailAmount(detailAmount + 1);
  };

  // Funciones para pasar las imágenes de forma cíclica
  const prevImage = () => {
    if (!product || !product.images) return;
    setCurrentImgIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (!product || !product.images) return;
    setCurrentImgIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  if (!product) {
    return <div className="text-center py-20 font-medium">Producto no encontrado.</div>;
  }

  // Si por alguna razón no tiene array de imágenes, creamos un fallback seguro
  const imagesList = product.images || [product.image];

  return (
    <div className='mt-20 max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 items-center justify-center min-h-[calc(100vh-200px)]'>
      
      {/* SECCIÓN IZQUIERDA: Galería Completa */}
      <div className='w-full md:w-1/2 flex flex-col gap-4 items-center justify-center'>
        
        {/* Contenedor Principal de Imagen con Flechas */}
        <div className='w-full relative flex justify-center items-center bg-gray-50/60 p-4 rounded-xl border border-gray-100 h-[45vh] md:h-[460px] group overflow-hidden'>
          
          {/* Flecha Izquierda */}
          <button 
            onClick={prevImage}
            className='absolute left-3 bg-white/80 text-gray-800 p-1.5 rounded-full shadow-md hover:bg-white active:scale-90 transition opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10 text-2xl'
          >
            <BiChevronLeft />
          </button>

          {/* Imagen Activa */}
          <img 
            src={imagesList[currentImgIndex]} 
            alt={`${product.name} - vista ${currentImgIndex + 1}`} 
            className='w-full h-full object-contain rounded-lg transition-all duration-300 select-none'
          />

          {/* Flecha Derecha */}
          <button 
            onClick={nextImage}
            className='absolute right-3 bg-white/80 text-gray-800 p-1.5 rounded-full shadow-md hover:bg-white active:scale-90 transition opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10 text-2xl'
          >
            <BiChevronRight />
          </button>
        </div>

        {/* Fila Inferior de Miniaturas */}
        <div className='flex gap-3 justify-center w-full overflow-x-auto py-1'>
          {imagesList.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImgIndex(index)}
              className={`w-16 h-16 md:w-20 md:h-20 p-1 bg-white rounded-md border-2 transition-all duration-200 overflow-hidden flex items-center justify-center flex-shrink-0 ${
                index === currentImgIndex ? 'border-black scale-105 shadow-sm' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img src={img} alt="Miniatura" className='max-h-full max-w-full object-contain rounded-sm' />
            </button>
          ))}
        </div>

      </div>

      {/* SECCIÓN DERECHA: Datos del producto */}
      <div className='w-full md:w-1/2 space-y-5 flex flex-col justify-center'>
        <div>
          <h3 className='text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight'>{product.name}</h3>
          <p className='text-2xl font-bold text-gray-900 mt-1.5'>${product.price}</p>
        </div>
        
        <p className='text-base text-gray-500 leading-relaxed max-w-md'>{product.description}</p>
        
        {/* Controles de Cantidad */}
        <div className='space-y-1.5 max-w-[180px]'>
          <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Cantidad</label>
          <div className='flex items-center justify-between bg-white border border-gray-250 p-1.5 rounded-lg shadow-sm'>
            <button 
              onClick={handleDecrease}
              className='w-8 h-8 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-lg hover:bg-gray-100 transition active:scale-95 text-gray-600'
            >
              <IoMdRemove />
            </button>
            <span className='text-lg font-bold w-8 text-center select-none text-gray-800'>{detailAmount}</span>
            <button 
              onClick={handleIncrease}
              className='w-8 h-8 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-lg hover:bg-gray-100 transition active:scale-95 text-gray-600'
            >
              <IoMdAdd />
            </button>
          </div>
        </div>

        {/* Botón de envío */}
        <button 
          onClick={() => addToCart(product, product.id, detailAmount)} 
          className='w-full sm:w-fit bg-black text-white font-semibold text-base py-3 px-10 rounded-lg border border-black hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.99] shadow-sm'
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductDetails