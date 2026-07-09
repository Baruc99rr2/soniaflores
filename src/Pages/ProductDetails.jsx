import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsData } from '../data';
import { BiChevronLeft, BiChevronRight, BiBed, BiArea, BiHomeAlt, BiCar, BiCalendar, BiWater, BiBlanket, BiBuildingHouse, BiMap, BiShareAlt, BiLogoWhatsapp, BiLogoFacebook, BiLogoInstagram } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineBathtub, MdLocationOn, MdOutlineLocalDrink, MdOutlineElectricBolt, MdOutlineGasMeter, MdOutlineSevereCold } from 'react-icons/md';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const serviceIcons = {
    'Agua Potable': <MdOutlineLocalDrink />,
    'Cloaca': <BiWater />,
    'Gas Natural': <MdOutlineGasMeter />,
    'Electricidad': <MdOutlineElectricBolt />,
    'Pavimento': <BiBuildingHouse />,
    'Internet': <BiMap />,
};

const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => { map.setView(center, 15); }, [center, map]);
    return null;
};

const ProductDetails = () => {
    const { id } = useParams();
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [coords, setCoords] = useState([-24.185, -65.300]);

    const product = productsData.find((product) => product.id === parseInt(id));

    const fetchCoordinates = async (query) => {
        try {
            const context = ", San Salvador de Jujuy, Jujuy, Argentina";
            const fullQuery = query.toLowerCase().includes("jujuy") ? query : `${query}${context}`;
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}&limit=1`;
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            }
        } catch (error) {
            console.warn("Error geocodificando, usando fallback.");
        }
        return null;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentImgIndex(0);
        const resolveLocation = async () => {
            if (product?.detalles?.mapaQuery) {
                const found = await fetchCoordinates(product.detalles.mapaQuery);
                if (found) setCoords(found);
            }
        };
        resolveLocation();
    }, [id, product]);

    if (!product) return <div className="text-center py-20 font-medium">Producto no encontrado.</div>;

    const imagesList = product.images || [product.image];
    const prevImage = (e) => { e?.stopPropagation(); setCurrentImgIndex(prev => prev === 0 ? imagesList.length - 1 : prev - 1); };
    const nextImage = (e) => { e?.stopPropagation(); setCurrentImgIndex(prev => prev === imagesList.length - 1 ? 0 : prev + 1); };

    const specs = [
        { icon: <BiBuildingHouse />, label: 'Tipo', value: product.detalles?.tipo || '-' },
        { icon: <BiHomeAlt />, label: 'Ambientes', value: product.detalles?.ambientes || '-' },
        { icon: <BiBed />, label: 'Dormitorios', value: product.detalles?.dormitorios || '-' },
        { icon: <MdOutlineBathtub />, label: 'Baños', value: product.detalles?.banos || '-' },
        { icon: <BiArea />, label: 'm² Cubiertos', value: product.detalles?.superficie_m2 || '-' },
        { icon: <BiCar />, label: 'Cocheras', value: product.detalles?.cocheras || '0' },
        { icon: <BiCalendar />, label: 'Año Const.', value: product.detalles?.anio || '2026' },
        { icon: <MdOutlineSevereCold />, label: 'Antigüedad', value: product.detalles?.antiguedad ? `${product.detalles.antiguedad} años` : '-' },
    ];

    const serviciosDisponibles = product.detalles?.servicios || [];
    const serviciosGrid = serviciosDisponibles.map(servicio => ({
        icon: serviceIcons[servicio] || <BiBlanket />,
        label: servicio,
    }));

    const currentUrl = window.location.href;
    const shareText = `¡Mirá esta propiedad en ${product.detalles?.barrio || ''}!: ${product.name}`;

    const shareLinks = [
        { platform: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`, icon: <BiLogoWhatsapp size={24} /> },
        { platform: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, icon: <BiLogoFacebook size={24} /> },
        { platform: 'Instagram', url: '#', icon: <BiLogoInstagram size={24} /> },
        { platform: 'Copiar Enlace', url: currentUrl, icon: <BiShareAlt size={24} /> },
    ];

    const handleShare = (link) => {
        if (link.platform === 'Copiar Enlace') {
            navigator.clipboard.writeText(currentUrl).then(() => alert('Enlace copiado al portapapeles'));
            return;
        }
        if (link.platform === 'Instagram') {
            alert('Para compartir en Instagram, copia el enlace y pégalo manualmente en tu historia.');
            return;
        }
        window.open(link.url, '_blank', 'width=600,height=400');
    };

    return (
        <div className='flex flex-col min-h-screen bg-gray-50 w-full overflow-x-hidden'>
            {/* Hero Image */}
            <div 
                className='w-full relative bg-black h-[40vh] md:h-[65vh] cursor-pointer overflow-hidden' 
                onClick={() => setIsFullscreen(true)}
            >
                <div 
                    className="flex w-full h-full transition-transform duration-500 ease-out" 
                    style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}
                >
                    {imagesList.map((img, index) => (
                        <div key={index} className="min-w-full h-full">
                            <img src={img} className='w-full h-full object-cover' alt={`Vista ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <button 
                    onClick={prevImage} 
                    className='absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 md:p-4 rounded-full text-white transition-colors'
                >
                    <BiChevronLeft size={28} />
                </button>
                <button 
                    onClick={nextImage} 
                    className='absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 md:p-4 rounded-full text-white transition-colors'
                >
                    <BiChevronRight size={28} />
                </button>

                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-4 py-1 rounded-full">
                    {currentImgIndex + 1} / {imagesList.length}
                </div>
            </div>

            {/* Contenido Principal */}
            <div className='w-full max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-8 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
                
                {/* Columna Izquierda - Contenido */}
                <div className='lg:col-span-8 space-y-6 lg:space-y-8'>
                    <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase">
                                <MdLocationOn /> {product.detalles?.barrio}
                                <span className='bg-gray-100 text-gray-600 px-3 py-1 ml-2 rounded-full text-xs font-medium'>
                                    {product.category}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                {shareLinks.map((link, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleShare(link)} 
                                        className="text-gray-400 hover:text-red-600 p-2 transition-colors"
                                        title={`Compartir en ${link.platform}`}
                                    >
                                        {link.icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <h1 className='text-2xl sm:text-4xl font-black text-gray-900 leading-tight mb-3'>
                            {product.name}
                        </h1>
                        <p className='text-2xl sm:text-3xl font-extrabold text-red-600'>
                            USD ${new Intl.NumberFormat('es-AR').format(product.price)}
                            {product.category.toLowerCase() === 'alquiler' && (
                                <span className='text-base sm:text-lg font-medium text-gray-500 ml-1'>/ mes</span>
                            )}
                        </p>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {specs.map((item, i) => (
                            <div key={i} className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 flex items-start gap-3">
                                <div className="text-2xl sm:text-3xl text-red-600 mt-0.5">{item.icon}</div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">{item.label}</p>
                                    <p className="text-sm sm:text-base font-semibold text-gray-900">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Descripción */}
                    <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Descripción</h3>
                        <p className='text-gray-600 leading-relaxed text-[15px] sm:text-lg'>
                            {product.description}
                        </p>
                    </div>

                    {/* Servicios */}
                    {serviciosGrid.length > 0 && (
                        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold mb-5">Servicios Incluidos</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {serviciosGrid.map((s, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                        <div className="text-2xl text-red-600">{s.icon}</div>
                                        <span className="font-medium text-gray-800">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Columna Derecha - Mapa */}
                <div className={`lg:col-span-4 ${isFullscreen ? 'hidden lg:block' : 'block'}`}>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden lg:sticky lg:top-8">
                        <div className="h-[320px] sm:h-[400px] lg:h-[520px] w-full">
                            <MapContainer center={coords} zoom={15} className="w-full h-full">
                                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                                <MapUpdater center={coords} />
                                <Marker position={coords} icon={L.divIcon({ 
                                    className: 'custom-marker', 
                                    html: `<div class="w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center"></div>` 
                                })} />
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div 
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center" 
                    onClick={() => setIsFullscreen(false)}
                >
                    <button 
                        onClick={() => setIsFullscreen(false)} 
                        className='absolute top-6 right-6 text-white z-[110]'
                    >
                        <IoMdClose size={40} />
                    </button>

                    <div className="w-full h-full flex items-center justify-center p-4 relative">
                        <div 
                            className="flex w-full h-full transition-transform duration-500 ease-out" 
                            style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}
                        >
                            {imagesList.map((img, index) => (
                                <div key={index} className="min-w-full h-full flex items-center justify-center">
                                    <img 
                                        src={img} 
                                        className='max-w-full max-h-full object-contain' 
                                        onClick={e => e.stopPropagation()} 
                                        alt="Full view" 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={prevImage} className='absolute left-4 md:left-8 text-white z-[110]'><BiChevronLeft size={48} /></button>
                    <button onClick={nextImage} className='absolute right-4 md:right-8 text-white z-[110]'><BiChevronRight size={48} /></button>
                    
                    <div className="absolute bottom-8 text-white font-bold text-xl">
                        {currentImgIndex + 1} / {imagesList.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;