/**
 * File: client/src/components/Filters.jsx
 * Purpose: Sidebar filters used on Home/Dashboard to refine event list.
 *
 * Props:
 * - setFilterParams(updater): parent state setter for query params
 *
 * Local state tracks selected category, location, and price range; applies to
 * query parameters consumed by `getEvents`.
 */
import React, { useState } from 'react';
import { FaMusic, FaMapMarkerAlt, FaDollarSign, FaTimes } from 'react-icons/fa';

const Filters = ({ setFilterParams }) => {
  const categories = ['Movie', 'Concert', 'Play', 'Sports', 'Workshop'];
  const locations = ['Downtown', 'Uptown', 'Suburb', 'City Center'];
  const [priceRange, setPriceRange] = useState(5000);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeLocation, setActiveLocation] = useState('');

  // Toggle a category filter and inform parent
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilterParams((prev) => ({
      ...prev,
      category: category || undefined,
    }));
  };

  // Toggle a location filter and inform parent
  const handleLocationChange = (location) => {
    setActiveLocation(location);
    setFilterParams((prev) => ({
      ...prev,
      location: location || undefined,
    }));
  };

  // Set maxPrice upper bound
  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange(value);
    setFilterParams((prev) => ({
      ...prev,
      maxPrice: value,
    }));
  };

  // Clear all filters to defaults
  const resetFilters = () => {
    setActiveCategory('');
    setActiveLocation('');
    setPriceRange(5000);
    setFilterParams({});
  };

  return (
    <div className="card p-7 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <h3 className="text-2xl font-bold font-display text-gray-900">Refine</h3>
        {(activeCategory || activeLocation || priceRange !== 5000) && (
          <button
            onClick={resetFilters}
            className="text-amber-700 hover:text-amber-900 text-sm font-bold flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
          >
            <FaTimes size={12} className="animate-spin-slow" /> Clear
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-gold-blob flex items-center justify-center">
            <FaMusic className="brand-icon text-lg" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg">Categories</h4>
        </div>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(activeCategory === cat ? '' : cat)}
              className={`w-full px-5 py-3 rounded-xl font-semibold transition-all duration-300 text-left transform hover:scale-102 ${
                activeCategory === cat
                  ? 'bg-gold-strong text-white shadow-lg'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="divider-gradient"></div>

      {/* Location Filter */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-gold-blob flex items-center justify-center">
            <FaMapMarkerAlt className="brand-icon text-lg" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg">Location</h4>
        </div>
        <div className="space-y-2.5">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocationChange(activeLocation === loc ? '' : loc)}
              className={`w-full px-5 py-3 rounded-xl font-semibold transition-all duration-300 text-left transform hover:scale-102 ${
                activeLocation === loc
                  ? 'bg-gold-strong text-white shadow-lg'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <div className="divider-gradient"></div>

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-gold-blob flex items-center justify-center">
            <FaDollarSign className="brand-icon text-lg" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg">Price Range</h4>
        </div>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange}
            onChange={handlePriceChange}
            className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between items-center px-2">
            <span className="text-sm font-semibold text-gray-600">₹0</span>
            <span className="px-4 py-2 rounded-lg bg-gold-strong text-white font-bold text-lg">
              ₹{priceRange}
            </span>
            <span className="text-sm font-semibold text-gray-600">₹5000</span>
          </div>
        </div>
      </div>

      {/* Removed Trending Artists section per design request */}
    </div>
  );
};

export default Filters;