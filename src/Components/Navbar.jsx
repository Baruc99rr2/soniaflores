import React, { useContext, useEffect, useState } from 'react'
import { BiCart, BiUser, BiMenu, BiX } from 'react-icons/bi'
import { ShopContext } from './ShopContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { quantity } = useContext(ShopContext)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate(); 
  const location = useLocation(); 

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

  const scrollToSection = (id) => {
    setIsOpen(false); 
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        executeScroll(id);
      }, 100);
    } else {
      executeScroll(id);
    }
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

  // BREAKPOINT CRÍTICO SOLICITADO (1217px)
  const isResponsiveMode = windowWidth < 1217;

  const isHomePage = location.pathname === '/';
  const isTransparentActive = isHomePage && !isScrolled;

  const navbarClasses = isTransparentActive
    ? "bg-transparent py-6 text-white" 
    : "bg-white shadow-md py-4 text-gray-800 border-b border-gray-100";

  return (
    <div>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${navbarClasses} px-6 md:px-12 lg:px-24 flex justify-between items-center`}>
        
        {/* Brand logo */}
        <div className='text-2xl font-bold cursor-pointer tracking-wide' onClick={() => scrollToSection('home')}>
          Express Web Design
        </div>
        
        {/* Nav menu para Desktop (Oculto estrictamente por debajo de 1217px) */}
        {!isResponsiveMode && (
          <ul className='flex space-x-6 text-lg font-semibold uppercase'>
            <li onClick={() => scrollToSection('home')} className={`cursor-pointer transition ${isTransparentActive ? 'hover:text-black' : 'hover:text-amber-600'}`}>Home</li>
            <li onClick={() => scrollToSection('dishes')} className={`cursor-pointer transition ${isTransparentActive ? 'hover:text-black' : 'hover:text-amber-600'}`}>Our Products</li>
            <li onClick={() => scrollToSection('contact')} className={`cursor-pointer transition ${isTransparentActive ? 'hover:text-black' : 'hover:text-amber-600'}`}>Contact</li>
            <li onClick={() => scrollToSection('about')} className={`cursor-pointer transition ${isTransparentActive ? 'hover:text-black' : 'hover:text-amber-600'}`}>About Us</li>
          </ul>
        )}
        
        {/* Right Icons */}
        <div className='flex items-center space-x-4 md:space-x-6'>
          <Link to="/cart">
            <div className='relative'>
              <BiCart className={`text-3xl cursor-pointer transition ${isTransparentActive ? 'hover:text-black' : 'hover:text-amber-600'}`}/>
              {quantity > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full font-bold shadow-sm'>{quantity}</span>
              )}
            </div>
          </Link>
          
          <BiUser className={`text-3xl cursor-pointer transition hidden sm:block ${isTransparentActive ? 'hover:text-black' : 'hover:text-amber-600'}`}/>

          {/* Botón menú hamburguesa (Visible estrictamente por debajo de 1217px) */}
          {isResponsiveMode && (
            <button className='text-3xl focus:outline-none transition-transform duration-200 active:scale-95' onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <BiX /> : <BiMenu />}
            </button>
          )}
        </div>

        {/* Menú Desplegable Móvil/Responsivo (Activo por debajo de 1217px) */}
        {isResponsiveMode && (
          <div className={`absolute top-full left-0 w-full bg-white text-gray-800 shadow-lg transition-all duration-300 flex flex-col items-center space-y-4 py-6 font-semibold uppercase ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
            <span onClick={() => scrollToSection('home')} className='cursor-pointer hover:text-amber-600 w-full text-center py-2'>Home</span>
            <span onClick={() => scrollToSection('dishes')} className='cursor-pointer hover:text-amber-600 w-full text-center py-2'>Our Products</span>
            <span onClick={() => scrollToSection('contact')} className='cursor-pointer hover:text-amber-600 w-full text-center py-2'>Contact</span>
            <span onClick={() => scrollToSection('about')} className='cursor-pointer hover:text-amber-600 w-full text-center py-2'>About Us</span>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar