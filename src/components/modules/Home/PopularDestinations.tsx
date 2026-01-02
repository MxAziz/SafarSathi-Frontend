'use client'
import { useState } from 'react';
import { MapPin, Users, Star, TrendingUp, Heart, ArrowRight, Compass } from 'lucide-react';
import Image from 'next/image';

export default function PopularDestinationsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedDestinations, setLikedDestinations] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: 'All Destinations', icon: <Compass className="w-4 h-4" /> },
    { id: 'beach', label: 'Beach', icon: '🏖️' },
    { id: 'mountain', label: 'Mountain', icon: '⛰️' },
    { id: 'forest', label: 'Forest', icon: '🌲' },
    { id: 'city', label: 'City', icon: '🏙️' }
  ];

  const destinations = [
    {
      id: 1,
      name: "Cox's Bazar",
      location: 'Chittagong Division',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      travelers: 2847,
      rating: 4.8,
      trips: 156,
      description: 'World\'s longest natural sea beach with stunning sunsets',
      trending: true
    },
    {
      id: 2,
      name: 'Sajek Valley',
      location: 'Rangamati',
      category: 'mountain',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      travelers: 1923,
      rating: 4.9,
      trips: 98,
      description: 'Queen of hills with breathtaking cloud views',
      trending: true
    },
    {
      id: 3,
      name: 'Sundarbans',
      location: 'Khulna Division',
      category: 'forest',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
      travelers: 1456,
      rating: 4.7,
      trips: 67,
      description: 'World\'s largest mangrove forest and UNESCO site',
      trending: false
    },
    {
      id: 4,
      name: 'Sylhet Tea Gardens',
      location: 'Sylhet Division',
      category: 'forest',
      image: 'https://cosmosgroup.sgp1.digitaloceanspaces.com/news/9782559_best%20tea%20gardens%20Bangladesh.jpg',
      travelers: 2156,
      rating: 4.6,
      trips: 134,
      description: 'Lush green tea estates and serene landscapes',
      trending: false
    },
    {
      id: 5,
      name: 'Dhaka',
      location: 'Dhaka Division',
      category: 'city',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
      travelers: 3421,
      rating: 4.5,
      trips: 289,
      description: 'Vibrant capital with rich history and culture',
      trending: true
    },
    {
      id: 6,
      name: 'Bandarban',
      location: 'Chittagong Division',
      category: 'mountain',
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop',
      travelers: 1789,
      rating: 4.9,
      trips: 112,
      description: 'Hills, waterfalls, and tribal culture',
      trending: false
    }
  ];

  const filteredDestinations = activeCategory === 'all'
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  const toggleLike = (id: number) => {
    setLikedDestinations(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative bg-linear-to-b from-white via-blue-50 to-white py-20 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-40 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-[#0C54A0]" />
            <span className="text-[#0C54A0] text-sm font-semibold">Top Picks</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing places where travelers are connecting and creating memories
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-[#0C54A0] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {typeof category.icon === 'string' ? (
                <span className="text-lg">{category.icon}</span>
              ) : (
                category.icon
              )}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                    fill
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Trending Badge */}
                {destination.trending && (
                  <div className="absolute top-4 left-4 bg-linear-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(destination.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      likedDestinations.includes(destination.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-white'
                    }`}
                  />
                </button>

                {/* Location Tag */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-lg px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">{destination.location}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#0C54A0] transition-colors">
                  {destination.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#0C54A0]" />
                      <span className="text-sm text-gray-600 font-medium">
                        {destination.travelers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600 font-medium">
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {destination.trips} active trips
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-linear-to-r from-[#0C54A0] to-[#0d5fb8] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                  <span>Explore Trips</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-[#0C54A0] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="group px-8 py-4 bg-white border-2 border-[#0C54A0] text-[#0C54A0] rounded-xl font-semibold hover:bg-[#0C54A0] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto">
            View All Destinations
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Fun Stats Section */}
        <div className="mt-20 bg-linear-to-r from-[#0C54A0] to-[#0d5fb8] rounded-3xl p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">200+</div>
              <div className="text-blue-100">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">15K+</div>
              <div className="text-blue-100">Active Trips</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-100">Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">Happy Rate</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}