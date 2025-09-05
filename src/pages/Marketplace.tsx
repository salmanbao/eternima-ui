import React, { useState } from 'react';
import { Search, Filter, Star, Heart, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ProductCard = ({ product }: { product: any }) => (
  <div className="bg-white rounded-xl shadow-elegant hover:shadow-elegant-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className="relative">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
        <Heart className="w-4 h-4 text-gray-600" />
      </button>
    </div>
    
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="pakistan-chip text-xs">{product.category}</span>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img 
            src={product.creator.avatar} 
            alt={product.creator.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{product.creator.name}</span>
        </div>
        <span className="text-sm text-gray-500">{product.sales} sales</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">₨{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₨{product.originalPrice}</span>
          )}
        </div>
        <button className="button-primary px-4 py-2 text-sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'digital-marketing', name: 'Digital Marketing' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'graphic-design', name: 'Graphic Design' },
    { id: 'business', name: 'Business' },
    { id: 'photography', name: 'Photography' },
  ];

  const products = [
    {
      id: 1,
      title: "Complete Digital Marketing Masterclass 2024",
      description: "Learn digital marketing from basics to advanced with real-world projects and case studies.",
      price: "4,999",
      originalPrice: "9,999",
      rating: 4.8,
      category: "Digital Marketing",
      sales: 1247,
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      creator: {
        name: "Ahmed Khan",
        avatar: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png"
      }
    },
    {
      id: 2,
      title: "Modern Web Development Bootcamp",
      description: "Full-stack web development course covering React, Node.js, and modern development practices.",
      price: "7,999",
      originalPrice: "12,999",
      rating: 4.9,
      category: "Web Development", 
      sales: 856,
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      creator: {
        name: "Sara Malik",
        avatar: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png"
      }
    },
    {
      id: 3,
      title: "Professional Graphic Design Bundle",
      description: "Complete graphic design course with Adobe Creative Suite and portfolio development.",
      price: "3,499",
      rating: 4.7,
      category: "Graphic Design",
      sales: 2341,
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      creator: {
        name: "Ali Hassan",
        avatar: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png"
      }
    },
    // Add more products as needed
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase().replace(' ', '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="section-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover amazing digital products from Pakistani creators</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pakistan-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-pakistan-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-pakistan-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="button-primary">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;