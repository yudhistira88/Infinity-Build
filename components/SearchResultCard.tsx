import React from 'react';
import type { Service } from '../types';

const SearchResultCard: React.FC<{ service: Service; onClick: () => void; }> = ({ service, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 space-x-4 hover:border-blue-400 hover:shadow-md transition-all duration-200 text-left">
        <img src={service.image} alt={service.name} className="w-16 h-16 object-cover rounded-md"/>
        <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.priceRange}</p>
        </div>
    </button>
);

export default SearchResultCard;