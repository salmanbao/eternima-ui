import React, { useState } from 'react';
import { Edit, Star, MapPin, Calendar, Globe, Mail, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ahmed Khan',
    title: 'Digital Marketing Expert',
    location: 'Global',
    bio: 'Passionate digital marketer with 8+ years of experience helping businesses grow online. Specialized in social media marketing, content strategy, and paid advertising.',
    email: 'ahmed.khan@example.com',
    website: 'www.ahmedkhan.com',
    joinDate: 'January 2023'
  });

  const stats = [
    { label: 'Total Sales', value: '₨2,45,000' },
    { label: 'Products', value: '12' },
    { label: 'Rating', value: '4.8' },
    { label: 'Reviews', value: '127' }
  ];

  const products = [
    {
      id: 1,
      title: 'Complete Digital Marketing Masterclass',
      price: '₨4,999',
      rating: 4.8,
      sales: 1247,
      image: '/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png'
    },
    {
      id: 2,
      title: 'Social Media Marketing Bundle',
      price: '₨2,999',
      rating: 4.9,
      sales: 856,
      image: '/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png'
    },
    {
      id: 3,
      title: 'Content Strategy Toolkit',
      price: '₨1,999',
      rating: 4.7,
      sales: 543,
      image: '/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="section-container max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-elegant overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative -mt-16">
                <img
                  src="/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png"
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                    <p className="text-lg text-gray-600">{profileData.title}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profileData.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {profileData.joinDate}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="button-primary mt-4 md:mt-0"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-elegant p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-elegant p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{profileData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <a href={`https://${profileData.website}`} className="text-primary hover:underline">
                    {profileData.website}
                  </a>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-elegant p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-elegant p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Products</h3>
                <button className="button-primary">
                  Add New Product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {product.rating}
                        </span>
                        <span>{product.sales} sales</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">{product.price}</span>
                        <button className="text-primary hover:text-primary/80 font-medium">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Reviews */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Ali', rating: 5, comment: 'Excellent course! Learned so much about digital marketing.', product: 'Digital Marketing Masterclass', date: '2 days ago' },
                    { name: 'Hassan Ahmed', rating: 5, comment: 'Very practical and well-structured content.', product: 'Social Media Bundle', date: '1 week ago' },
                    { name: 'Fatima Khan', rating: 4, comment: 'Good content, would recommend to others.', product: 'Content Strategy Toolkit', date: '2 weeks ago' }
                  ].map((review, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{review.name}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">"{review.comment}"</p>
                      <div className="text-xs text-gray-500">
                        {review.product} • {review.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;