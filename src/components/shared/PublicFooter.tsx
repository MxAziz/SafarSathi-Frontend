// import Link from 'next/link';

// function PublicFooter() {
//   return (
//     <footer className="border-t bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="font-bold mb-2">Safar Sathi</h3>
//             <p className="text-sm text-muted-foreground">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates vitae architecto sed reprehenderit fugit adipisci corrupti! Sequi magnam quasi accusamus sint voluptatem provident iste rerum.</p>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-2">Quick Links</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link href="#" className="text-muted-foreground hover:text-foreground">Home</Link></li>
//               <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
//               <li><Link href="#" className="text-muted-foreground hover:text-foreground">Services</Link></li>
//               <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-2">Support</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
//               <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
//               <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
//               <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-2">Contact Us</h3>
//             <p className="text-sm text-muted-foreground">
//               123 Medical Lane<br />
//               Tech City, HC 12345<br />
//               contact@safarsathi.com
//             </p>
//           </div>
//         </div>
//         <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
//           &copy; {new Date().getFullYear()} SafarSathi. All Rights Reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }
// export default PublicFooter;


// import React from 'react';
// import Link from 'next/link';
// import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send, Plane } from 'lucide-react';

// const PublicFooter: React.FC = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

//         {/* Top Section with Logo and CTA */}
//         <div className="mb-16 text-center">
//           <div className="inline-flex items-center gap-3 mb-4 group cursor-pointer">
//             <div className="relative">
//               <Plane className="w-10 h-10 text-pink-400 transform group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" />
//               <div className="absolute inset-0 bg-pink-400/30 blur-xl group-hover:blur-2xl transition-all"></div>
//             </div>
//             <h3 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
//               SafarSathi
//             </h3>
//           </div>
//           <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
//             Embark on unforgettable journeys with your trusted travel companion
//           </p>
//         </div>

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">

//           {/* Company Info */}
//           <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 group">
//             <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
//               About Us
//             </h4>
//             <p className="text-indigo-200 text-sm leading-relaxed mb-6">
//               Creating magical travel experiences since 2024. Your adventure starts here with premium services and unforgettable memories.
//             </p>
//             <div className="flex gap-3">
//               {[
//                 { icon: Facebook, color: 'from-blue-400 to-blue-600' },
//                 { icon: Twitter, color: 'from-sky-400 to-blue-500' },
//                 { icon: Instagram, color: 'from-pink-400 to-purple-500' },
//                 { icon: Youtube, color: 'from-red-400 to-pink-500' }
//               ].map((social, idx) => (
//                 <Link
//                   key={idx}
//                   href="#"
//                   className="relative w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:scale-110 hover:rotate-12 transition-all duration-300 group/icon overflow-hidden"
//                 >
//                   <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300`}></div>
//                   <social.icon className="w-5 h-5 relative z-10" />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
//             <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
//               Quick Links
//             </h4>
//             <ul className="space-y-3">
//               {['Home', 'Tour Packages', 'Hotels', 'Flights', 'Visa Services', 'About Us', 'Contact'].map((item, idx) => (
//                 <li key={idx}>
//                   <Link
//                     href="#"
//                     className="group/link flex items-center text-indigo-200 hover:text-white text-sm transition-all duration-200"
//                   >
//                     <span className="w-0 group-hover/link:w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 mr-0 group-hover/link:mr-2"></span>
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Destinations */}
//           <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20">
//             <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
//               Top Destinations
//             </h4>
//             <ul className="space-y-3">
//               {[
//                 { name: "Cox's Bazar", tag: "Beach Paradise" },
//                 { name: "Sundarbans", tag: "Wildlife" },
//                 { name: "Saint Martin", tag: "Island" },
//                 { name: "Sylhet", tag: "Tea Gardens" },
//                 { name: "Bandarban", tag: "Hills" },
//                 { name: "Rangamati", tag: "Lakes" }
//               ].map((dest, idx) => (
//                 <li key={idx}>
//                   <Link
//                     href="#"
//                     className="group/dest flex items-center justify-between text-indigo-200 hover:text-white text-sm transition-all duration-200"
//                   >
//                     <span>{dest.name}</span>
//                     <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 group-hover/dest:bg-gradient-to-r group-hover/dest:from-indigo-500 group-hover/dest:to-cyan-500 transition-all duration-300">
//                       {dest.tag}
//                     </span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
//             <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
//               Stay Connected
//             </h4>

//             <div className="space-y-4 mb-6">
//               <div className="flex items-center gap-3 text-indigo-200 text-sm group/contact">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center group-hover/contact:scale-110 transition-transform">
//                   <MapPin className="w-5 h-5" />
//                 </div>
//                 <span>Dhaka, Bangladesh</span>
//               </div>
//               <div className="flex items-center gap-3 text-indigo-200 text-sm group/contact">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center group-hover/contact:scale-110 transition-transform">
//                   <Phone className="w-5 h-5" />
//                 </div>
//                 <span>+880 1XXX-XXXXXX</span>
//               </div>
//               <div className="flex items-center gap-3 text-indigo-200 text-sm group/contact">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center group-hover/contact:scale-110 transition-transform">
//                   <Mail className="w-5 h-5" />
//                 </div>
//                 <span>hello@safarsathi.com</span>
//               </div>
//             </div>

//             <form className="space-y-3">
//               <div className="relative">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all text-sm"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 flex items-center justify-center gap-2 group/btn"
//               >
//                 <span>Subscribe Now</span>
//                 <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-8 border-t border-white/10">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-indigo-300 text-sm">
//               © {currentYear} <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">SafarSathi</span>. Crafted with ❤️ for travelers
//             </p>
//             <div className="flex gap-6">
//               <Link href="#" className="text-indigo-300 hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">
//                 Privacy Policy
//               </Link>
//               <Link href="#" className="text-indigo-300 hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">
//                 Terms of Service
//               </Link>
//               <Link href="#" className="text-indigo-300 hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">
//                 Cookie Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default PublicFooter;


"use client";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="w-full bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold text-white">SafarSathi</h2>
          <p className="text-sm mt-3 text-gray-400">
            Travel Buddy & Meetup Platform — journey, community এবং local experience connect করার জন্য।
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/plans" className="hover:text-white">Find Plans</a></li>
            <li><a href="/meetup" className="hover:text-white">Meetup & Buddy</a></li>
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="/blog" className="hover:text-white">Travel Blog</a></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail size={16}/> support@safarsathi.com</li>
            <li className="flex items-center gap-2"><Phone size={16}/> +880 1700-000000</li>
            <li className="flex items-center gap-2"><MapPin size={16}/> Dhaka, Bangladesh</li>
          </ul>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:text-white"><Facebook size={18}/></a>
            <a href="#" className="hover:text-white"><Instagram size={18}/></a>
            <a href="#" className="hover:text-white"><Twitter size={18}/></a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} SafarSathi — All Rights Reserved.
      </div>
    </footer>
  );
}
