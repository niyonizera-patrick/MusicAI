'use client';
import { useMusicStore } from "@/store/useMusicStore";

export default function Library() {
  const library = useMusicStore((s) => s.library);

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg sm:text-xl">Library</h2>
      {library.length === 0 ? (
        <p className="text-music-200/60 text-sm">No tracks in library yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {library.map((item) => (
            <div 
              key={item.id} 
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue transition"
            >
              <h4 className="truncate font-medium text-sm sm:text-base">{item.title}</h4>
              <p className="text-xs sm:text-sm text-music-200/60">{item.meta}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
