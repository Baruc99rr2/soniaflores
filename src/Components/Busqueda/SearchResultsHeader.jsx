import React from "react";
import { MdViewList, MdViewModule } from 'react-icons/md';

const SearchResultsHeader = ({
  sortedProducts,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3 mb-4">
      {/* Cantidad de resultados */}
      <div className="text-sm font-semibold text-gray-700">
        {sortedProducts.length} Resultados encontrados
      </div>

      {/* Controles de orden y vista */}
      <div className="flex items-center gap-4">
        {/* Ordenamiento */}
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          className="bg-white border border-gray-200 rounded-md py-1.5 px-3 text-xs focus:outline-none text-gray-700"
        >
          <option value="default">Orden por defecto</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="title">Título</option>
          <option value="antiguedad">Antigüedad</option>
        </select>

        {/* Cambio de vista (Lista / Grid) */}
        <div className="flex items-center border border-gray-200 rounded-md p-0.5 bg-gray-100/70">
          <button 
            onClick={() => setViewMode("list")} 
            className={`p-2 rounded transition-colors ${viewMode === "list" 
              ? 'bg-white text-red-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'}`}
            title="Vista Lista"
          >
            <MdViewList className="text-xl" />
          </button>
          
          <button 
            onClick={() => setViewMode("grid")} 
            className={`p-2 rounded transition-colors ${viewMode === "grid" 
              ? 'bg-white text-red-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'}`}
            title="Vista Cuadrícula"
          >
            <MdViewModule className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsHeader;