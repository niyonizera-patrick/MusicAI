'use client';
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useMusicStore } from "../store/useMusicStore";

export default function Composer() {
  const [prompt, setPrompt] = useState("");
  const [instrument, setInstrument] = useState("Piano");
  const [dragActive, setDragActive] = useState(false);
  const addToHistory = useMusicStore((s) => s.addToHistory);
  const addToLibrary = useMusicStore((s) => s.addToLibrary);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setPrompt(`Analyze chords for file: ${file.name}`);
  }, []);

  const generate = async () => {
    const text = prompt.trim() || `Generate chords for ${instrument}`;
    if (!text) return;
    addToHistory(text);

    // call the (stub) API
    const res = await fetch("/api/generate", { method: "POST", body: JSON.stringify({ text, instrument }) });
    const data = await res.json();

    addToLibrary({ id: crypto.randomUUID(), title: data.title, meta: `${instrument} • ${data.bars} bars` });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={[
          "p-4 rounded-xl border transition",
          dragActive ? "border-neon-blue bg-white/10" : "border-white/10 bg-white/5"
        ].join(" ")}
      >
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Type your prompt (e.g. "Jazzy piano in C minor, 4/4, mellow tempo") or drop a song file here`}
          className="w-full bg-transparent outline-none resize-none placeholder:text-music-200/60"
        />
        <div className="mt-3 flex items-center gap-3">
          <select value={instrument} onChange={(e) => setInstrument(e.target.value)} className="bg-white/10 rounded-lg px-3 py-2">
            {["Piano","Guitar","Violin","Synth"].map(x => <option key={x} value={x}>Instrument: {x}</option>)}
          </select>
          <button onClick={generate} className="ml-auto px-4 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-music-500 text-black font-semibold">
            Generate
          </button>
        </div>
        <p className="text-xs text-music-200/60 mt-2">Pro tip: “pop chorus, key G, 120 BPM”</p>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h4 className="font-semibold mb-2">Generated</h4>
        <div className="min-h-[140px] grid place-items-center text-music-200/60">Your AI chords / sheet / MIDI preview appears here.</div>
      </div>
    </motion.div>
  );
}
