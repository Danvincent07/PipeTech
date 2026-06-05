'use client';

import { useState } from 'react';
import { ProductGrid } from './product-grid';
import { Cart } from './cart';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function POSClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Increment quantity if item already in cart
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    // TODO: Navigate to checkout page
    console.log('Proceeding to checkout with items:', cartItems);
    alert('Checkout functionality will be implemented in the next task!');
  };

  return (
    <div className="grid h-[calc(100vh-120px)] gap-4 lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,450px]">
      {/* Product Grid - Left Side */}
      <div className="rounded-lg border-4 border-[#3B4B5C] bg-white p-6 shadow-2xl">
        <ProductGrid onAddToCart={handleAddToCart} />
      </div>

      {/* Cart - Right Side */}
      <div className="h-full">
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
