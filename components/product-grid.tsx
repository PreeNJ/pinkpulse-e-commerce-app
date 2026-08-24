'use client';

import React, { useState, useMemo } from 'react';
import { Product, ProductColor, ProductCategory } from '@/lib/types';
import { ProductCard } from './product-card';
import { SlidersHorizontal, Sparkles, Search, LayoutGrid, List, Check, X } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onAddToCart: (product: Product, color: ProductColor) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(7000);
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'ladies-toys', label: 'Ladies Toys 🌷' },
    { id: 'men-toys', label: 'Men Toys ⚡' },
    { id: 'lovense', label: 'Couples & Wireless 💖' },
    { id: 'bondage', label: 'Bondage & Fantasy 🎲' },
    { id: 'lubricants', label: 'Lubes & Care 🍓' },
    { id: 'anal-toys', label: 'Anal Toys ✨' },
    { id: 'dildos', label: 'Glass & Dildos 💎' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch =
          searchQuery === '' ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        const itemPrice = item.salePrice ?? item.price;
        const matchesPrice = itemPrice <= maxPriceFilter;
        const matchesStock = !inStockOnly || item.inStock;
        return matchesCategory && matchesSearch && matchesPrice && matchesStock;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPriceFilter, inStockOnly]);

  return (
    <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#28212e]">
        <div>
          <div className="flex items-center gap-2 text-[#f4bac7] text-xs font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#f47293]" />
            <span>Curated Kenya Catalog</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            Sensory Pleasure, Made For You.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg font-light">
            Thoughtfully crafted intimate wellness items with body-safe silicone, whisper motors, and 100% confidential dispatch.
          </p>
        </div>

        {/* Sort, View Toggle & Filter Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filter Trigger */}
          <button
            onClick={() => setShowFilterModal(!showFilterModal)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${showFilterModal || inStockOnly || maxPriceFilter < 7000
              ? 'bg-[#b84663] text-white border-[#b84663]'
              : 'bg-[#150f1a] text-neutral-300 border-[#2b2133] hover:border-[#b84663]/50'
              }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            {(inStockOnly || maxPriceFilter < 7000) && (
              <span className="w-2 h-2 rounded-full bg-white ml-0.5" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#150f1a] border border-[#2b2133] rounded-xl px-3 py-2 text-xs text-neutral-300">
            <span className="text-neutral-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="featured" className="bg-[#150f1a]">Bestsellers First</option>
              <option value="price-asc" className="bg-[#150f1a]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#150f1a]">Price: High to Low</option>
              <option value="rating" className="bg-[#150f1a]">Highest Rated</option>
            </select>
          </div>

          {/* View Mode Switcher: Grid vs List */}
          <div className="hidden sm:flex items-center bg-[#150f1a] border border-[#2b2133] rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#b84663] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#b84663] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Drawer Popup / Banner */}
      {showFilterModal && (
        <div className="my-4 p-5 rounded-2xl bg-[#140f1c] border border-[#382b42] shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#28212e] mb-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#f47293]" />
              <span>Catalog Filters</span>
            </h4>
            <button
              onClick={() => setShowFilterModal(false)}
              className="text-neutral-400 hover:text-white text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Filter */}
            <div>
              <div className="flex justify-between text-xs text-neutral-300 mb-2">
                <span>Max Price:</span>
                <span className="font-bold text-[#f4bac7]">KSh {maxPriceFilter.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={7000}
                step={200}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#b84663] cursor-pointer"
              />
            </div>

            {/* In Stock Only Toggle */}
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-300 select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#b84663] cursor-pointer"
                />
                <span>Show in-stock items only</span>
              </label>
            </div>

            {/* Reset Filters */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setMaxPriceFilter(7000);
                  setInStockOnly(false);
                }}
                className="text-xs text-neutral-400 hover:text-white underline"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 rounded-xl bg-[#b84663] text-white text-xs font-semibold"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${selectedCategory === cat.id
              ? 'bg-[#b84663] text-white shadow-md shadow-rose-950/40 font-bold scale-105'
              : 'bg-[#150f1a] hover:bg-[#201827] text-neutral-300 border border-[#2b2133]'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Results Grid / List */}
      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#120d18] rounded-3xl border border-[#28212e] p-8">
          <Search className="w-12 h-12 text-[#f47293] mx-auto opacity-40 mb-4" />
          <h3 className="font-serif text-2xl font-normal text-white">No products found</h3>
          <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-md mx-auto font-light">
            We couldn't find any items matching your filters. Try resetting search or adjusting price limit.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setMaxPriceFilter(7000);
              setInStockOnly(false);
            }}
            className="mt-6 px-6 py-2.5 rounded-xl bg-[#b84663] hover:bg-[#c95372] text-white text-xs font-bold transition-colors"
          >
            Show All Products
          </button>
        </div>
      )}
    </section>
  );
};
