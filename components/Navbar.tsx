import React from 'react';
import { Category } from '../types';

interface NavbarProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  cartCount: number;
  onToggleCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeCategory, 
  onSelectCategory, 
  cartCount,
  onToggleCart
}) => {
  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'Tất cả', icon: 'fa-store' },
    { id: 'tom', label: 'Tôm', icon: 'fa-shrimp' }, // Note: fa-shrimp might need Pro, falling back to reliable ones if needed
    { id: 'cua', label: 'Cua', icon: 'fa-paste' }, // Using paste as abstract for crab shell if dedicated icon missing
    { id: 'ca', label: 'Cá', icon: 'fa-fish' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onSelectCategory('all')}>
            <div className="bg-ocean-600 text-white p-2 rounded-lg">
              <i className="fas fa-anchor text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-ocean-900 leading-none">Vua Hải Sản</h1>
              <span className="text-xs text-ocean-600 font-medium">Tươi Ngon Mỗi Ngày</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeCategory === cat.id
                    ? 'bg-white text-ocean-600 shadow-sm'
                    : 'text-gray-500 hover:text-ocean-600 hover:bg-gray-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Cart Button */}
          <button 
            onClick={onToggleCart}
            className="relative p-2 text-gray-600 hover:text-ocean-600 transition-colors"
          >
            <i className="fas fa-shopping-cart text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu (Simple pills) */}
        <div className="md:hidden flex space-x-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
           {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm border ${
                  activeCategory === cat.id
                    ? 'bg-ocean-600 text-white border-ocean-600'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
        </div>
      </div>
    </nav>
  );
};