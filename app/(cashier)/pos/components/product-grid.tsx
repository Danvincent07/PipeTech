'use client';

import { Search, Package } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock products - will be replaced with API data
  const products: Product[] = [
    { id: '1', name: 'Standard Block 4"', price: 15.00, stock: 500, category: 'Blocks' },
    { id: '2', name: 'Standard Block 6"', price: 22.00, stock: 350, category: 'Blocks' },
    { id: '3', name: 'Standard Block 8"', price: 28.00, stock: 420, category: 'Blocks' },
    { id: '4', name: 'Hollow Block 4"', price: 18.00, stock: 280, category: 'Blocks' },
    { id: '5', name: 'Hollow Block 6"', price: 25.00, stock: 190, category: 'Blocks' },
    { id: '6', name: 'Hollow Block 8"', price: 32.00, stock: 150, category: 'Blocks' },
    { id: '7', name: 'Cement 50kg', price: 350.00, stock: 80, category: 'Materials' },
    { id: '8', name: 'Sand (cubic meter)', price: 1200.00, stock: 15, category: 'Materials' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#FF6B35]" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border-2 border-[#3B4B5C] bg-white py-4 pl-12 pr-4 text-base font-medium text-[#2A2D34] placeholder-gray-400 shadow-lg transition-all focus:border-[#FF6B35] focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/20"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="group relative overflow-hidden rounded-lg border-2 border-[#3B4B5C] bg-white p-4 text-left shadow-lg transition-all hover:scale-105 hover:border-[#FF6B35] hover:shadow-2xl active:scale-95"
            >
              {/* Stock Badge */}
              <div className="absolute right-3 top-3 rounded-md bg-[#2A2D34] px-2 py-1 text-xs font-bold text-white shadow-md">
                {product.stock} left
              </div>

              {/* Product Icon */}
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-[#FF6B35]/10 transition-colors group-hover:bg-[#FF6B35]/20">
                <Package className="h-8 w-8 text-[#FF6B35]" strokeWidth={2.5} />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold leading-tight text-[#2A2D34] line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-[#3B4B5C]">
                  {product.category}
                </p>
                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-xs font-bold text-[#3B4B5C]">₱</span>
                  <span className="text-2xl font-bold text-[#FF6B35]">
                    {product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#FF6B35] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#3B4B5C]/20">
              <Search className="h-10 w-10 text-[#3B4B5C]" strokeWidth={2} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">No products found</h3>
            <p className="text-[#FAFAFA]/70">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
