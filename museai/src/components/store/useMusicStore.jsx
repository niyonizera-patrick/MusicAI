'use client';
import { create } from 'zustand';

export  const useMusicStore = create((set, get) => ({
  library: [
    { id: '1', title: 'Chill Piano Loop', meta: 'Piano • 16 bars' },
  ],
  history: [
    { id: 'h1', text: 'Pop chorus in G — 120 BPM', ts: Date.now() - 86400000*2 },
  ],
  addToLibrary: (item) => set({ library: [item, ...get().library] }),
  addToHistory: (text) => set({ history: [{ id: crypto.randomUUID(), text, ts: Date.now() }, ...get().history] }),
}));
