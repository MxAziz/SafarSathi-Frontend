import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Heart,
  Plane
} from 'lucide-react';

export default function PublicFooter() {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Travel Tips', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ];

  const services = [
    { name: 'Find Travel Buddies', href: '/find-buddies' },
    { name: 'Post Trip', href: '/post-trip' },
    { name: 'Premium Membership', href: '/premium' },
    { name: 'Safety Guidelines', href: '/safety' },
    { name: 'Community', href: '/community' },
  ];

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-linear-to-br from-slate-50 via-white to-slate-50 border-t border-slate-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* logo */}
            <div className='flex gap-1 justify-start items-center'>
            <Plane className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold"><span className="text-primary ">Safar</span>Sathi</h1>
            </div>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed max-w-sm">
              Connect with fellow travelers, share experiences, and explore the world together.
              SafarSathi makes travel more meaningful and memorable.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-100 hover:bg-[#0C54A0] text-slate-600 hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-[#0C54A0] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#0C54A0] transition-all duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-[#0C54A0] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#0C54A0] transition-all duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-[#0C54A0] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#0C54A0] transition-all duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Selector */}
            <div className="mt-6">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-[#0C54A0] hover:text-[#0C54A0] transition-colors">
                <Globe className="w-4 h-4" />
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 text-center md:text-left">
              © {new Date().getFullYear()} SafarSathi. All rights reserved.
            </p>

            <div className="flex items-center gap-1 text-sm text-slate-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>in Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
