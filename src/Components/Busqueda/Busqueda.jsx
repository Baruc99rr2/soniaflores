import React, { useState, useEffect, useRef, useMemo } from "react";
import { productsData } from "../../data"; // Ajustado según tu estructura de carpetas
import { useNavigate, Link } from "react-router-dom";
import { 
  MdLocationOn, MdSearch, MdTune, MdKeyboardArrowDown, 
  MdBed, MdBathtub, MdSquareFoot, MdChevronLeft, 
  MdChevronRight, MdViewList, MdViewModule, MdClose
} from 'react-icons/md';

const Busqueda = () => {
  const products = productsData;
  const navigate = useNavigate();

  // --- CONFIGURACIÓN Y ESTILOS ---
  const espacioNavbar = "pt-[75px]";
  const margenSuperiorFiltro = "mt-4 md:mt-4.5";
  const espacioEntreTarjetas = "gap-4 md:gap-6";
  const alturaSeccionCartas = "h-[calc(90vh-100px)] md:h-[calc(110vh-120px)]";

  const anchoMaxTarjetaLista = "max-w-full md:max-w-[820px]"; 
  const alturaTarjetaLista = "h-auto sm:h-[165px]"; 
  const anchoImagenLista = "w-full sm:w-[240px] h-[200px] sm:h-full"; 

  const anchoMaxTarjetaGrid = "max-w-full md:max-w-[310px]";
  const alturaImagenGrid = "w-full h-[180px]";

  const modalPaddingTop = "pt-2";
  const modalGapEntreCampos = "gap-3";
  const ITEMS_PER_PAGE = 15;

  // --- ESTADOS ---
  const [formInputs, setFormInputs] = useState({
    keyword: "", barrio: "", estado: "", tipo: "",
    dormitorios: "", banos: "", areaMin: "", areaMax: "", precioMin: "", precioMax: "", propId: ""
  });
  const [activeFilters, setActiveFilters] = useState({ ...formInputs });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); 
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [activePropId, setActivePropId] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // --- LÓGICA DE MAPA ---
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersGroup = useRef(null);
  const cardsContainerRef = useRef(null);
  const markersMapRef = useRef({});

  const coordenadasBarrios = {
    "Bajo La Viña": [-24.195, -65.290], "Los Perales": [-24.175, -65.315], "Centro": [-24.185, -65.300],
    "Ciudad de Nieva": [-24.178, -65.305], "Almirante Brown": [-24.195, -65.298], "Moreno": [-24.192, -65.293],
    "Palpalá": [-24.256, -65.211], "Cuyaya": [-24.188, -65.312], "San Pedrito": [-24.202, -65.288],
    "Alto Comedero": [-24.220, -65.260], "Yala": [-24.120, -65.403], "San Pablo de Reyes": [-24.140, -65.380]
  };

  // Función de Geocodificación
  const fetchCoordinates = async (query) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } catch (error) { console.warn("Error en geocodificación, usando fallback."); }
    return null;
  };

  useEffect(() => {
    if (cardsContainerRef.current) cardsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleInputChange = (field, value) => setFormInputs(prev => ({ ...prev, [field]: value }));
  const handleSearch = (e) => { if (e) e.preventDefault(); setActiveFilters({ ...formInputs }); setCurrentPage(1); setIsMobileFiltersOpen(false); };
  const handleClearFilters = () => { const cleared = Object.keys(formInputs).reduce((acc, key) => ({ ...acc, [key]: "" }), {}); setFormInputs(cleared); setActiveFilters(cleared); setCurrentPage(1); };

  useEffect(() => {
    const loadLeaflet = () => {
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link"); link.id = "leaflet-css"; link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link);
      }
      if (!document.getElementById("leaflet-js")) {
        const script = document.createElement("script"); script.id = "leaflet-js"; script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => initMap(); document.body.appendChild(script);
      } else if (window.L) { initMap(); }
    };
    loadLeaflet();
    return () => { if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; } };
  }, []);

  const initMap = () => {
    if (!mapRef.current || mapInstance.current || !window.L) return;
    const L = window.L;
    mapInstance.current = L.map(mapRef.current, { zoomControl: true, attributionControl: false }).setView([-24.185, -65.300], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(mapInstance.current);
    markersGroup.current = L.layerGroup().addTo(mapInstance.current);
    updateMapMarkers(filteredProducts);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const d = p.detalles || {}; const f = activeFilters;
      if (f.propId && p.id.toString() !== f.propId.trim()) return false;
      if (f.keyword && !p.name.toLowerCase().includes(f.keyword.toLowerCase()) && !p.description.toLowerCase().includes(f.keyword.toLowerCase())) return false;
      if (f.barrio && d.barrio !== f.barrio) return false;
      if (f.estado && p.category !== f.estado) return false;
      if (f.tipo && d.tipo !== f.tipo) return false;
      if (f.dormitorios && d.dormitorios !== parseInt(f.dormitorios)) return false;
      if (f.banos && d.banos !== parseInt(f.banos)) return false;
      if (f.areaMin && (!d.superficie_m2 || d.superficie_m2 < parseInt(f.areaMin))) return false;
      if (f.areaMax && (!d.superficie_m2 || d.superficie_m2 > parseInt(f.areaMax))) return false;
      if (p.price && p.price > 0) {
        if (f.precioMin && p.price < parseInt(f.precioMin)) return false;
        if (f.precioMax && p.price > parseInt(f.precioMax)) return false;
      }
      return true;
    });
  }, [products, activeFilters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      if (sortBy === "title") return a.name.localeCompare(b.name);
      if (sortBy === "antiguedad") return (a.detalles?.antiguedad || 0) - (b.detalles?.antiguedad || 0);
      return 0;
    });
  }, [filteredProducts, sortBy]);

  useEffect(() => { updateMapMarkers(filteredProducts); }, [filteredProducts]);

  const updateMapMarkers = async (propsToDisplay) => {
    if (!window.L || !mapInstance.current || !markersGroup.current) return;
    const L = window.L; markersGroup.current.clearLayers(); markersMapRef.current = {}; const bounds = [];
    
    for (const prop of propsToDisplay) {
      let coords = await fetchCoordinates(prop.detalles?.mapaQuery);
      if (!coords) coords = coordenadasBarrios[prop.detalles?.barrio] || [-24.185, -65.300];
      
      const finalCoords = [coords[0] + (Math.random() - 0.5) * 0.001, coords[1] + (Math.random() - 0.5) * 0.001];
      const textoPrecio = prop.price > 0 ? `USD ${new Intl.NumberFormat('es-AR').format(prop.price)}` : 'A consultar';
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="w-max inline-block bg-red-600 text-white font-bold px-2 py-1 rounded shadow-md border border-white text-center whitespace-nowrap transform transition-all duration-300 ${activePropId === prop.id ? 'scale-110 bg-gray-950 ring-2 ring-red-400' : ''}">${textoPrecio}</div>`,
        iconAnchor: [35, 12]
      });
      
      const popupContent = document.createElement('div'); popupContent.className = "flex flex-col gap-2 w-[180px] cursor-pointer font-sans";
      popupContent.innerHTML = `<div class="w-full h-[100px] overflow-hidden rounded bg-gray-50"><img src="${prop.images?.[0] || '/propiedades/unisex.jpg'}" class="w-full h-full object-cover" /></div><h5 class="m-0 font-bold text-xs text-gray-800 line-clamp-2">${prop.name}</h5><p class="m-0 text-xs text-red-500 font-extrabold">${prop.price > 0 ? `USD ${new Intl.NumberFormat('es-AR').format(prop.price)}` : 'A Consultar'}</p>`;
      popupContent.addEventListener('click', () => navigate(`/product/${prop.id}`));
      
      const marker = L.marker(finalCoords, { icon: customIcon }).bindPopup(popupContent); markersGroup.current.addLayer(marker); 
      markersMapRef.current[prop.id] = marker;
      bounds.push(finalCoords);
    }
    if (bounds.length > 0 && !activePropId) mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
  };

  const handlePropHover = (prop) => {
    setActivePropId(prop.id); 
    const marker = markersMapRef.current[prop.id];
    if (marker && mapInstance.current) {
      const mapBounds = mapInstance.current.getBounds();
      const markerLatLng = marker.getLatLng();
      if (!mapBounds.contains(markerLatLng)) {
        mapInstance.current.panTo(markerLatLng, { animate: true, duration: 0.6 });
      }
      marker.openPopup();
    }
  };

  const currentItems = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const barriosUnicos = useMemo(() => [...new Set(products.map(p => p.detalles?.barrio).filter(Boolean))], [products]);

  const renderAdvancedFields = (isMobile = false) => (
    <>
      <div className={isMobile ? "col-span-2" : ""}>
        <label className={`${isMobile ? 'text-xs font-bold text-gray-700' : 'text-[11px] font-bold text-gray-400'} uppercase block mb-1`}>Tipo</label>
        <select value={formInputs.tipo} onChange={(e) => handleInputChange("tipo", e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-red-500">
          <option value="">Todos</option>{["Casa", "Terreno", "Departamento", "Local", "Galpon"].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {[
        { label: "Dormitorios", type: "number", field: "dormitorios", placeholder: "Cantidad" },
        { label: "Baños", type: "number", field: "banos", placeholder: "Cantidad" },
        { label: "Área Mín (m²)", type: "number", field: "areaMin", placeholder: "Mínimo" },
        { label: "Área Max (m²)", type: "number", field: "areaMax", placeholder: "Máximo" },
        { label: "Precio Mín (USD)", type: "number", field: "precioMin", placeholder: "Mínimo" },
        { label: "Precio Max (USD)", type: "number", field: "precioMax", placeholder: "Máximo" },
        { label: "ID Propiedad", type: "text", field: "propId", placeholder: "Ej: 3" }
      ].map(f => (
        <div key={f.field} className={isMobile && f.field === "propId" ? "col-span-2" : ""}>
          <label className={`${isMobile ? 'text-xs font-bold text-gray-700' : 'text-[11px] font-bold text-gray-400'} uppercase block mb-1`}>{f.label}</label>
          <input type={f.type} placeholder={f.placeholder} value={formInputs[f.field]} onChange={(e) => handleInputChange(f.field, e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-red-500" />
        </div>
      ))}
    </>
  );

  return (
    <div className={`w-full relative block bg-gray-50 ${espacioNavbar}`}>
      <form onSubmit={handleSearch} className={`hidden md:block w-full bg-white border-b border-gray-200 px-4 md:px-8 py-3 relative z-30 ${margenSuperiorFiltro}`}>
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="relative md:col-span-4">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input type="text" placeholder="Palabra clave..." value={formInputs.keyword} onChange={(e) => handleInputChange("keyword", e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500" />
            </div>
            <div className="relative md:col-span-3">
              <select value={formInputs.barrio} onChange={(e) => handleInputChange("barrio", e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-red-500">
                <option value="">Todas las zonas</option>{barriosUnicos.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative md:col-span-2">
              <select value={formInputs.estado} onChange={(e) => handleInputChange("estado", e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-red-500">
                <option value="">Estado</option><option value="Venta">Venta</option><option value="Alquiler">Alquiler</option>
              </select>
              <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button type="button" onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className={`md:col-span-2 flex items-center justify-center gap-1.5 py-2 border rounded-lg text-sm font-semibold transition-all ${isAdvancedOpen ? 'bg-red-50 border-red-200 text-red-600 shadow-inner' : 'bg-white border-gray-200 text-gray-700'}`}><MdTune /> Avanzado</button>
            <button type="submit" className="md:col-span-1 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold shadow-md transition-all">Buscar</button>
          </div>
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-hidden transition-all duration-500 ${isAdvancedOpen ? 'max-h-[300px] opacity-100 pt-2 border-t mt-1' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            {renderAdvancedFields(false)}
          </div>
        </div>
      </form>
      <div className={`block md:hidden w-full bg-white border-b border-gray-200 p-3 relative z-30 ${margenSuperiorFiltro}`}>
        <div onClick={() => setIsMobileFiltersOpen(true)} className="w-full flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-pointer">
          <MdSearch className="text-xl text-gray-400" /><span className="flex-1 font-medium text-left">Buscar propiedades...</span><MdTune className="text-lg text-gray-500" />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-10 clear-both content-start">
        <div className="hidden lg:block lg:col-span-4 relative">
          <div ref={mapRef} className={`w-full ${alturaSeccionCartas} z-10`} />
        </div>
        <div ref={cardsContainerRef} className={`col-span-1 lg:col-span-6 p-4 md:p-6 flex flex-col justify-between ${alturaSeccionCartas} overflow-y-auto custom-scrollbar`}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3 mb-4">
            <div className="text-sm font-semibold text-gray-700">{sortedProducts.length} Resultados encontrados</div>
            <div className="flex items-center gap-4">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border border-gray-200 rounded-md py-1 px-2.5 text-xs focus:outline-none text-gray-700">
                <option value="default">Orden por defecto</option><option value="price-asc">Precio: Menor a Mayor</option><option value="price-desc">Precio: Mayor a Menor</option><option value="title">Título</option><option value="antiguedad">Antigüedad</option>
              </select>
              <div className="flex items-center border border-gray-200 rounded-md p-0.5 bg-gray-100/70">
                <button onClick={() => setViewMode("list")} className={`p-1 rounded transition-colors ${viewMode === "list" ? 'bg-white text-red-600 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700'}`}><MdViewList className="text-lg" /></button>
                <button onClick={() => setViewMode("grid")} className={`p-1 rounded transition-colors ${viewMode === "grid" ? 'bg-white text-red-600 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700'}`}><MdViewModule className="text-lg" /></button>
              </div>
            </div>
          </div>
          {currentItems.length > 0 ? (
            <div className={`grid ${espacioEntreTarjetas} mb-6 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {currentItems.map((prop) => (
                <PropertySearchCard key={prop.id} product={prop} viewMode={viewMode} onHover={() => handlePropHover(prop)} onLeave={() => setActivePropId(null)} anchoMaxLista={anchoMaxTarjetaLista} alturaLista={alturaTarjetaLista} anchoImgLista={anchoImagenLista} anchoMaxGrid={anchoMaxTarjetaGrid} alturaImgGrid={alturaImagenGrid} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-xs my-auto">
              <p className="text-gray-500 text-base font-medium">No se encontraron propiedades.</p>
              <button type="button" onClick={handleClearFilters} className="mt-4 bg-gray-900 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">Limpiar Filtros</button>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 border-t border-gray-200 pt-4 mt-auto">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-40"><MdChevronLeft className="text-xl" /></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 font-bold text-xs rounded-lg ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'border text-gray-700 bg-white hover:bg-gray-50'}`}>{i + 1}</button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-40"><MdChevronRight className="text-xl" /></button>
            </div>
          )}
        </div>
      </div>
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
            <h2 className="text-base font-black text-gray-800 uppercase tracking-wider">Buscar Filtros</h2>
            <button type="button" onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-gray-700 hover:text-red-600 transition-colors focus:outline-none"><MdClose className="text-2xl" /></button>
          </div>
          <form onSubmit={handleSearch} className={`flex-1 overflow-y-auto p-5 ${modalPaddingTop} flex flex-col ${modalGapEntreCampos} bg-red-50/10`}>
            <div>
              <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Palabra clave</label>
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input type="text" placeholder="Ej. Casa, Terreno..." value={formInputs.keyword} onChange={(e) => handleInputChange("keyword", e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Barrio / Zona</label>
                <select value={formInputs.barrio} onChange={(e) => handleInputChange("barrio", e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500">
                  <option value="">Todas</option>{barriosUnicos.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Estado</label>
                <select value={formInputs.estado} onChange={(e) => handleInputChange("estado", e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500">
                  <option value="">Todos</option><option value="Venta">Venta</option><option value="Alquiler">Alquiler</option>
                </select>
              </div>
              {renderAdvancedFields(true)}
            </div>
            <div className="mt-auto pt-4 grid grid-cols-2 gap-4 border-t border-gray-200 shrink-0 bg-white">
              <button type="button" onClick={handleClearFilters} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg text-sm font-bold transition-colors">Limpiar</button>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-sm font-bold shadow-md transition-colors">Buscar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const PropertySearchCard = ({ 
  product, viewMode, onHover, onLeave, 
  anchoMaxLista, alturaLista, anchoImgLista, 
  anchoMaxGrid, alturaImgGrid 
}) => {
  const images = product.images && product.images.length > 0 ? product.images : ['/propiedades/unisex.jpg'];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const changeSlide = (e, direction) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImgIndex((prev) => direction === "next" 
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
          ? `flex-col w-full ${anchoMaxGrid}` 
          : `flex-col sm:flex-row w-full ${anchoMaxLista} ${alturaLista}`
      } group`}
    >
      <div className={`relative overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center ${isGrid ? alturaImgGrid : anchoImgLista}`}>
        <img src={images[currentImgIndex]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        
        {images.length > 1 && (
          <>
            <button onClick={(e) => changeSlide(e, "prev")} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><MdChevronLeft /></button>
            <button onClick={(e) => changeSlide(e, "next")} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><MdChevronRight /></button>
          </>
        )}

        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1">
          <span className="text-[10px] font-bold text-gray-900 bg-white/95 px-2 py-1 rounded shadow-md uppercase">{product.category || "VENTA"}</span>
          {isInversion && <span className="text-[10px] font-bold text-white bg-amber-500 px-2 py-1 rounded shadow-md uppercase">Inversión</span>}
          {isNuevo && <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-1 rounded shadow-md uppercase">Nuevo</span>}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 uppercase truncate">
              <MdLocationOn className="text-red-500" />
              {product.detalles?.barrio || "Ubicación"}
            </div>
            <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded uppercase">{product.detalles?.tipo || "Inmueble"}</span>
          </div>
          <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-1 leading-tight mb-2 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 pb-2 border-b border-gray-100">
            {!isTerreno && (
              <>
                <span className="flex items-center gap-1"><MdBed className="text-gray-600" /> {product.detalles?.dormitorios || 0}</span>
                <span className="flex items-center gap-1"><MdBathtub className="text-gray-600" /> {product.detalles?.banos || 0}</span>
              </>
            )}
            <span className="flex items-center gap-1"><MdSquareFoot className="text-gray-600" /> {product.detalles?.superficie_m2 || 0} m²</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="font-extrabold text-lg text-gray-900">
            {product.price > 0 ? `USD ${new Intl.NumberFormat('es-AR').format(product.price)}` : 'A consultar'}
          </div>
          <Link to={`/product/${product.id}`} className="bg-gray-900 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Busqueda;