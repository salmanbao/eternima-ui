import React from 'react';
import { BarChart3, DollarSign, Users, TrendingUp, Package, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const StatCard = ({ title, value, icon: Icon, change }: { 
  title: string; 
  value: string; 
  icon: React.ComponentType<any>; 
  change: string; 
}) => (
  <div className="bg-white p-6 rounded-xl shadow-elegant hover:shadow-elegant-hover transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-primary">{change}</p>
      </div>
      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="section-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value="₨2,45,000"
            icon={DollarSign}
            change="+12% from last month"
          />
          <StatCard
            title="Active Customers"
            value="1,247"
            icon={Users}
            change="+5% from last month"
          />
          <StatCard
            title="Products Sold"
            value="856"
            icon={Package}
            change="+18% from last month"
          />
          <StatCard
            title="Average Rating"
            value="4.8"
            icon={Star}
            change="+0.2 from last month"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-elegant">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "New sale", description: "Digital Marketing Course sold", time: "2 hours ago" },
                { action: "Review received", description: "5-star review on Graphic Design Bundle", time: "4 hours ago" },
                { action: "Product updated", description: "Updated pricing for Web Development Course", time: "6 hours ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-xl shadow-elegant">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
            <div className="space-y-4">
              {[
                { name: "Complete Digital Marketing Course", sales: 125, revenue: "₨62,500" },
                { name: "Graphic Design Bundle", sales: 89, revenue: "₨44,500" },
                { name: "Web Development Bootcamp", sales: 67, revenue: "₨33,500" },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <p className="font-semibold text-primary">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;