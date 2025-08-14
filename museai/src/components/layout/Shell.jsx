'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Shell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // lock body scroll when mobile drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1300px] px-2 sm:px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <Sidebar variant="desktop" />
          </aside>

          {/* Main content card */}
          <section className="rounded-2xl bg-white/5 shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <div className="p-3 sm:p-4 md:p-6">{children}</div>
          </section>
        </div>
      </div>

      {/* Mobile drawer sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-[300px] lg:hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            >
              <Sidebar variant="mobile" onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )}