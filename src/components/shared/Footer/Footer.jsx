// components/Footer.js
'use client';

import Link from "next/link";
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#C62828] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand & Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-11 h-11 bg-[#C62828] rounded-2xl flex items-center justify-center"
              >
                <Heart className="w-7 h-7 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold tracking-tight">BloodBond</h2>
            </div>

            <p className="text-gray-200 text-lg max-w-md">
              Connecting generous donors with those in need. 
              Every drop counts. Every life matters.
            </p>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +880 1700-18219568
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                conatct@bloodbond.org
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="font-semibold text-lg mb-6 text-white">Quick Links</h3>
            <div className="flex flex-col gap-3 text-gray-200">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="font-semibold text-lg mb-6 text-white">Resources</h3>
            <div className="flex flex-col gap-3 text-gray-200">
              <Link href="/eligibility" className="hover:text-white transition-colors">Donor Eligibility</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQs</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blood Donation Blog</Link>
              <Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h3 className="font-semibold text-lg mb-6 text-white">Get In Touch</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-200 mt-0.5" />
                <div className="text-gray-200 text-sm">
                  123 Donor Avenue,<br />
                  Dhaka, Bangladesh
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-200 mb-4">Follow Our Mission</p>
              <div className="flex gap-5 text-2xl">
                <motion.a 
                  href="https://www.facebook.com" 
                  whileHover={{ scale: 1.3, color: "#fff" }}
                  className="hover:text-white transition-colors"
                >
                  <FaFacebook/>
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com" 
                  whileHover={{ scale: 1.3, color: "#fff" }}
                  className="hover:text-white transition-colors"
                >
                  <FaInstagram/>
                </motion.a>
                <motion.a 
                  href="https://www.youtube.com" 
                  whileHover={{ scale: 1.3, color: "#fff" }}
                  className="hover:text-white transition-colors"
                >
                  <FaYoutube/>
                </motion.a>
                <motion.a 
                  href="https://www.x.com" 
                  whileHover={{ scale: 1.3, color: "#fff" }}
                  className="hover:text-white transition-colors"
                >
                  <FaXTwitter />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-gray-300 py-8"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <div>
            © 2026 BloodBond. All Rights Reserved.
          </div>
          <div className="text-gray-200 font-medium flex items-center gap-1">
            Made for humanity
          </div>
        </div>
      </motion.div>
    </footer>
  );
}