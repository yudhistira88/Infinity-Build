import React, { useState, cloneElement } from 'react';
import PencilRulerIcon from './icons/PencilRulerIcon';
import HomeModernIcon from './icons/HomeModernIcon';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';
import Squares2x2Icon from './icons/Squares2x2Icon';
import CogIcon from './icons/CogIcon';
import PencilIcon from './icons/PencilIcon';
import PhoneArrowUpRightIcon from './icons/PhoneArrowUpRightIcon';
import StarIcon from './icons/StarIcon';

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
            className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-xl transition-all duration-300 w-24 flex-shrink-0 h-24 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 ${
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
    const [activeCategory, setActiveCategory] = useState('Semua');

    const categories: Category[] = [
        { name: 'Semua', icon: <Squares2x2Icon />, iconColor: 'text-blue-600' },
        { name: 'Populer', icon: <StarIcon />, iconColor: 'text-orange-600' },
        { name: 'Desain Konstruksi', icon: <PencilRulerIcon />, iconColor: 'text-amber-600' },
        { name: 'Bangun / Renovasi', icon: <HomeModernIcon />, iconColor: 'text-cyan-600' },
        { name: 'Repair Maintenance', icon: <WrenchScrewdriverIcon />, iconColor: 'text-sky-600' },
        { name: 'Pabrikasi', icon: <CogIcon />, iconColor: 'text-slate-600' },
        { name: 'Interior', icon: <PencilIcon />, iconColor: 'text-purple-600' },
        { name: 'Panggil Tukang', icon: <PhoneArrowUpRightIcon />, iconColor: 'text-green-600' },
    ];

    return (
        <div className="py-1">
            <div className="flex overflow-x-auto space-x-3 scrollbar-hide px-4 py-4">
                {categories.map((cat) => (
                    <CategoryItem
                        key={cat.name}
                        category={cat}
                        isActive={activeCategory === cat.name}
                        onClick={() => {
                            setActiveCategory(cat.name);
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