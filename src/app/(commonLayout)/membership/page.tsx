'use client'
import { useState } from 'react';
import { Check, Star, Crown, Sparkles, Gift, Plane, Zap, Users, Heart, Award, TrendingUp, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Explorer',
      icon: <Plane className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      price: { monthly: 499, yearly: 4990 },
      popular: false,
      features: [
        '5% discount on all bookings',
        'Priority customer support',
        'Exclusive travel guides',
        'Monthly newsletter',
        'Early access to deals',
        'Basic travel insurance',
        'Flexible booking options',
        'Member-only events access'
      ]
    },
    {
      name: 'Adventurer',
      icon: <Star className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      price: { monthly: 999, yearly: 9990 },
      popular: true,
      features: [
        '15% discount on all bookings',
        '24/7 premium support',
        'Complimentary travel guides',
        'Free airport lounge access (2x/year)',
        'Priority booking & upgrades',
        'Premium travel insurance',
        'Companion discount (10%)',
        'Quarterly gift vouchers',
        'VIP event invitations',
      ]
    },
    {
      name: 'Elite',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500',
      price: { monthly: 1999, yearly: 19990 },
      popular: false,
      features: [
        '25% discount on all bookings',
        'Unlimited travel guides',
        'Unlimited lounge access',
        'Guaranteed upgrades',
        'Family plan (up to 4 members)',
        'Monthly gift vouchers',
        'Private travel planning',
        'Annual free trip voucher',
        'Lifetime price guarantee'
      ]
    }
  ];

  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Travel Protection',
      description: 'Comprehensive insurance and 24/7 emergency support wherever you go'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Exclusive Rewards',
      description: 'Earn points on every booking and redeem for future adventures'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Savings',
      description: 'Get immediate discounts on bookings and access to flash sales'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Access',
      description: 'Join exclusive member events and connect with fellow travelers'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Personalized Service',
      description: 'Tailored recommendations based on your travel preferences'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'VIP Treatment',
      description: 'Priority booking, upgrades, and special perks at partner locations'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Adventurer Member',
      image: 'https://i.pinimg.com/736x/1d/bb/42/1dbb42c7c063737213a94e830c483fe6.jpg',
      content: 'The Adventurer plan has saved me so much money! The discounts and lounge access alone make it worth every penny.',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      role: 'Elite Member',
      image: 'https://i.pinimg.com/736x/33/d2/a7/33d2a732aa1d3195349ad518526c5f42.jpg',
      content: 'Elite membership transformed how I travel. The concierge service is exceptional and the perks are unmatched.',
      rating: 4
    },
    {
      name: 'Maria Garcia',
      role: 'Explorer Member',
      image: 'https://i.pinimg.com/736x/8a/57/38/8a5738f7968cc4091a38645166488abe.jpg',
      content: 'Perfect for occasional travelers like me. The exclusive guides and early access to deals are fantastic benefits.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-[#0C54A0] via-[#0d5fb8] to-[#0a4785] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-10 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold">
                Premium Travel Benefits
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Travel Membership
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Unlock exclusive benefits, save more, and travel better with
              SafarSathi Membership
            </p>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="flex justify-center">
          <div className="bg-white rounded-full shadow-lg p-2 inline-flex gap-2">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#0C54A0] text-white"
                  : "text-gray-600 hover:text-[#0C54A0]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-full font-semibold transition-all relative ${
                billingCycle === "yearly"
                  ? "bg-[#0C54A0] text-white"
                  : "text-gray-600 hover:text-[#0C54A0]"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                plan.popular ? "ring-4 ring-[#0C54A0] md:-mt-4 md:mb-4" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-linear-to-r from-[#0C54A0] to-cyan-500 text-white px-6 py-2 rounded-bl-2xl font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className={`bg-linear-to-r ${plan.color} p-8 text-white`}>
                <div className="flex items-center gap-3 mb-4">
                  {plan.icon}
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <div className="mb-2">
                  <span className="text-5xl font-bold">
                    ৳{plan.price[billingCycle].toLocaleString()}
                  </span>
                  <span className="text-lg ml-2">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-sm opacity-90">
                    ৳{Math.round(plan.price.yearly / 12).toLocaleString()}/month
                    billed annually
                  </p>
                )}
              </div>

              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-[#0C54A0] text-white hover:bg-[#094580]"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SafarSathi Membership?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every membership comes packed with benefits designed to enhance
              your travel experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-linear-to-br from-slate-50 to-blue-50 rounded-2xl p-8 hover:shadow-2xl transition-all"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#0C54A0] to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 text-[#0C54A0] group-hover:text-black group-hover:rotate-6 transition-colors shadow-lg">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-blue-50 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-linear-to-b from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied travelers who trust SafarSathi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I upgrade or downgrade my membership?",
                a: "Yes! You can change your membership tier at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.",
              },
              {
                q: "Is there a refund policy?",
                a: "We offer a 30-day money-back guarantee. If you're not satisfied with your membership, contact us within 30 days for a full refund.",
              },
              {
                q: "Can I share my membership benefits?",
                a: "Adventurer members get 10% companion discount, while Elite members can add up to 3 family members to their plan at no extra cost.",
              },
              {
                q: "How do I cancel my membership?",
                a: "You can cancel anytime from your account settings. Your benefits will remain active until the end of your billing period.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-linear-to-br from-slate-50 to-blue-50 rounded-xl p-6 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 list-none">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-[#0C54A0]">+</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-2 md:mx-8 px-4 sm:px-6 lg:px-8 rounded-4xl py-16 mb-20 bg-linear-to-br from-[#0C54A0] to-[#0a4785] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Elevate Your Travel?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join SafarSathi today and unlock a world of exclusive benefits
          </p>
          <button className="px-8 py-4 bg-white text-[#0C54A0] rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
            Start Your Membership
          </button>
        </div>
      </div>
    </div>
  );
}