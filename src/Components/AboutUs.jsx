import React from 'react';
import { FiCheckCircle, FiEye } from 'react-icons/fi';
// IMPORTACIÓN DEL VIDEO
import videoPresentacion from '../assets/presentacion.mp4';

const AboutUs = () => {

  // ==========================================
  // PARÁMETROS CONFIGURABLES DE DISEÑO
  // Modifica estos valores para ajustar el diseño a ojo.
  // ==========================================
  const SECTION_HEIGHT = "900px"; // Altura vertical de la sección en PC

  const TEXT_SPACINGS = {
    paddingTopTextContainer: "pt-12 md:pt-20", // CONTROLA LA ALTURA DEL TÍTULO: Espacio superior del bloque completo (ej: pt-12, pt-16, pt-24, pt-32)
    marginBottomTitle: "mb-14",       // Espacio debajo del título principal
    marginBottomMision: "mb-12",      // Espacio debajo del bloque de Misión
    gapInsideBlock: "gap-3"           // Espacio interno dentro de Misión/Visión
  };
  // ==========================================

  return (
    <div 
      id="about" 
      className="w-full flex flex-col md:flex-row bg-black overflow-hidden border-b border-black"
      style={{
        minHeight: window.innerWidth >= 768 ? SECTION_HEIGHT : 'auto'
      }}
    >
      
      {/* 1. SECCIÓN IZQUIERDA: CONTENEDOR DEL VIDEO (VERTICAL CELULAR) */}
      <div 
        className="relative w-full md:w-1/2 h-[70vh] overflow-hidden bg-gray-900"
        style={{
          height: window.innerWidth >= 768 ? SECTION_HEIGHT : '70vh'
        }}
      >
        <video
          src={videoPresentacion}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* 2. SECCIÓN DERECHA: CONTENEDOR DE TEXTOS */}
      {/* Se cambió 'justify-center' por 'justify-start' para empujar el contenido hacia arriba, regulado por el parámetro de paddingTop */}
      <div className={`w-full md:w-1/2 bg-gradient-to-br from-red-900/60 via-stone-900 to-black p-8 sm:p-12 md:p-16 flex flex-col justify-start text-white ${TEXT_SPACINGS.paddingTopTextContainer}`}>
        
        {/* Título Principal */}
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-500 leading-tight tracking-wide max-w-xl ${TEXT_SPACINGS.marginBottomTitle}`}>
          Buscamos superar las expectativas de nuestros clientes
        </h2>

        {/* Bloque de Contenido: Misión */}
        <div className={`flex flex-col max-w-xl ${TEXT_SPACINGS.gapInsideBlock} ${TEXT_SPACINGS.marginBottomMision}`}>
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl text-red-500 shrink-0">
              <FiCheckCircle />
            </span>
            <h3 className="text-lg md:text-xl font-bold tracking-wider uppercase text-gray-100">
              Misión
            </h3>
          </div>
          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed pl-8 md:pl-9">
            En Sonia Flores Inmobiliaria impulsamos soluciones inmobiliarias y desarrollos innovadores de alta calidad en el norte argentino. En nuestro servicio combinamos la calidez de un trato cercano, el talento joven y nuevas tecnologías para abrir nuevas oportunidades.
          </p>
        </div>

        {/* Bloque de Contenido: Visión */}
        <div className={`flex flex-col max-w-xl ${TEXT_SPACINGS.gapInsideBlock}`}>
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl text-red-500 shrink-0">
              <FiEye />
            </span>
            <h3 className="text-lg md:text-xl font-bold tracking-wider uppercase text-gray-100">
              Visión
            </h3>
          </div>
          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed pl-8 md:pl-9">
            Ser la inmobiliaria líder de Jujuy y referente digital del norte argentino, ofreciendo soluciones habitacionales y oportunidades de inversión ágiles, accesibles y transparentes. Impulsamos comunidades con proyectos innovadores y un servicio humano que combina velocidad, tecnología y talento joven en mejora continua.
          </p>
        </div>

      </div>

    </div>
  );
};

export default AboutUs;