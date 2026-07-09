import React, { useEffect, useState } from 'react'
import { BiMenu, BiX } from 'react-icons/bi'
import { useNavigate, useLocation } from 'react-router-dom'
// IMPORTACIÓN DE LOS DOS LOGOS
import SoniaLogo from '../assets/SoniaLogo.png'   
import SoniaLogo2 from '../assets/SoniaLogo2.png' 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Estado para controlar qué ítem móvil está activo momentáneamente al tocarlo
  const [activeMobileItem, setActiveMobileItem] = useState(null);

  const navigate = useNavigate(); 
  const location = useLocation(); 

  // ==========================================
  // PARÁMETROS CONFIGURABLES DE DISEÑO (A OJO)
  // ==========================================
  const LOGO_SIZE = {
    // Tamaño del logo cuando la barra está arriba (Expandido)
    heightDesktop: "90px", 
    heightMobile: "80px",
    
    // Tamaño del logo cuando se achica al scrollear (Comprimido)
    heightDesktopCompressed: "70px",
    heightMobileCompressed: "50px"
  };

  // CONTROL DEL TAMAÑO VERTICAL DEL NAVBAR (PADDINGS)
  const NAVBAR_PADDING = {
    // Cuando el navbar está arriba (Expandido)
    desktopExpanded: "py-3",  // Antes era py-6 (Se redujo para hacerlo más compacto)
    mobileExpanded: "py-3",

    // Cuando el navbar se comprime al hacer scroll
    desktopCompressed: "py-1.3", // Antes era py-3
    mobileCompressed: "py-1"
  };
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Función dedicada para navegar hacia la página de búsqueda
  const navigateToSearch = (tipoFiltro = null, itemName = null) => {
    if (isResponsiveMode && itemName) {
      setActiveMobileItem(itemName);
    }

    setTimeout(() => {
      setIsOpen(false);
      setActiveMobileItem(null);
      
      // Navegamos a la ruta de búsqueda
      navigate('/busqueda');
      
      // Opcional: Si querés forzar un scroll up al entrar a búsqueda
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, isResponsiveMode && itemName ? 250 : 0);
  };

  const scrollToSection = (id, itemName = null) => {
    // Si queremos ir al Inicio / Home completo
    if (id === 'home' && location.pathname !== '/') {
      setIsOpen(false);
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Si estamos en móvil, activamos la línea visual del ítem seleccionado
    if (isResponsiveMode && itemName) {
      setActiveMobileItem(itemName);
    }

    // Esperamos un momento breve para que el usuario note el feedback visual antes de cerrar/redirigir
    setTimeout(() => {
      setIsOpen(false);
      setActiveMobileItem(null); // Desaparece la línea inmediatamente después de cerrar

      if (!id) return;

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          executeScroll(id);
        }, 100);
      } else {
        executeScroll(id);
      }
    }, isResponsiveMode && itemName ? 250 : 0); 
  };

  const executeScroll = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = element.offsetTop - 80; 
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    }
  };

  const isResponsiveMode = windowWidth < 1217;
  const isHomePage = location.pathname === '/';
  const isTransparentActive = isHomePage && !isScrolled;

  // Lógica de inyección dinámica de paddings basados en los parámetros superiores
  const currentPadding = isTransparentActive
    ? (isResponsiveMode ? NAVBAR_PADDING.mobileExpanded : NAVBAR_PADDING.desktopExpanded)
    : (isResponsiveMode ? NAVBAR_PADDING.mobileCompressed : NAVBAR_PADDING.desktopCompressed);

  const navbarClasses = isTransparentActive
    ? `bg-transparent ${currentPadding} text-white` 
    : `bg-[#d64531] shadow-xl ${currentPadding} text-white border-b border-white/10`;

  // Clase para PC: Línea fluida SOLO al pasar el mouse (hover), grosor normal (font-normal)
  const navLinkDesktopClass = "relative overflow-hidden pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 cursor-pointer text-white font-normal uppercase tracking-wider text-sm lg:text-base select-none";

  // Clase para Móvil: Sin hover pegajoso, la línea se controla manualmente con una clase activa temporal
  const navLinkMobileClass = (itemName) => {
    const isActive = activeMobileItem === itemName;
    return `relative overflow-hidden pb-1 cursor-pointer text-white font-normal uppercase tracking-wider text-base select-none after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white after:transition-transform after:duration-300 after:ease-in-out ${
      isActive ? "after:scale-x-100" : "after:scale-x-0"
    }`;
  };

  const renderLogoContainer = () => {
    // Calculamos el alto dinámico según el dispositivo y si hay scroll
    let currentHeight = LOGO_SIZE.heightDesktop;
    if (isResponsiveMode) {
      currentHeight = isScrolled ? LOGO_SIZE.heightMobileCompressed : LOGO_SIZE.heightMobile;
    } else {
      currentHeight = isScrolled ? LOGO_SIZE.heightDesktopCompressed : LOGO_SIZE.heightDesktop;
    }

    return (
      <div 
        onClick={() => scrollToSection('home')} 
        className="relative flex items-center justify-center cursor-pointer select-none transition-all duration-500 ease-in-out"
        style={{
          width: isScrolled ? "80px" : "180px",
          height: currentHeight
        }}
      >
        {/* LOGO 1: Completo */}
        <img
          src={SoniaLogo}
          alt="Sonia Flores Inmobiliaria"
          className={`absolute max-w-full max-h-full object-contain transition-all duration-500 ease-in-out ${
            isScrolled ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
          }`}
        />

        {/* LOGO 2: Solo Isotipo */}
        <img
          src={SoniaLogo2}
          alt="Sonia Flores"
          className={`absolute max-w-full max-h-full object-contain transition-all duration-500 ease-in-out ${
            isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
          }`}
        />
      </div>
    );
  };

  return (
    <div>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${navbarClasses} px-6 md:px-12 lg:px-16`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          
          {/* MODO DESKTOP */}
          {!isResponsiveMode ? (
            <div className="flex items-center justify-between w-full">
              
              {/* Bloque Izquierdo (Ventas, Alquiler, Busqueda) */}
              <ul className="flex items-center space-x-6 lg:space-x-8 w-1/2 justify-end pr-6 lg:pr-10">
                <li onClick={() => navigateToSearch('Venta')} className={navLinkDesktopClass}>
                  Ventas
                </li>
                <li onClick={() => navigateToSearch('Alquiler')} className={navLinkDesktopClass}>
                  Alquiler
                </li>
                <li onClick={() => navigateToSearch(null)} className={navLinkDesktopClass}>
                  Búsqueda
                </li>
              </ul>

              {/* LOGO CENTRAL */}
              {renderLogoContainer()}

              {/* Bloque Derecho (Sobre Nosotros, Servicios, Contacto) */}
              <ul className="flex items-center space-x-6 lg:space-x-8 w-1/2 justify-start pl-6 lg:pl-10">
                <li onClick={() => scrollToSection('about-section')} className={navLinkDesktopClass}>
                  Sobre Nosotros
                </li>
                <li onClick={() => scrollToSection('services')} className={navLinkDesktopClass}>
                  Nuestros Servicios
                </li>
                <li onClick={() => scrollToSection('contact')} className={navLinkDesktopClass}>
                  Contacto
                </li>
              </ul>

            </div>
          ) : (
            // MODO RESPONSIVO (MÓVIL)
            <div className="flex justify-between items-center w-full">
              {renderLogoContainer()}
              
              <button 
                className="text-3xl focus:outline-none transition-transform duration-200 active:scale-95 text-white" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <BiX /> : <BiMenu />}
              </button>
            </div>
          )}

          {/* MENÚ DESPLEGABLE RESPONSIVO (MÓVIL) */}
          {isResponsiveMode && (
            <div className={`absolute top-full left-0 w-full bg-[#d64531] shadow-2xl transition-all duration-300 flex flex-col items-center space-y-6 py-8 border-t border-white/10 ${
              isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}>
              <div className="flex flex-col items-center gap-5 w-auto">
                <span onClick={() => scrollToSection('home', 'inicio')} className={navLinkMobileClass('inicio')}>Inicio</span>
                <span onClick={() => navigateToSearch('Venta', 'ventas')} className={navLinkMobileClass('ventas')}>Ventas</span>
                <span onClick={() => navigateToSearch('Alquiler', 'alquiler')} className={navLinkMobileClass('alquiler')}>Alquiler</span>
                <span onClick={() => navigateToSearch(null, 'busqueda')} className={navLinkMobileClass('busqueda')}>Búsqueda</span>
                <span onClick={() => scrollToSection('about-section', 'about')} className={navLinkMobileClass('about')}>Sobre Nosotros</span>
                <span onClick={() => scrollToSection('services', 'services')} className={navLinkMobileClass('services')}>Nuestros Servicios</span>
                <span onClick={() => scrollToSection('contact', 'contact')} className={navLinkMobileClass('contact')}>Contacto</span>
              </div>
            </div>
          )}

        </div>
      </nav>
    </div>
  )
}

export default Navbar;