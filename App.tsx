import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { ChefAssistant } from './components/ChefAssistant';
import { PRODUCTS } from './constants';
import { Category, Product, CartItem } from './types';

const App: React.FC = () => {
  const [category, setCategory] = useState<Category>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return category === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === category);
  }, [category]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Auto open cart for feedback
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert("Chức năng thanh toán đang được phát triển! Cảm ơn bạn đã thử nghiệm demo.");
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        activeCategory={category}
        onSelectCategory={setCategory}
        cartCount={cartCount}
        onToggleCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-ocean-500 to-ocean-800 rounded-3xl p-8 mb-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Hải Sản Tươi Sống</h2>
            <p className="text-ocean-100 text-lg mb-6">Chất lượng cao cấp - Giao hàng trong 2h - Đảm bảo tươi ngon</p>
            <button 
              onClick={() => setCategory('all')}
              className="bg-white text-ocean-600 px-6 py-3 rounded-full font-bold hover:bg-ocean-50 transition-colors"
            >
              Mua Sắm Ngay
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
             <i className="fas fa-fish text-[300px]"></i>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6 flex items-center justify-between">
           <h3 className="text-2xl font-bold text-gray-800">
             {category === 'all' ? 'Tất cả sản phẩm' : 
              category === 'tom' ? 'Các loại Tôm' : 
              category === 'cua' ? 'Các loại Cua' : 'Các loại Cá'}
           </h3>
           <span className="text-gray-500">{filteredProducts.length} sản phẩm</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500">Không tìm thấy sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-10">
        <div className="container mx-auto px-4 text-center text-gray-500">
           <div className="mb-4 flex justify-center space-x-4">
             <a href="#" className="hover:text-ocean-600"><i className="fab fa-facebook text-2xl"></i></a>
             <a href="#" className="hover:text-ocean-600"><i className="fab fa-instagram text-2xl"></i></a>
             <a href="#" className="hover:text-ocean-600"><i className="fab fa-twitter text-2xl"></i></a>
           </div>
           <p className="mb-2">© 2024 Vua Hải Sản. All rights reserved.</p>
           <p className="text-sm">Địa chỉ: 123 Đường Biển, Quận 1, TP.HCM | Hotline: 1900 1234</p>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <ChefAssistant cartItems={cartItems} />
    </div>
  );
};

export default App;