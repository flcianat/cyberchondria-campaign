"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Pin, Star, Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---

interface Reflection {
  id: string;
  message: string;
  color: string;
  sticker: string;
  createdAt: string;
}

const COLORS = [
  { id: "yellow", value: "bg-yellow-100", label: "Yellow" },
  { id: "pink", value: "bg-pink-100", label: "Pink" },
  { id: "blue", value: "bg-blue-100", label: "Blue" },
  { id: "green", value: "bg-green-100", label: "Green" },
  { id: "purple", value: "bg-purple-100", label: "Purple" },
];

const STICKERS = [
  {
    id: "tape",
    label: "Tape",
    icon: (
      <div className="w-8 h-3 bg-white/40 border border-white/50 shadow-sm rotate-2" />
    ),
  },
  {
    id: "pin",
    label: "Pin",
    icon: <Pin className="w-6 h-6 text-red-500 fill-red-500 drop-shadow-md" />,
  },
  {
    id: "star",
    label: "Star",
    icon: (
      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-md" />
    ),
  },
  {
    id: "heart",
    label: "Heart",
    icon: (
      <Heart className="w-6 h-6 text-pink-500 fill-pink-500 drop-shadow-md" />
    ),
  },
  {
    id: "bandaid",
    label: "Band-aid",
    icon: (
      <div className="w-8 h-3 bg-orange-200 rounded-full border border-orange-300 shadow-sm rotate-[-5deg] flex items-center justify-center">
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    ),
  },
];

// --- Components ---

const StickerDisplay = ({ type }: { type: string }) => {
  switch (type) {
    case "tape":
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/30 backdrop-blur-[1px] shadow-sm rotate-1 border border-white/20 z-10" />
      );
    case "pin":
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
          <Pin className="w-6 h-6 text-red-600 fill-red-600" />
        </div>
      );
    case "star":
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
        </div>
      );
    case "heart":
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
        </div>
      );
    case "bandaid":
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 drop-shadow-md rotate-[-3deg]">
          <div className="w-10 h-4 bg-[#eecfa1] rounded-full border border-[#d4b483] flex items-center justify-center shadow-sm">
            <div className="w-3 h-3 bg-[#f5deb3] rounded-full opacity-50"></div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function ReflectionWall() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [selectedSticker, setSelectedSticker] = useState(STICKERS[0].id);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    try {
      const res = await fetch("/api/reflections");
      const data = await res.json();
      if (Array.isArray(data)) {
        setReflections(data);
      }
    } catch (error) {
      console.error("Failed to fetch reflections", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          color: selectedColor,
          sticker: selectedSticker,
        }),
      });

      if (res.ok) {
        const newReflection = await res.json();
        setReflections([newReflection, ...reflections]);
        setIsAdding(false);
        setMessage("");
        setSelectedColor(COLORS[0].value);
        setSelectedSticker(STICKERS[0].id);
      }
    } catch (error) {
      console.error("Failed to post reflection", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-[#f8f9fa] border-t-2 border-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full border border-black bg-white mb-4 font-mono text-sm uppercase tracking-wider">
            Community Reflection Wall
          </div>
          <h2 className="font-serif text-4xl md:text-6xl mb-6">
            “You’re Not the Only One”
          </h2>
          <p className="font-sans text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Setelah memahami polamu, lihat pengalaman orang lain. <br />
            Di era digital, banyak dari kita mengalami hal yang sama.
          </p>

          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            Tambahkan pengalamanmu secara anonim
          </button>
        </div>

        {/* --- The Wall --- */}
        <div className="min-h-[400px] p-8 bg-[#f0f0f0] rounded-3xl border-2 border-black/10 shadow-inner relative">
          {/* Corkboard texture feel */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] rounded-3xl pointer-events-none"></div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              <AnimatePresence>
                {reflections.map((reflection, index) => (
                  <motion.div
                    key={reflection.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={cn(
                      "break-inside-avoid relative p-6 pt-10 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-start text-left transition-transform hover:-translate-y-1 mb-6",
                      reflection.color,
                    )}
                  >
                    {/* The Sticker */}
                    <StickerDisplay type={reflection.sticker} />

                    <p className="font-serif text-lg text-slate-900 leading-relaxed break-words w-full mb-4">
                      &quot;{reflection.message}&quot;
                    </p>
                    <div className="w-full flex justify-end mt-auto">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider opacity-60">
                        {new Date(reflection.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* --- Add Note Modal --- */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-black"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-serif text-xl font-bold">
                  Tulis Pengalamanmu
                </h3>
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Message Input */}
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700">
                    Pesan (Anonim)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ceritakan pengalamanmu..."
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-black focus:ring-0 transition-colors min-h-[120px] resize-none bg-slate-50 font-sans"
                    maxLength={200}
                    required
                  />
                  <div className="text-right text-xs text-slate-400 mt-1">
                    {message.length}/200
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-bold mb-3 text-slate-700">
                    Pilih Warna Kertas
                  </label>
                  <div className="flex gap-3 justify-center">
                    {COLORS.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColor(color.value)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                          color.value,
                          selectedColor === color.value
                            ? "border-black scale-110 shadow-md"
                            : "border-transparent",
                        )}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Sticker Selection */}
                <div>
                  <label className="block text-sm font-bold mb-3 text-slate-700">
                    Pilih Sticker
                  </label>
                  <div className="flex gap-4 justify-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {STICKERS.map((sticker) => (
                      <button
                        key={sticker.id}
                        type="button"
                        onClick={() => setSelectedSticker(sticker.id)}
                        className={cn(
                          "p-2 rounded-lg border-2 transition-all hover:bg-white",
                          selectedSticker === sticker.id
                            ? "border-black bg-white shadow-sm"
                            : "border-transparent opacity-60 hover:opacity-100",
                        )}
                        title={sticker.label}
                      >
                        {sticker.icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting || !message.trim()}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Tempel di Dinding"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
