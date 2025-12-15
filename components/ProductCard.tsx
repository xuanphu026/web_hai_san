import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative overflow-hidden h-48">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-ocean-800 shadow-sm">
          {product.category === 'tom' ? 'Tôm' : product.category === 'cua' ? 'Cua' : 'Cá'}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-ocean-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <span className="text-lg font-bold text-ocean-600">
            {formatCurrency(product.price)}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-ocean-50 text-ocean-600 hover:bg-ocean-600 hover:text-white p-2.5 rounded-full transition-all duration-200 active:scale-95"
            aria-label="Thêm vào giỏ"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};