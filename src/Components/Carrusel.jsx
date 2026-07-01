import React, { useRef, useState, useEffect } from 'react'
import { brandsData } from '../data'

const Carrusel = () => {
  const scrollRef = useRef(null)
  const isDownRef = useRef(false) // Usamos ref en lugar de estado para evitar re-crear el loop en cada click
  const [isGrabbed, setIsGrabbed] = useState(false) // Solo para cambiar el cursor visualmente
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  // Duplicamos el array varias veces para garantizar que nunca se acaben las imágenes hacia los costados
  const multipliedBrands = [...brandsData, ...brandsData, ...brandsData, ...brandsData, ...brandsData]

  useEffect(() => {
    const slider = scrollRef.current
    if (!slider) return

    // Posicionamos el carrusel en el centro exacto al cargar la página para dar margen infinito a la izquierda y derecha
    slider.scrollLeft = slider.scrollWidth / 3

    let animationFrameId

    const autoScroll = () => {
      // Avanzar de forma automática solo si nadie está haciendo click/touch
      if (!isDownRef.current) {
        slider.scrollLeft += 0.8 // Velocidad constante y controlada

        // Reseteo invisible hacia la izquierda si llega muy al final
        if (slider.scrollLeft >= (slider.scrollWidth * 2) / 3) {
          slider.scrollLeft -= slider.scrollWidth / 3
        }
      }

      animationFrameId = requestAnimationFrame(autoScroll)
    }

    animationFrameId = requestAnimationFrame(autoScroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Controlar los límites dinámicos durante el arrastre manual
  const checkBounds = (slider) => {
    const oneThird = slider.scrollWidth / 3
    if (slider.scrollLeft <= 50) {
      // Si se acerca peligrosamente al inicio izquierdo, lo salta al centro
      slider.scrollLeft += oneThird
      startXRef.current = startXRef.current + oneThird
    } else if (slider.scrollLeft >= (slider.scrollWidth * 2) / 3) {
      // Si se pasa hacia la derecha, lo regresa al bloque central
      slider.scrollLeft -= oneThird
      startXRef.current = startXRef.current - oneThird
    }
  }

  // MANEJO DE MOUSE (PC)
  const handleMouseDown = (e) => {
    isDownRef.current = true
    setIsGrabbed(true)
    startXRef.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeftRef.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (e) => {
    if (!isDownRef.current) return
    e.preventDefault()
    const slider = scrollRef.current
    const x = e.pageX - slider.offsetLeft
    const walk = (x - startXRef.current) * 1.5 // Multiplicador de sensibilidad de arrastre
    slider.scrollLeft = scrollLeftRef.current - walk
    checkBounds(slider)
  }

  // MANEJO TÁCTIL (CELULARES)
  const handleTouchStart = (e) => {
    isDownRef.current = true
    setIsGrabbed(true)
    startXRef.current = e.touches[0].pageX - scrollRef.current.offsetLeft
    scrollLeftRef.current = scrollRef.current.scrollLeft
  }

  const handleTouchMove = (e) => {
    if (!isDownRef.current) return
    const slider = scrollRef.current
    const x = e.touches[0].pageX - slider.offsetLeft
    const walk = (x - startXRef.current) * 1.5
    slider.scrollLeft = scrollLeftRef.current - walk
    checkBounds(slider)
  }

  const handleRelease = () => {
    isDownRef.current = false
    setIsGrabbed(false)
  }

  return (
    <div className="w-full bg-gray-100 py-10 overflow-hidden border-y border-gray-200">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleRelease}
        className={`flex items-center space-x-16 overflow-x-auto scrollbar-none select-none px-8 ${
          isGrabbed ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: 'auto' }} // Desactivamos el suavizado CSS nativo
      >
        {multipliedBrands.map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="flex-shrink-0 flex items-center justify-center w-32 h-20 sm:w-40 sm:h-24 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="max-w-full max-h-full object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carrusel