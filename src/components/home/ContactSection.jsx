// components/ContactUs.js
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
    
    setIsSubmitting(false);
  };

  return (
    <section className="bg-white py-20 px-6 overflow-hidden" id="contact">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#C62828] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Phone className="w-4 h-4" />
            LET&apos;S CONNECT
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tighter">
            <span className="text-[#C62828]">Contact</span> Us
          </h2>
          <p className="max-w-md mx-auto text-xl text-gray-600">
            Have any question in mind? Collaborate with us.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#C62828] transition-colors duration-300 text-lg"
                      placeholder="Alex Rivera"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#C62828] transition-colors duration-300 text-lg"
                      placeholder="alex@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#C62828] transition-colors duration-300 text-lg"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-[#C62828] transition-colors duration-300 text-lg resize-y min-h-[180px]"
                    placeholder="Type your message here..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white font-semibold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                      SENDING MESSAGE...
                    </div>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center py-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl font-medium"
                >
                  Thank you! We&apos;ll get back to you within 24 hours.
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24 space-y-8">
              {/* Phone Highlight */}
              <div className="bg-gradient-to-br from-[#C62828] to-red-800 text-white rounded-3xl p-10 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-red-200 text-sm tracking-widest uppercase">DIRECT LINE</p>
                    <p className="text-3xl font-semibold tracking-tight">+880 131 897 7454</p>
                  </div>
                </div>
                
                <p className="text-red-100/90 text-lg leading-relaxed">
                  Prefer talking? Call us anytime during business hours. Our team is ready to discuss your ideas.
                </p>
                
                <div className="mt-8 pt-8 border-t border-white/30 text-sm text-red-100/80">
                  Mon - Fri • 9am - 6pm EST
                </div>
              </div>

              {/* Other Contact Methods */}
              <div className="space-y-6">
                <motion.a 
                  href="mailto:hello@yourstudio.com"
                  whileHover={{ scale: 1.02 }}
                  className="group flex items-center gap-6 p-8 bg-white border border-gray-100 hover:border-[#C62828]/30 rounded-3xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#C62828]/10 text-[#C62828] rounded-2xl flex items-center justify-center group-hover:bg-[#C62828] group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="text-gray-600">contact@bloodbond.com</p>
                  </div>
                </motion.a>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="group flex items-center gap-6 p-8 bg-white border border-gray-100 hover:border-[#C62828]/30 rounded-3xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#C62828]/10 text-[#C62828] rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Visit Our Organization</p>
                    <p className="text-gray-600">Sector-4, Uttara, Dhaka-1230</p>
                  </div>
                </motion.div>
              </div>

            
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;