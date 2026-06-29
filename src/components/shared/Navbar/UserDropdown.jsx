'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Avatar } from '@heroui/react';
import { FiChevronDown } from 'react-icons/fi';
import { MdAttachMoney, MdDashboard, MdLogout, MdPerson } from 'react-icons/md';

const DASHBOARD_PATHS = {
  admin: '/dashboard',
  volunteer: '/dashboard',
  donor: '/dashboard/donor',
};

export default function UserDropdown({ user, handleLogout, isLoggingOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dashboardPath =
    DASHBOARD_PATHS[user?.role?.toLowerCase()] || '/dashboard/donor';

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── BloodBond Premium Trigger ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-red-100 hover:border-red-300 hover:shadow-md hover:shadow-red-500/5 transition-all duration-300 bg-gradient-to-b from-white to-red-50/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar
          size="sm"
          className="cursor-pointer ring-1 ring-red-500/20 hover:ring-red-600 transition-all md:w-9! md:h-9!"
        >
          <Avatar.Image src={user?.image || user?.avatar} />
          <Avatar.Fallback className="bg-gradient-to-br from-red-500 to-red-700 text-white font-bold">
            {user?.name
              ? user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : '?'}
          </Avatar.Fallback>
        </Avatar>

        {/* <FiChevronDown
          size={15}
          className={`text-red-500/80 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : ''}`}
        /> */}
      </button>

      {/* ── BloodBond Unique Dropdown Panel ── */}
      <div
        className={`absolute right-0 top-full mt-3 w-56 bg-white border border-red-50/80 rounded-2xl shadow-xl shadow-red-950/5 z-50 overflow-hidden transition-all duration-300 origin-top-right backdrop-blur-xl ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {/* User profile header card */}
        <div className="px-4.5 py-4 border-b border-red-50/60 bg-gradient-to-br from-red-50/50 via-white to-white relative overflow-hidden">
          {/* Subtle design element matching a blood bond concept */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
          
          <p className="text-sm font-bold text-gray-800 truncate">
            {user?.name}
          </p>
          <p className="text-xs font-medium text-gray-400 mt-0.5 truncate">{user?.email}</p>
          
          {/* Unique theme role badge */}
          <span
            className={`inline-block mt-2 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md ${
              user?.role === 'admin'
                ? 'bg-purple-50 text-purple-600 border border-purple-100'
                : user?.role === 'volunteer'
                  ? 'bg-blue-50 text-blue-600 border border-blue-100'
                  : 'bg-red-50 text-red-600 border border-red-100'
            }`}
          >
            {user?.role || 'Donor'}
          </span>
        </div>

        {/* Menu Actions Group */}
        <div className="p-1.5 space-y-0.5">
          <Link
            href={dashboardPath}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50/60 hover:text-red-600 transition-all duration-200 group"
          >
            <div className="p-1 rounded-lg bg-gray-50 group-hover:bg-red-100/50 transition-colors">
              <MdDashboard className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
            </div>
            Dashboard
          </Link>

          <Link
            href="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50/60 hover:text-red-600 transition-all duration-200 group"
          >
            <div className="p-1 rounded-lg bg-gray-50 group-hover:bg-red-100/50 transition-colors">
              <MdPerson className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
            </div>
            My Profile
          </Link>

          <Link
            href="/funding"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50/60 hover:text-red-600 transition-all duration-200 group"
          >
            <div className="p-1 rounded-lg bg-gray-50 group-hover:bg-red-100/50 transition-colors">
              <MdAttachMoney className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
            </div>
            Funding
          </Link>

          {/* Divider */}
          <div className="my-1.5 border-t border-red-50/60 mx-2" />

          {/* Logout Action */}
          <button
            onClick={() => {
              if (!isLoggingOut) handleLogout();
            }}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-md hover:shadow-red-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="p-1 rounded-lg bg-red-50 group-hover:bg-red-700/30 transition-colors">
              <MdLogout className="w-4 h-4 shrink-0 text-red-600 group-hover:text-white" />
            </div>
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}