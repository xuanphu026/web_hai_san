import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b flex justify-between items-center bg-ocean-50">
          <h2 className="text-xl font-bold text-ocean-900">
            <i className="fas fa-shopping-basket mr-2"></i>
            Giỏ Hàng
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <i className="fas fa-fish text-6xl mb-4 opacity-20"></i>
              <p>Giỏ hàng của bạn đang trống.</p>
              <button 
                onClick={onClose}
                className="mt-4 text-ocean-600 font-medium hover:underline"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-ocean-100 transition-colors">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                  <p className="text-sm text-ocean-600 font-medium mb-2">
                    {formatCurrency(item.price)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-ocean-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-ocean-600"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Tổng cộng:</span>
              <span className="text-2xl font-bold text-ocean-800">{formatCurrency(total)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-ocean-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-ocean-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Thanh Toán Ngay</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};