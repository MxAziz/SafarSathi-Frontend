// import { Award } from 'lucide-react';
// import Image from 'next/image';

// export default function SponsorsSection() {
//   const sponsors = [
//     {
//       name: 'Bangladesh Tourism',
//       logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
//       category: 'Government Partner'
//     },
//     {
//       name: 'Airbnb',
//       logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=80&fit=crop',
//       category: 'Hospitality'
//     },
//     {
//       name: 'Booking.com',
//       logo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=80&fit=crop',
//       category: 'Travel Partner'
//     },
//     {
//       name: 'Mastercard',
//       logo: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=200&h=80&fit=crop',
//       category: 'Payment Partner'
//     },
//     {
//       name: 'Turkish Airlines',
//       logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=80&fit=crop',
//       category: 'Aviation'
//     },
//     {
//       name: 'Visa',
//       logo: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=200&h=80&fit=crop',
//       category: 'Payment Partner'
//     }
//   ];

//   return (
//     <div className="relative bg-white py-16 overflow-hidden">
//       {/* Subtle Background */}
//       <div className="absolute inset-0 bg-linear-to-b from-slate-50/50 to-white"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full mb-3">
//             <Award className="w-3.5 h-3.5 text-gray-600" />
//             <span className="text-gray-600 text-xs font-medium tracking-wide uppercase">Trusted By</span>
//           </div>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             Our Partners & Sponsors
//           </h2>
//           <p className="text-gray-500 text-sm max-w-xl mx-auto">
//             Collaborating with industry leaders to bring you the best travel experience
//           </p>
//         </div>

//         {/* Sponsors Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
//           {sponsors.map((sponsor, index) => (
//             <div
//               key={index}
//               className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#0C54A0] hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center"
//             >
//               {/* Logo Container */}
//               <div className="relative w-full h-16 mb-3 flex items-center justify-center overflow-hidden rounded-lg">
//                 <Image
//                   src={sponsor.logo}
//                   alt={sponsor.name}
//                   width={100}
//                   height={40}
//                   className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
//                 />
//               </div>

//               {/* Sponsor Name */}
//               <div className="text-center">
//                 <h3 className="text-sm font-semibold text-gray-900 mb-1">{sponsor.name}</h3>
//                 <p className="text-xs text-gray-500">{sponsor.category}</p>
//               </div>

//               {/* Hover Border Effect */}
//               <div className="absolute inset-0 border-2 border-[#0C54A0] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
//             </div>
//           ))}
//         </div>

//         {/* Divider Line */}
//         <div className="flex items-center justify-center my-8">
//           <div className="flex-1 border-t border-gray-200"></div>
//           <span className="px-4 text-xs text-gray-400 font-medium">AND MANY MORE</span>
//           <div className="flex-1 border-t border-gray-200"></div>
//         </div>

//         {/* Stats Row */}
//         <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
//           <div className="text-center">
//             <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
//             <div className="text-xs text-gray-500 uppercase tracking-wide">Partners</div>
//           </div>
//           <div className="text-center border-x border-gray-200">
//             <div className="text-3xl font-bold text-gray-900 mb-1">100+</div>
//             <div className="text-xs text-gray-500 uppercase tracking-wide">Collaborations</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-gray-900 mb-1">20+</div>
//             <div className="text-xs text-gray-500 uppercase tracking-wide">Countries</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'
import { useState } from 'react';
import { Award, Sparkles, TrendingUp, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SponsorsSection() {
  const [, setHoveredIndex] = useState<number | null>(null);

  const sponsors = [
    {
      name: 'Bangladesh Tourism',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
      category: 'Government Partner',
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Airbnb',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=80&fit=crop',
      category: 'Hospitality',
      color: 'from-pink-400 to-rose-500'
    },
    {
      name: 'Booking.com',
      logo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=80&fit=crop',
      category: 'Travel Partner',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      name: 'Mastercard',
      logo: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=200&h=80&fit=crop',
      category: 'Payment Partner',
      color: 'from-orange-400 to-red-500'
    },
    {
      name: 'Turkish Airlines',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=80&fit=crop',
      category: 'Aviation',
      color: 'from-red-400 to-pink-500'
    },
    {
      name: 'Visa',
      logo: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=200&h=80&fit=crop',
      category: 'Payment Partner',
      color: 'from-blue-400 to-purple-500'
    }
  ];

  const achievements = [
    { icon: <Award className="w-6 h-6" />, number: '50+', label: 'Global Partners', color: 'from-blue-500 to-cyan-500' },
    { icon: <TrendingUp className="w-6 h-6" />, number: '100+', label: 'Active Collaborations', color: 'from-purple-500 to-pink-500' },
    { icon: <Globe className="w-6 h-6" />, number: '20+', label: 'Countries Covered', color: 'from-orange-500 to-red-500' },
    { icon: <Sparkles className="w-6 h-6" />, number: '5 Years', label: 'Partnership Success', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="relative bg-linear-to-b from-slate-50 via-blue-50 to-white py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-linear-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div
          className="absolute bottom-10 left-10 w-96 h-96 bg-linear-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0C54A0] to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0C54A0] to-transparent opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-200 px-5 py-2 rounded-full mb-6 shadow-sm">
            <Award className="w-5 h-5 text-[#0C54A0]" />
            <span className="text-[#0C54A0] text-sm font-semibold tracking-wide">
              Trusted Partnerships
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Partners & Sponsors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Working with world-class brands to deliver exceptional travel
            experiences
          </p>
        </div>

        {/* Sponsors Grid with Enhanced Design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-linear-to-r ${sponsor.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              ></div>

              {/* Card */}
              <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                {/* Decorative Corner */}
                <div className="absolute top-3 right-3 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`w-full h-full bg-linear-to-br ${sponsor.color} rounded-full`}
                  ></div>
                </div>

                {/* Logo Container */}
                <div className="relative mb-4">
                  <div className="w-full h-20 flex items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-slate-50 to-blue-50 p-3">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={100}
                      height={40}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                    />
                  </div>

                  {/* Icon Badge */}
                  <div
                    className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-linear-to-r ${sponsor.color} rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500`}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Sponsor Info */}
                <div className="text-center pt-2">
                  <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#0C54A0] group-hover:to-cyan-600 transition-all duration-300">
                    {sponsor.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {sponsor.category}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-3xl overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r ${sponsor.color} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-linear-to-r from-blue-50 to-cyan-50 px-6 py-2 text-sm font-semibold text-gray-500 rounded-full border-2 border-gray-200">
              Partnership Achievements
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Icon */}
              <div
                className={`relative w-14 h-14 bg-linear-to-br ${achievement.color} rounded-xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                <div className="text-white">{achievement.icon}</div>
              </div>

              {/* Content */}
              <div className="relative">
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-gray-900 group-hover:to-[#0C54A0] transition-all duration-300">
                  {achievement.number}
                </div>
                <div className="text-sm text-gray-600 font-medium leading-tight">
                  {achievement.label}
                </div>
              </div>

              {/* Decorative Corner */}
              <div
                className={`absolute bottom-0 right-0 w-16 h-16 bg-linear-to-tl ${achievement.color} opacity-0 group-hover:opacity-10 rounded-tl-full transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-linear-to-r from-[#0C54A0] to-[#0d5fb8] rounded-2xl p-px shadow-xl">
            <div className="bg-white rounded-2xl px-8 py-4 hover:bg-transparent transition-all duration-300 group cursor-pointer">
              <Link href="/contact">
                <button className="text-[#0C54A0] group-hover:text-white font-semibold transition-colors duration-300">
                  Interested in Partnership? Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}