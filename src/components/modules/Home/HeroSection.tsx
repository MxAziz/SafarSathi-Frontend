'use client'
import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    travelers: '1'
  });

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop',
      title: 'Find Your Perfect Travel Companion',
      subtitle: 'Connect with like-minded travelers and explore the world together'
    },
    {
      image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&h=1080&fit=crop',
      title: 'Adventure Awaits You',
      subtitle: 'Join thousands of travelers making unforgettable memories'
    },
    {
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop',
      title: 'Travel Smarter, Together',
      subtitle: 'Share experiences, split costs, and create lasting friendships'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSearch = () => {
    console.log('Search:', searchData);
  };

  const stats = [
    { number: '50K+', label: 'Active Travelers' },
    { number: '200+', label: 'Destinations' },
    { number: '15K+', label: 'Successful Trips' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0C54A0] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-sm font-semibold">
              Join 50,000+ Happy Travelers
            </span>
          </div>

          {/* Title with Animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            {heroSlides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 animate-slide-up animation-delay-200">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto mb-8 animate-slide-up animation-delay-400">
            <div className="bg-white rounded-2xl shadow-2xl p-2">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                {/* Destination Input */}
                <div className="md:col-span-5 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C54A0] text-gray-900"
                  />
                </div>

                {/* Date Input */}
                <div className="md:col-span-3 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C54A0] text-gray-900"
                  />
                </div>

                {/* Travelers Input */}
                <div className="md:col-span-2 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <select
                    value={searchData.travelers}
                    onChange={(e) => setSearchData({ ...searchData, travelers: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C54A0] text-gray-900 appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <div className="md:col-span-2">
                  <button
                    onClick={handleSearch}
                    className="w-full h-full bg-[#0C54A0] hover:bg-[#094580] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Search className="w-5 h-5" />
                    <span className="hidden md:inline">Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-white/80 text-sm">Popular:</span>
              {['Cox\'s Bazar', 'Sajek Valley', 'Sundarbans', 'Sylhet'].map((place) => (
                <button
                  key={place}
                  onClick={() => setSearchData({ ...searchData, destination: place })}
                  className="px-3 py-1 bg-white/10 backdrop-blur-lg border border-white/20 text-white text-sm rounded-full hover:bg-white/20 transition-all"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-600">
            <Link href="/travel-plans">
            <button className="group px-8 py-4 bg-[#0C54A0] hover:bg-[#094580] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 cursor-pointer">
              Find Travel Buddies
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            <Link href="/explore-travelers">
            <button className="px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all cursor-pointer">
              Explore Travelers
            </button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-1.5 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-white w-16'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}