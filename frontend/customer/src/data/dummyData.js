// trendingProducts.js
export const trendingProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "../src/assets/images/11119934_4669613.jpg",
    reducedPrice: 1999,
    originalPrice: 2999,
    shop: "Tech World",
    location: "Mumbai",
    description: "High-quality wireless headphones",
    available: true
  },
  {
    id: 2,
    name: "Smartwatch",
    image: "https://via.placeholder.com/150",
    reducedPrice: 3499,
    originalPrice: 4999,
    shop: "Fresh Mart",
    location: "Chennai",
    description: "Stylish smartwatch with features",
    available: false
  },
];
// categories.js
export const categories = [
  "Grocery",
  "Home&Appliance",
  "Fashion",
  "Mobile",
  "Food",
  "Technology",
];
// popularShops.js
export const popularShops = [
  {
    id: 1,
    name: "Artisan Bakery",
    banner: "https://via.placeholder.com/900x200.png?text=Artisan+Bakery+banner",
    logo: "https://via.placeholder.com/100.png?text=Logo",
    location: "Uptown",
    rating: 4.7,
    reviewCount: 98,
    tags: ["Pottery", "Ceramics", "Handcrafted"],
    shippingPolicy: "All orders are processed and shipped within 2-3 business days.",
    returnPolicy: "We accept returns within 14 days of delivery. Items must be unused and in the same condition.",
    damagedPolicy: "If you receive a damaged item, contact us with photos of the damage for a resolution."
  },
  {
    id: 2,
    name: "ElectroHub",
    category: "Electronics",
    description: "All the latest gadgets and electronics under one roof.",
    address: "456 Market Rd, TechTown",
    phone: "987-654-3210",
    hours: "10 AM - 8 PM",
    image: "https://via.placeholder.com/150x100.png?text=ElectroHub",
  },
];
// brandedShops.js (Optional if you still want logos for top-level display)
export const brandedShops = [
  {
    id: 1,
    name: "Walmart",
    image: "https://logo.clearbit.com/walmart.com",
  },
  {
    id: 2,
    name: "Target",
    image: "https://logo.clearbit.com/target.com",
  },
  {
    id: 3,
    name: "Costco",
    image: "https://logo.clearbit.com/costco.com",
  },
  {
    id: 4,
    name: "Walgreens",
    image: "https://logo.clearbit.com/walgreens.com",
  },
];
