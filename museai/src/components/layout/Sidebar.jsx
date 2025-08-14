'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LuMusic4 } from 'react-icons/lu';
import { BsMusicNoteList, BsPersonCircle, BsX } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';

const items = [
  { name: 'Compose', href: '/compose', icon: LuMusic4 },
  { name: 'Library', href: '/library', icon: BsMusicNoteList },
  { name: 'History', href: '/history', icon: IoDocumentTextOutline },
];

export default function Sidebar({ variant = 'desktop', onClose }) {
  const pathname = usePathname();
  const Wrapper = variant === 'mobile' ? motion.div : 'div';

  return (
    <Wrapper
      initial={variant === 'mobile' ? { x: -16, opacity: 0 } : undefined}
      animate={variant === 'mobile' ? { x: 0, opacity: 1 } : undefined}
      className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] border-r border-white/10 p-4 backdrop-blur-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-music-500 to-neon-blue grid place-items-center text-black font-bold">MA</div>
          <div className="hidden sm:block">
            <h3 className="font-poppins font-semibold leading-tight">MuseAI</h3>
            <p className="text-[11px] text-music-200/80">Compose • Learn • Jam</p>
          </div>
        </div>
        {variant === 'mobile' && (
          <button aria-label="Close" onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-white/10">
            <BsX size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="mt-4 space-y-2">
        {items.map(({ name, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} onClick={onClose}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={[
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition',
                  active
                    ? 'bg-gradient-to-r from-music-600/80 to-music-500/60 text-white shadow-lg'
                    : 'text-music-100 hover:bg-white/10',
                ].join(' ')}
              >
                <Icon size={18} />
                <span className="truncate">{name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Tip card */}
      <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10">
        <p className="text-xs mb-1">Tip</p>
        <p className="text-sm text-music-200/80">Drag a song file or type a prompt to get chords for any instrument.</p>
      </div>

      {/* Profile */}
      <div className="mt-6 flex items-center gap-2 p-2">
        <BsPersonCircle size={28} />
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">You</div>
          <div className="text-xs text-music-200/70 truncate">Beginner • 3 sessions</div>
        </div>
      </div>
    </Wrapper>
  );
}