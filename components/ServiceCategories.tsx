import React, { useState, cloneElement } from 'react';
import PencilRulerIcon from './icons/PencilRulerIcon';
import HomeModernIcon from './icons/HomeModernIcon';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';
import UserGroupIcon from './icons/UserGroupIcon';
import Squares2x2Icon from './icons/Squares2x2Icon';

interface Category {
    name: string;
    icon: React.ReactElement<{ className?: string }>;
    iconColor: string;
}

interface CategoryItemProps {
    category: Category;
    isActive: boolean;
    onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, isActive, onClick }) => {
    const iconWithClass = cloneElement(category.icon, {
        className: `w-6 h-6 transition-colors duration-300 ${isActive ? 'text-white' : category.iconColor}`
    });

    return (
        <button
            onClick={onClick}
            aria-pressed={isActive}
            className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-xl transition-all duration-300 w-full h-24 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 ${
                isActive
                ? 'bg-blue-800 text-white shadow-lg shadow-blue-800/30 transform -translate-y-1'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5'
            }`}
        >
            {iconWithClass}
            <span className="text-xs leading-tight font-semibold">{category.name}</span>
        </button>
    );
};

interface ServiceCategoriesProps {
    onCategorySelect?: (category: string) => void;
}

const ServiceCategories: React.FC<ServiceCategoriesProps> = ({ onCategorySelect }) => {
    const [activeCategory, setActiveCategory] = useState('');

    const categories: Category[] = [
        { name: 'Desain Konstruksi', icon: <PencilRulerIcon />, iconColor: 'text-green-600' },
        { name: 'Bangun / Renovasi', icon: <HomeModernIcon />, iconColor: 'text-cyan-600' },
        { name: 'Repair Maintenance', icon: <WrenchScrewdriverIcon />, iconColor: 'text-sky-600' },
        { name: 'Pabrikasi', icon: <HomeModernIcon />, iconColor: 'text-red-600' },
        { name: 'Interior / Eksterior', icon: <Squares2x2Icon />, iconColor: 'text-yellow-600' },
        { name: 'Panggil Tukang', icon: <UserGroupIcon />, iconColor: 'text-indigo-600' },
    ];

    return (
        <div className="px-4">
            <div className="grid grid-cols-3 gap-3 pt-3 pb-3">
                {categories.map((cat) => (
                    <CategoryItem
                        key={cat.name}
                        category={cat}
                        isActive={activeCategory === cat.name}
                        onClick={() => {
                            if (onCategorySelect) {
                                onCategorySelect(cat.name);
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ServiceCategories;