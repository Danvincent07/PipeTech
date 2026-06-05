'use client';

import { Minus, Plus, ShoppingCart, Trash2, CreditCard } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12; // 12% VAT
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex h-full flex-col rounded-lg border-4 border-[#3B4B5C] bg-white shadow-2xl">
      {/* Cart Header */}
      <div className="border-b-4 border-[#FF6B35] bg-[#3B4B5C] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6B35]">
              <ShoppingCart className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Cart</h2>
              <p className="text-sm font-medium text-[#FF6B35]">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => items.forEach(item => onRemoveItem(item.id))}
              className="rounded-lg border-2 border-white/20 px-3 py-1 text-sm font-bold text-white transition-all hover:border-white hover:bg-white/10"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#3B4B5C]/10">
              <ShoppingCart className="h-10 w-10 text-[#3B4B5C]" strokeWidth={2} />
            </div>
            <h3 className="mb-2 text-lg font-bold text-[#2A2D34]">Cart is empty</h3>
            <p className="text-sm text-[#3B4B5C]">
              Add products to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg border-2 border-[#3B4B5C] bg-[#FAFAFA] p-3 shadow-md transition-all hover:border-[#FF6B35]"
              >
                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-red-500 text-white opacity-0 transition-all hover:bg-red-600 group-hover:opacity-100"
                  title="Remove item"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={2.5} />
                </button>

                {/* Item Info */}
                <div className="mb-3 pr-8">
                  <h3 className="font-bold leading-tight text-[#2A2D34] line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-[#FF6B35]">
                    ₱{item.price.toFixed(2)} each
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#3B4B5C] bg-white font-bold text-[#2A2D34] transition-all hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-white active:scale-95"
                    >
                      <Minus className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                    <div className="flex h-10 w-16 items-center justify-center rounded-lg border-2 border-[#3B4B5C] bg-white">
                      <span className="text-lg font-bold text-[#2A2D34]">
                        {item.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#3B4B5C] bg-white font-bold text-[#2A2D34] transition-all hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-white active:scale-95"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <p className="text-xs font-medium text-[#3B4B5C]">Total</p>
                    <p className="text-xl font-bold text-[#2A2D34]">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="border-t-4 border-[#3B4B5C] bg-[#FAFAFA] p-4">
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-[#3B4B5C]">Subtotal:</span>
            <span className="font-bold text-[#2A2D34]">₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-[#3B4B5C]">VAT (12%):</span>
            <span className="font-bold text-[#2A2D34]">₱{tax.toFixed(2)}</span>
          </div>
          <div className="border-t-2 border-[#3B4B5C] pt-2">
            <div className="flex justify-between">
              <span className="text-lg font-bold text-[#2A2D34]">Total:</span>
              <span className="text-2xl font-bold text-[#FF6B35]">
                ₱{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-4 border-[#FF6B35] bg-[#FF6B35] py-4 font-bold text-white shadow-lg transition-all hover:bg-[#FF5722] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <CreditCard className="h-5 w-5" strokeWidth={2.5} />
          <span className="text-lg">Proceed to Checkout</span>
        </button>
      </div>
    </div>
  );
}
