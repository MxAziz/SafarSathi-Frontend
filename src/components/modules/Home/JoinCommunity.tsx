import { Star, Award, Users, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function JoinCommunitySection() {


  return (
    <div className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-orange-600" />
            <span className="text-orange-600 text-sm font-semibold">Meet Our Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join The Global Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to find your perfect travel buddy? Join thousands of explorers who share costs, plan itineraries, and create safe, unforgettable memories.
          </p>
        </div>

        {/* Bottom Stats */}
        <div className="bg-linear-to-r from-[#0C54A0] to-[#0d5fb8] rounded-3xl p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, white 35px, white 36px)',
            }}></div>
          </div>

          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Join Our Elite Community
              </h3>
              <p className="text-blue-100 text-lg">
                Become a top-rated traveler and inspire others on their journeys
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: <Award className="w-6 h-6" />, label: 'Earn Badges', value: '20+' },
                { icon: <Star className="w-6 h-6" />, label: 'Get Reviewed', value: '100+' },
                { icon: <Users className="w-6 h-6" />, label: 'Build Network', value: '1000+' },
                { icon: <ShieldCheck className="w-6 h-6" />, label: 'Verified Status', value: '100%' }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
                  <div className="flex justify-center mb-3 text-white">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-blue-200 text-sm">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/register">
                <button className="px-8 py-4 bg-white text-[#0C54A0] rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  Join Our Community
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}