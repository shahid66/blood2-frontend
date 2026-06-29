import Banner from '@/components/home/Banner';
import BecomeHeroSection from '@/components/home/BecomeHeroSection';
import ContactSection from '@/components/home/ContactSection';
import FeaturedSection from '@/components/home/FeaturedSection';
import { getUserSession } from '@/lib/core/session';
import { getMarqueeData } from '@/lib/marquee';
import { ToastContainer } from 'react-toastify';

async function getStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stats`, {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    if (data.success) return data;
  } catch {}
  // fallback
  return { totalDonors: 0, totalRequests: 0, totalFunding: 0 };
}

export default async function Home() {
  const [items, stats, user] = await Promise.all([
    getMarqueeData(),
    getStats(),
    getUserSession(),
  ]);
  return (
    <>
      <Banner stats={stats} />

      <FeaturedSection/>

      <ContactSection/>
    </>
  );
}
