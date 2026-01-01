'use client'
import Image from 'next/image';
import { Compass, Users, Shield, Award, Heart, Globe, TrendingUp, CheckCircle, Star } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '50K+', label: 'Happy Travelers' },
    { number: '200+', label: 'Destinations' },
    { number: '15K+', label: 'Tours Completed' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion for Travel',
      description: 'We believe travel enriches lives and creates unforgettable memories that last forever.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safety First',
      description: 'Your safety and security are our top priorities on every journey you take with us.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Focused',
      description: 'We put our travelers at the heart of everything we do, ensuring personalized experiences.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from booking to journey\'s end.'
    }
  ];

  const team = [
    {
      name: 'Arif Rahman',
      role: 'Founder & CEO',
      image: 'https://i.pinimg.com/1200x/ce/76/b2/ce76b20f89a9a46e372cb6d6b612eb90.jpg'
    },
    {
      name: 'Nadia Islam',
      role: 'Head of Operations',
      image: 'https://i.pinimg.com/736x/d6/bc/8d/d6bc8d404b8a79fbb3f6c2ad53fbc2dd.jpg'
    },
    {
      name: 'Kamal Hossain',
      role: 'Travel Director',
      image: 'https://i.pinimg.com/1200x/99/22/e2/9922e27f7cd524dff8eab26d9c874c1f.jpg'
    },
    {
      name: 'Shirin Ahmed',
      role: 'Customer Experience Lead',
      image: 'https://i.pinimg.com/736x/93/6c/28/936c28e75d957e19ab62b8206eb633cb.jpg'
    }
  ];

  const milestones = [
    { year: '2018', event: 'SafarSathi Founded', description: 'Started with a vision to revolutionize travel in Bangladesh' },
    { year: '2019', event: 'Expanded Services', description: 'Launched international tour packages' },
    { year: '2021', event: '10K Travelers', description: 'Reached milestone of 10,000 happy travelers' },
    { year: '2023', event: 'Award Winning', description: 'Received Best Travel Agency award' },
    { year: '2024', event: 'Mobile App Launch', description: 'Introduced mobile app for seamless booking' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-[#0C54A0] via-[#0d5fb8] to-[#0a4785] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full mb-6">
              <Compass className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About SafarSathi
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted companion for unforgettable journeys across Bangladesh and beyond
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl md:text-4xl font-bold text-[#0C54A0] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-24 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2018, SafarSathi began with a simple dream: to make travel accessible,
                  enjoyable, and memorable for everyone. What started as a small team of passionate
                  travel enthusiasts has grown into one of Bangladesh&apos;s most trusted travel partners.
                </p>
                <p>
                  We believe that travel is more than just visiting places—it&apos;s about creating
                  connections, experiencing new cultures, and building memories that last a lifetime.
                  Our name &quot;SafarSathi&quot; means &quot;travel companion,&quot; and that&apos;s exactly what we strive to be.
                </p>
                <p>
                  Today, we&apos;ve helped over 50,000 travelers explore beautiful destinations, and we&apos;re
                  just getting started. Every journey with us is crafted with care, attention to detail,
                  and a commitment to excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-r from-[#0C54A0] to-cyan-400 rounded-3xl blur-2xl opacity-20"></div>
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
                alt="Travel Adventure"
                width={800}
                height={600}
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-linear-to-br from-slate-50 to-blue-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#0C54A0] to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 text-[#0C54A0] group-hover:text-white transition-colors shadow-lg">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-blue-50 transition-colors">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-24 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones that shaped SafarSathi</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-[#0C54A0] to-cyan-400"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="text-[#0C54A0] font-bold text-2xl mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-[#0C54A0] rounded-full border-4 border-white shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind SafarSathi</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative bg-linear-to-b from-slate-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#0C54A0] font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-linear-to-br from-[#0C54A0] to-[#0a4785] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let us be your companion in creating unforgettable travel experiences.
            Your next adventure is just a click away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#0C54A0] rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
              Explore Destinations
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
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