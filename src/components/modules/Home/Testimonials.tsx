/* eslint-disable react-hooks/purity */
'use client'
import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar, Heart, Users } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      age: 28,
      profession: 'Software Engineer',
      location: 'Dhaka',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      rating: 5,
      trip: 'Cox\'s Bazar Beach Trip',
      tripDate: 'December 2023',
      buddyCount: 3,
      quote: 'Found the perfect travel companions through SafarSathi! Our Cox\'s Bazar trip was absolutely magical. We became lifelong friends and are already planning our next adventure together.',
      highlight: 'Made 3 lifelong friends',
      tripImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Rafiq Khan',
      age: 35,
      profession: 'Photographer',
      location: 'Chittagong',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 5,
      trip: 'Sajek Valley Adventure',
      tripDate: 'November 2023',
      buddyCount: 4,
      quote: 'As a solo traveler, I was hesitant at first. But SafarSathi\'s verification system made me feel safe. Met amazing people who shared my passion for photography. The experience exceeded all expectations!',
      highlight: 'Captured 500+ stunning photos',
      tripImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Priya Das',
      age: 26,
      profession: 'Teacher',
      location: 'Sylhet',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      rating: 5,
      trip: 'Sundarbans Exploration',
      tripDate: 'January 2024',
      buddyCount: 5,
      quote: 'The matching algorithm is brilliant! Connected with travelers who had similar interests and travel styles. Our Sundarbans trip was well-organized and incredibly fun. Highly recommend SafarSathi!',
      highlight: 'Saw Royal Bengal Tigers',
      tripImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Kamal Hossain',
      age: 32,
      profession: 'Business Owner',
      location: 'Dhaka',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      rating: 5,
      trip: 'Bandarban Hill Trek',
      tripDate: 'October 2023',
      buddyCount: 6,
      quote: 'Best decision ever! Not only did I explore the beautiful hills of Bandarban, but I also made genuine connections. The group planning tools made coordination seamless. Can\'t wait for our reunion trip!',
      highlight: 'Summited 3 peaks together',
      tripImage: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop'
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <div className="relative bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-full mb-4">
            <Heart className="w-4 h-4 text-pink-300" />
            <span className="text-white text-sm font-semibold">Real Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Travelers Love Stories
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Hear from our community about their unforgettable journeys and connections
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Trip Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={currentTestimonial.tripImage}
                  alt={currentTestimonial.trip}
                  fill
                  className="w-full h-96 object-cover transform transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                {/* Trip Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold">{currentTestimonial.trip}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-200 text-sm">
                      <Calendar className="w-4 h-4" />
                      {currentTestimonial.tripDate}
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full">
                      <Users className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        {currentTestimonial.buddyCount} Travelers
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight Badge */}
                <div className="absolute top-6 left-6 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ {currentTestimonial.highlight}
                </div>
              </div>
            </div>

            {/* Right Side - Testimonial Content */}
            <div className="order-1 lg:order-2">
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                {/* Quote Icon */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-linear-to-br from-[#0C54A0] to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                  <Quote className="w-10 h-10 text-white" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                  &quot;{currentTestimonial.quote}&quot;
                </blockquote>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{currentTestimonial.name}</h4>
                    <p className="text-blue-200 text-sm">{currentTestimonial.profession}, {currentTestimonial.age}</p>
                    <p className="text-blue-300 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {currentTestimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-20 w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-20 w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 ${
                index === activeIndex ? 'scale-110' : 'scale-90 opacity-50'
              }`}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={64}
                height={64}
                className={`w-16 h-16 rounded-full object-cover border-4 transition-all ${
                  index === activeIndex
                    ? 'border-[#0C54A0] shadow-lg shadow-blue-500/50'
                    : 'border-white/30'
                }`}
              />
              {index === activeIndex && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0C54A0] rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>



      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
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