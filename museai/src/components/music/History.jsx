'use client';
import { useMusicStore } from "@/store/useMusicStore";

export default function History() {
  const history = useMusicStore((s) => s.history);

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg sm:text-xl">History</h2>
      {history.length === 0 ? (
        <p className="text-music-200/60 text-sm">No history yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li 
              key={item.id} 
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="truncate text-sm sm:text-base">{item.text}</span>
                <span className="text-xs text-music-200/60">
                  {new Date(item.ts).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
