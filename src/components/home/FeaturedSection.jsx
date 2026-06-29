// components/Featured.js
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const FeaturedSection = () => {
  const featuredStories = [
    {
      id: 1,
      title: "A Mother's Gift",
      description: "Sarah donated blood that helped save her premature newborn's life. Today, little Emma is thriving.",
      image: "https://images.unsplash.com/photo-1584516150908-4f1d6b9c3c3f?w=800&h=600&fit=crop",
      donor: "Sarah Chen",
      impact: "Saved 3 lives",
      date: "2 weeks ago"
    },
    {
      id: 2,
      title: "Community Hero Drive",
      description: "Local tech company organized a massive blood drive. 187 units collected in a single day.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop",
      donor: "TechCorp + 187 donors",
      impact: "187 units collected",
      date: "1 month ago"
    },
    {
      id: 3,
      title: "Emergency Response",
      description: "Our rapid response team supplied blood during the recent highway accident. Every second counted.",
      image: "https://images.unsplash.com/photo-1584036561566-baf0d8b0c1f3?w=800&h=600&fit=crop",
      donor: "Rapid Response Team",
      impact: "12 critical patients",
      date: "3 days ago"
    }
  ];

  return (
    <section className="bg-white py-20 px-6" id="featured">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#C62828] px-5 py-2 rounded-full text-sm font-semibold mb-4 tracking-wider">
            <Heart className="w-5 h-5" />
            REAL IMPACT
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tighter">
            Lives Changed <span className="text-[#C62828]">Today</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Every donation tells a story. Here are some of the incredible moments made possible by generous donors like you.
          </p>
        </motion.div>

        {/* Featured Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Impact Badge */}
                <div className="absolute top-6 right-6 bg-white text-[#C62828] text-xs font-bold px-4 py-2 rounded-2xl flex items-center gap-1 shadow-md">
                  <Award className="w-4 h-4" />
                  {story.impact}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  {story.date}
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-[#C62828] transition-colors">
                  {story.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {story.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-100 text-[#C62828] rounded-2xl flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{story.donor}</p>
                    </div>
                  </div>
                  
                  <motion.a
                    href="#donate"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-[#C62828] hover:text-red-700 font-medium text-sm group-hover:gap-3 transition-all"
                  >
                    Read Story
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-red-50 rounded-3xl p-10 md:p-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="text-6xl font-bold text-[#C62828] mb-2">1248</div>
              <div className="text-gray-600">Units Donated This Month</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-[#C62828] mb-2">87</div>
              <div className="text-gray-600">Lives Saved</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-[#C62828] mb-2">42</div>
              <div className="text-gray-600">Upcoming Drives</div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-12 bg-[#C62828] hover:bg-[#B71C1C] text-white px-12 py-4 rounded-2xl font-semibold text-lg inline-flex items-center gap-3 transition-colors"
          >
            BECOME A HERO TODAY
            <Heart className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;