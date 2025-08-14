'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSearch, IoMenu } from 'react-icons/io5';

export default function Topbar({ onMenuClick }) {
  const [q, setQ] = useState('');

  const go = () => {
    if (!q.trim()) return;
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-10 bg-white/5 backdrop-blur-sm border-b border-white/10 p-3 sm:p-4 flex items-center gap-3"
    >
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-white/10"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <IoMenu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search YouTube tutorials e.g. 'Hallelujah guitar lesson'"
          className="w-full rounded-full pl-9 pr-32 py-2.5 sm:py-3 bg-white/10 placeholder:text-music-200/70 outline-none focus:ring-2 focus:ring-music-500"
        />
        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80" />
        <button
          onClick={go}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-music-500 hover:brightness-110 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-black font-semibold"
        >
          Search
        </button>
      </div>

      <button className="hidden sm:inline-flex items-center px-3 py-2 rounded-lg bg-gradient-to-r from-music-500 to-neon-blue text-black font-semibold">
        New Session
      </button>
    </motion.div>
  );
}