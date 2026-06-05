'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ProductGrid } from './product-grid';
import { Cart } from './cart';
import { CheckoutModal } from './checkout-modal';
import { completeSale } from '../actions';
import { toast } from 'sonner';
import type { PaymentMethod } from '@/types';

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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmCheckout = async (paymentData: {
    paymentMethod: PaymentMethod;
    amountPaid: number;
    notes?: string;
  }) => {
    try {
      await completeSale({
        items: cartItems,
        ...paymentData,
      });

      // Clear cart and close modal
      setCartItems([]);
      setIsCheckoutOpen(false);
      toast.success('Sale completed successfully!');

      // The server action redirects to the sale details page
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to complete sale'
      );
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
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

      {/* Checkout Modal */}
      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleConfirmCheckout}
        total={total}
      />
    </>
  );
}
