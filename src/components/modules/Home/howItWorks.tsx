'use client'
import { useState } from 'react';
import { UserPlus, MapPin, Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: 'Create Your Profile',
      description: 'Sign up in minutes and tell us about your travel interests, preferences, and dream destinations.',
      details: [
        'Quick and easy registration',
        'Add your travel preferences',
        'Verify your identity',
        'Set your availability'
      ],
      color: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Create or Find a Trip',
      description: 'Browse existing trips or create your own travel plan. Share your itinerary and connect with potential buddies.',
      details: [
        'Browse hundreds of trips',
        'Create custom itineraries',
        'Set your budget & dates',
        'Share your travel style'
      ],
      color: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Connect & Travel',
      description: 'Match with compatible travelers, chat, plan together, and embark on unforgettable adventures.',
      details: [
        'Smart matching algorithm',
        'Real-time messaging',
        'Group planning tools',
        'Safe & verified community'
      ],
      color: 'from-amber-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop'
    }
  ];

  return (
    <div className="relative bg-linear-to-b from-white via-slate-50 to-white py-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#0C54A0]" />
            <span className="text-[#0C54A0] text-sm font-semibold">Simple & Easy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your journey in three simple steps and discover your perfect travel companion
          </p>
        </div>

        {/* Desktop View - Side by Side */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveStep(index)}
                className={`group relative transition-all duration-500 ${
                  activeStep === index ? 'scale-105' : 'scale-100 opacity-75'
                }`}
              >
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -left-4 z-10">
                    <div className={`w-16 h-16 bg-linear-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform`}>
                      <span className="text-white text-2xl font-bold">{index + 1}</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-linear-to-t ${step.color} opacity-20`}></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className={`w-14 h-14 bg-linear-to-br ${step.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                      {step.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-[#0C54A0]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View - Vertical */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Card */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 z-10">
                  <div className={`w-16 h-16 bg-linear-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-linear-to-t ${step.color} opacity-20`}></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className={`w-14 h-14 bg-linear-to-br ${step.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center rotate-90">
                    <ArrowRight className="w-5 h-5 text-[#0C54A0]" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-linear-to-r from-[#0C54A0] to-[#0d5fb8] rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Adventure?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who have found their perfect travel companions on SafarSathi
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group px-8 py-4 bg-white text-[#0C54A0] rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}