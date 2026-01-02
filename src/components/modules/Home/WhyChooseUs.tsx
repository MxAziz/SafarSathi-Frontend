'use client'
import { useState } from 'react';
import { Shield, Zap, Users, Award, Heart, Globe, CheckCircle, Sparkles, Lock, MessageCircle, Calendar } from 'lucide-react';

export default function WhyChooseUsSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const mainFeatures = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Verified Community',
      description: 'Every member is verified for your safety and peace of mind',
      color: 'from-blue-500 to-cyan-500',
      details: ['ID Verification', 'Background Checks', 'User Reviews', 'Safety Guidelines']
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: 'Smart Matching',
      description: 'AI-powered algorithm finds your perfect travel companions',
      color: 'from-purple-500 to-pink-500',
      details: ['Interest Matching', 'Travel Style', 'Budget Compatibility', 'Personality Fit']
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: 'Community First',
      description: 'Join a supportive network of passionate travelers',
      color: 'from-rose-500 to-orange-500',
      details: ['24/7 Support', 'Travel Groups', 'Events & Meetups', 'Active Forums']
    }
  ];

  const additionalFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure Payment',
      description: 'Protected transactions with escrow system'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Instant Messaging',
      description: 'Connect and plan in real-time'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Flexible Planning',
      description: 'Easy scheduling and itinerary tools'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Network',
      description: 'Travel buddies worldwide'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Rewards Program',
      description: 'Earn points with every trip'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Group Management',
      description: 'Organize trips with ease'
    }
  ];

  const stats = [
    {
      number: '99.9%',
      label: 'Success Rate',
      sublabel: 'Verified matches',
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      number: '<24h',
      label: 'Response Time',
      sublabel: 'Average support response',
      icon: <Zap className="w-8 h-8" />
    },
    {
      number: '150+',
      label: 'Countries',
      sublabel: 'Global presence',
      icon: <Globe className="w-8 h-8" />
    },
    {
      number: '4.9★',
      label: 'User Rating',
      sublabel: 'Based on 10K+ reviews',
      icon: <Award className="w-8 h-8" />
    }
  ];

  return (
    <div className="relative bg-white py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linear-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #0C54A0 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100 px-4 py-2 linear-full mb-4">
            <Sparkles className="w-4 h-4 text-[#0C54A0]" />
            <span className="text-[#0C54A0] text-sm font-semibold">Your Trusted Travel Partner</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose SafarSathi?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our comprehensive platform designed for modern travelers
          </p>
        </div>

        {/* Main Features - 3 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="group relative"
            >
              {/* Glowing Background Effect */}
              <div className={`absolute inset-0 bg-linear-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

              {/* Card */}
              <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-500 h-full">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 bg-linear-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {feature.icon}
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Details List */}
                <div className="space-y-3">
                  {feature.details.map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className={`w-6 h-6 bg-linear-to-r ${feature.color} rounded-full flex items-center justify-center shrink-0`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative bg-linear-to-r from-[#0C54A0] to-[#0d5fb8] rounded-3xl p-12 mb-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
              >
                <div className="flex justify-center mb-3 text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-semibold mb-1">{stat.label}</div>
                <div className="text-blue-200 text-sm">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-linear-to-br from-slate-50 to-blue-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 text-[#0C54A0] group-hover:bg-[#0C54A0] group-hover:text-white transition-all shadow-md">
                {feature.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm">{feature.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="bg-linear-to-br from-slate-50 to-blue-50 rounded-3xl p-12 border-2 border-blue-100 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join SafarSathi today and discover why thousands of travelers trust us for their adventures
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group px-8 py-4 bg-[#0C54A0] hover:bg-[#094580] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                  <span>Start Your Journey</span>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-[#0C54A0] text-[#0C54A0] font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}