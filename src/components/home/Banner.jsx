'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';

import { LuCirclePlus, LuSearch } from 'react-icons/lu';
import { FaUsers, FaHeartbeat, FaDonate } from 'react-icons/fa';

export default function Banner({ stats = {} }) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [particles, setParticles] = useState([]);

  // ── Authentication Logic ──
  useEffect(() => {
    const checkSession = async () => {
      const s = await authClient.getSession();
      const user = s?.data?.user || s?.user;
      setSession(s);
      setIsLoggedIn(!!user);
    };
    checkSession();
  }, []);

  // ── Dynamic Navigation Action ──
  const handleDonorJoin = () => {
    if (isLoggedIn) {
      const DASHBOARD_PATHS = {
        admin: '/dashboard',
        volunteer: '/dashboard',
        donor: '/dashboard/donor',
      };
      const role = session?.data?.user?.role || session?.user?.role;
      const path = DASHBOARD_PATHS[role?.toLowerCase()] || '/dashboard/donor';
      router.push(path);
    } else {
      router.push('/auth/register');
    }
  };

  // ── Hydration-Safe Particles ──
  useEffect(() => {
    const generated = [...Array(14)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 3,
    }));
    setParticles(generated);
  }, []);

  return (
    <section className="relative bg-[#C62828] text-white overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-black/10 rounded-full blur-3xl" />
      </div>

      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/15"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.1, 0.25, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            🩸 Saving lives made simple
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Donate Blood.
            <br />
            <span className="text-white/90">Save Lives Instantly.</span>
          </h1>

          <p className="mt-5 text-white/80 text-lg leading-relaxed max-w-md">
            Connect donors and patients in real-time. Find blood availability,
            request help, and respond within minutes.
          </p>


          {/* CTA Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleDonorJoin}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#C62828] font-semibold shadow-lg transition hover:scale-[1.03]"
            >
              <LuCirclePlus size={18} />
              Join as Donor
            </button>

            <Link
              href="/search"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white hover:text-[#C62828] transition font-medium"
            >
              <LuSearch size={18} />
              Search Donors
            </Link>
          </div>
        </motion.div>

        {/* Right Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-110" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <Image
                src="/blood-hero.png"
                alt="Blood Donation"
                width={420}
                height={420}
                priority
                className="drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}