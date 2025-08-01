import React, { useState, useMemo } from "react";
import { Heart, Star, ShoppingCart, Filter, X, Truck, Tag } from 'lucide-react';

// Main App component
export default function App() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("featured");
  const [activeCategory, setActiveCategory] = useState("muesli");
  const [likedProducts, setLikedProducts] = useState({});
  const [filters, setFilters] = useState({
    discounted: false,
    organic: false,
    vegan: false,
    glutenFree: false,
  });

  const categories = useMemo(() => [
    { name: "Crazy Deals", icon: "✨", id: "deals" },
    { name: "Muesli & Granola", icon: "🥣", id: "muesli" },
    { name: "Oats", icon: "🌾", id: "oats" },
    { name: "Kids Cereals", icon: "🧒", id: "kids" },
    { name: "Flakes", icon: "🌽", id: "flakes" },
    { name: "Newly Added", icon: "🆕", id: "new" },
    { name: "Energy Bars", icon: "🍫", id: "bars" },
    { name: "Ready Mixes", icon: "🍲", id: "mixes" },
    { name: "Pancake Mixes", icon: "🥞", id: "pancakes" },
  ], []);

  const allProducts = useMemo(() => [
    {
      id: 1,
      title: "Kellogg's Chocolate Muesli 57% Multigrain, Fruit, Nut & Seeds",
      category: "muesli",
      weight: "450g",
      price: 399,
      discount: 25,
      originalPrice: 532,
      rating: 4.5,
      reviews: 142,
      image: "https://placehold.co/150x150/FFDDC1/262626?text=Muesli",
      tags: [],
    },
    {
      id: 2,
      title: "Kellogg's Muesli Fruit, Nut & Seeds, 12-in-1",
      category: "muesli",
      weight: "750g",
      price: 516,
      discount: 27,
      originalPrice: 707,
      rating: 4.2,
      reviews: 89,
      image: "https://placehold.co/150x150/CCE5FF/262626?text=Muesli",
      tags: [],
    },
    {
      id: 3,
      title: "Yogabar Muesli Dark Chocolate & Cranberry",
      category: "muesli",
      weight: "400g",
      price: 449,
      discount: 15,
      originalPrice: 528,
      rating: 4.8,
      reviews: 204,
      image: "https://placehold.co/150x150/D4EDDA/262626?text=Muesli",
      tags: ["handpicked"],
    },
    {
      id: 4,
      title: "Bagrry's Crunchy Muesli Fruit & Nut With Cranberries",
      category: "muesli",
      weight: "375g",
      price: 265,
      discount: 18,
      originalPrice: 323,
      rating: 4.0,
      reviews: 67,
      image: "https://placehold.co/150x150/FFF3CD/262626?text=Muesli",
      tags: [],
    },
    {
      id: 5,
      title: "Nature's Path Organic Pumpkin Seed Granola",
      category: "muesli",
      weight: "500g",
      price: 475,
      discount: 10,
      originalPrice: 528,
      rating: 4.6,
      reviews: 121,
      image: "https://placehold.co/150x150/E2D9FF/262626?text=Granola",
      tags: ["newArrival", "organic"],
    },
    {
      id: 6,
      title: "Quaker Oats & Honey Granola",
      category: "oats",
      weight: "480g",
      price: 320,
      originalPrice: 320,
      rating: 4.3,
      reviews: 98,
      image: "https://placehold.co/150x150/C1F0C1/262626?text=Granola",
      tags: ["bestseller"],
    },
    {
      id: 7,
      title: "Saffola Oats & Almond Granola",
      category: "oats",
      weight: "400g",
      price: 299,
      discount: 20,
      originalPrice: 374,
      rating: 3.9,
      reviews: 56,
      image: "https://placehold.co/150x150/FFCCEE/262626?text=Granola",
      tags: [],
    },
    {
      id: 8,
      title: "Post Honey Bunches of Oats with Almonds",
      category: "flakes",
      weight: "510g",
      price: 425,
      discount: 15,
      originalPrice: 500,
      rating: 4.7,
      reviews: 187,
      image: "https://placehold.co/150x150/D1ECF1/262626?text=Oats",
      tags: ["limited"],
    },
    {
      id: 9,
      title: "Dabur Oats for Healthy Breakfast",
      category: "oats",
      weight: "1000g",
      price: 199,
      discount: 10,
      originalPrice: 220,
      rating: 4.1,
      reviews: 300,
      image: "https://placehold.co/150x150/FFDDCC/262626?text=Oats",
      tags: [],
    },
    {
      id: 10,
      title: "NutriChoice Kids Cereal - Choco Delite",
      category: "kids",
      weight: "300g",
      price: 250,
      originalPrice: 250,
      rating: 4.6,
      reviews: 75,
      image: "https://placehold.co/150x150/CCFFDD/262626?text=Kids",
      tags: [],
    },
    {
      id: 11,
      title: "Corn Flakes Original by CerealKing",
      category: "flakes",
      weight: "500g",
      price: 180,
      discount: 5,
      originalPrice: 190,
      rating: 3.8,
      reviews: 110,
      image: "https://placehold.co/150x150/DDCCFF/262626?text=Flakes",
      tags: [],
    },
    {
      id: 12,
      title: "Newly Added Super Berry Mix Muesli",
      category: "new",
      weight: "400g",
      price: 550,
      originalPrice: 550,
      rating: 4.9,
      reviews: 50,
      image: "https://placehold.co/150x150/FFEECC/262626?text=New",
      tags: ["newArrival"],
    },
    {
      id: 13,
      title: "Health Bars with Chocolate and Nuts",
      category: "bars",
      weight: "180g",
      price: 280,
      originalPrice: 300,
      discount: 7,
      rating: 4.4,
      reviews: 45,
      image: "https://placehold.co/150x150/FFECB2/262626?text=Bars",
      tags: [],
    },
    {
      id: 14,
      title: "Quick Oat Mix for Breakfast",
      category: "mixes",
      weight: "350g",
      price: 220,
      originalPrice: 250,
      discount: 12,
      rating: 4.1,
      reviews: 60,
      image: "https://placehold.co/150x150/D1E8F6/262626?text=Mixes",
      tags: [],
    },
    {
      id: 15,
      title: "Gluten-Free Pancake Mix",
      category: "pancakes",
      weight: "250g",
      price: 350,
      originalPrice: 350,
      rating: 4.7,
      reviews: 90,
      image: "https://placehold.co/150x150/E5E5E5/262626?text=Pancakes",
      tags: ["glutenFree"],
    },
  ], []);

  const handleFilterChange = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  const ProductCard = ({ product }) => {
    const isLiked = likedProducts[product.id] || false;
    const discountPercentage = product.discount ? Math.round(product.discount) : null;
    const isNew = product.tags.includes("newArrival");
    const isBestseller = product.tags.includes("bestseller");

    const toggleLike = () => {
      setLikedProducts((prev) => ({
        ...prev,
        [product.id]: !prev[product.id],
      }));
    };

    return (
      <div className="relative flex flex-col group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative p-4 flex-grow flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/150x150/EEEEEE/000000?text=Image+Error";
            }}
          />
          {discountPercentage && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}% OFF
            </div>
          )}
          <button
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${isLiked ? 'text-red-500 bg-red-100' : 'text-gray-500 bg-white hover:bg-gray-100'}`}
            onClick={toggleLike}
            aria-label={isLiked ? "Unlike product" : "Like product"}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Truck size={16} className="text-green-500" />
              <span>In Stock</span>
            </div>
            <span>{product.weight}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 leading-tight min-h-[4rem] flex-grow">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                stroke="currentColor"
              />
            ))}
            <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          <button className="flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform duration-200 transform hover:scale-105">
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    );
  };

  const displayedProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
  
    let filtered = allProducts.filter((product) => {
      // Category filter
      let categoryMatch = false;
      if (activeCategory === "deals") {
        categoryMatch = product.discount && product.discount > 0;
      } else if (activeCategory === "new") {
        categoryMatch = product.tags.includes("newArrival");
      } else {
        categoryMatch = product.category === activeCategory;
      }
  
      // Dietary filters
      let dietaryMatch = true;
      if (filters.discounted && !(product.discount > 0)) {
        dietaryMatch = false;
      }
      if (filters.organic && !product.tags.includes("organic")) {
        dietaryMatch = false;
      }
      if (filters.vegan && !product.tags.includes("vegan")) {
        dietaryMatch = false;
      }
      if (filters.glutenFree && !product.tags.includes("glutenFree")) {
        dietaryMatch = false;
      }
  
      return categoryMatch && dietaryMatch;
    });
  
    if (filtered.length === 0) {
      return [];
    }
  
    return [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.tags.includes("newArrival") ? 1 : 0) - (a.tags.includes("newArrival") ? 1 : 0);
        case "featured":
        default:
          return a.id - b.id;
      }
    });
  }, [allProducts, activeCategory, selectedSort, filters]);

  const handleCloseMobileFilters = () => setMobileFiltersOpen(false);
  const handleShowMobileFilters = () => setMobileFiltersOpen(true);
  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    if (mobileFiltersOpen) {
      handleCloseMobileFilters();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased">
      <div className="sticky top-0 z-50 bg-white shadow-sm py-3 mb-6">
        <div className="container mx-auto px-4 flex justify-between items-center lg:hidden">
          <h1 className="text-xl font-bold text-gray-800">Cereals Haven</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-full shadow-lg transition-transform duration-200 transform hover:scale-105"
            onClick={handleShowMobileFilters}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
        <div className="hidden lg:block container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 space-x-3 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`flex-shrink-0 text-center px-4 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  activeCategory === cat.id
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <span className="text-lg mr-2">{cat.icon}</span>
                <span className="text-sm font-semibold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters Offcanvas (Modal) */}
      <div
        className={`fixed inset-0 z-[100] transform transition-transform duration-300 ease-in-out ${
          mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50" onClick={handleCloseMobileFilters}></div>
        <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-lg p-6 flex flex-col">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-bold">Filters & Sort</h2>
            <button onClick={handleCloseMobileFilters} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="overflow-y-auto flex-grow space-y-6">
            <div className="space-y-3">
              <h6 className="text-xs font-bold text-gray-500 uppercase">Categories</h6>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full border transition-colors duration-200 ${
                      activeCategory === cat.id
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h6 className="text-xs font-bold text-gray-500 uppercase">Sort By</h6>
              <select
                className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-green-500 focus:border-green-500"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <h6 className="text-xs font-bold text-gray-500 uppercase">Dietary Filters</h6>
              {Object.keys(filters).map((key) => (
                <label key={key} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={() => handleFilterChange(key)}
                    className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t">
            <button
              className="w-full py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700"
              onClick={handleCloseMobileFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-md p-6 space-y-6">
              <div className="space-y-3">
                <h6 className="text-xs font-bold text-gray-500 uppercase">Categories</h6>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        activeCategory === cat.id
                          ? "bg-green-600 text-white shadow"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="font-semibold">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <h6 className="text-xs font-bold text-gray-500 uppercase">Sort By</h6>
                <select
                  className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <h6 className="text-xs font-bold text-gray-500 uppercase">Dietary Filters</h6>
                {Object.keys(filters).map((key) => (
                  <label key={key} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={() => handleFilterChange(key)}
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid Section */}
          <div className="lg:col-span-3 xl:col-span-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  <span className="text-green-600">
                    {categories.find((cat) => cat.id === activeCategory)?.name || "All Products"}
                  </span>
                </h2>
                <p className="text-sm text-gray-500">
                  Showing 1-{Math.min(displayedProducts.length, 12)} of {displayedProducts.length} products
                </p>
              </div>
              <div className="hidden lg:block w-56">
                <select
                  className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found for this category or filters.</p>
              </div>
            )}
            
            <div className="flex justify-center mt-12">
              <nav aria-label="Page navigation">
                <ul className="flex items-center space-x-2">
                  <li>
                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-green-50 hover:border-green-500 transition-colors">
                      &laquo;
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white shadow-md">
                      1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-green-50 hover:border-green-500 transition-colors">
                      2
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-green-50 hover:border-green-500 transition-colors">
                      3
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-green-50 hover:border-green-500 transition-colors">
                      &raquo;
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
