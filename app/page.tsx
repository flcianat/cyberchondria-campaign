"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toPng } from "html-to-image";
import {
  Download,
  Share2,
  RefreshCw,
  Search,
  AlertCircle,
  Activity,
  Brain,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ReflectionWall from "@/components/ReflectionWall";

// --- Types ---

type PersonaType = "A" | "B" | "C" | "D";

interface PersonaData {
  id: PersonaType;
  title: string;
  quote: string;
  description: string;
  advice: string;
  color: string;
  icon: React.ReactNode;
}

const PERSONAS: Record<PersonaType, PersonaData> = {
  A: {
    id: "A",
    title: "The Over-Researcher",
    quote: "Aku buka 5–6 tab sekaligus sebelum merasa yakin.",
    description:
      "More tabs don’t always mean more clarity. Sometimes they mean more anxiety.",
    advice: "Pause. Breathe. Recheck.",
    color: "bg-yellow-200",
    icon: <Search className="w-8 h-8" />,
  },
  B: {
    id: "B",
    title: "The Worst-Case Thinker",
    quote: "Aku langsung klik artikel yang menyebut kemungkinan paling serius.",
    description: "You don’t search for information. You search for certainty.",
    advice: "Think Before You Panic.",
    color: "bg-red-200",
    icon: <AlertCircle className="w-8 h-8" />,
  },
  C: {
    id: "C",
    title: "The Silent Worrier",
    quote: "Aku tidak bilang siapa-siapa, tapi aku terus mencari dalam diam.",
    description: "Silence amplifies the fear. Sharing it might shrink it.",
    advice: "Speak up. You are not alone.",
    color: "bg-blue-200",
    icon: <Brain className="w-8 h-8" />,
  },
  D: {
    id: "D",
    title: "The Calm Scanner",
    quote: "Aku cari informasi secukupnya, lalu berhenti.",
    description: "You have a healthy relationship with information.",
    advice: "Keep your balance.",
    color: "bg-green-200",
    icon: <Activity className="w-8 h-8" />,
  },
};

// --- Components ---

const Sticker = ({
  children,
  className,
  rotation = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}) => (
  <div
    className={cn(
      "absolute flex items-center justify-center shadow-lg border-2 border-black bg-white p-2 rounded-lg z-10",
      className,
    )}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {children}
  </div>
);

const SectionHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={cn(
      "font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight",
      className,
    )}
  >
    {children}
  </h2>
);

const Card = ({
  children,
  className,
  color = "bg-white",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) => (
  <div
    className={cn(
      "border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
      color,
      className,
    )}
  >
    {children}
  </div>
);

export default function LandingPage() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(
    null,
  );
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 2,
        });
        const link = document.createElement("a");
        link.download = `my-search-persona-${selectedPersona}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to download image", err);
      }
    }
  };

  // const handleShare = async () => {
  //   if (selectedPersona && navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: "My Search Persona",
  //         text: `I am ${PERSONAS[selectedPersona].title}. ${PERSONAS[selectedPersona].description} #DigitalHealthAware #ThinkBeforeYouPanic`,
  //         url: window.location.href,
  //       });
  //     } catch (err) {
  //       console.log("Error sharing", err);
  //     }
  //   } else {
  //     // Fallback to copy text
  //     const text = `I am ${PERSONAS[selectedPersona!].title}. #DigitalHealthAware`;
  //     navigator.clipboard.writeText(text);
  //     alert("Caption copied to clipboard!");
  //   }
  // };

  return (
    <main className="min-h-screen bg-[#fdfbf7] bg-grid-pattern text-slate-900 overflow-x-hidden selection:bg-pink-300">
      {/* --- Navigation (Simple) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center bg-[#fdfbf7]/80 backdrop-blur-sm border-b border-black/5">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-black fill-pink-300" />
          <span className="font-serif font-bold text-xl tracking-tight">
            Cyberchondria.
          </span>
        </div>
        <button
          onClick={() =>
            document
              .getElementById("persona-quiz")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-[#ccf381] border-2 border-black px-6 py-2 rounded-full font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all"
        >
          Check Persona
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col items-center justify-center text-center">
        {/* Decorative Elements */}
        <Sticker
          className="hidden md:flex top-32 left-10 bg-pink-200"
          rotation={-5}
        >
          <span className="font-mono font-bold text-sm">Sakit Kepala?</span>
        </Sticker>
        <Sticker
          className="hidden md:flex top-40 right-20 bg-blue-200"
          rotation={10}
        >
          <span className="font-mono font-bold text-sm">Tumor Otak??</span>
        </Sticker>
        <Sticker
          className="hidden md:flex bottom-20 left-20 bg-yellow-200"
          rotation={-10}
        >
          <Search className="w-5 h-5 mr-2" />{" "}
          <span className="font-mono font-bold text-sm">Gejala...</span>
        </Sticker>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="inline-block mb-6 px-4 py-1 bg-black text-white rounded-full font-mono text-sm uppercase tracking-wider transform -rotate-2">
            The Hook
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
            Kepalamu Sakit. <br />
            <span className="italic text-slate-500">Kamu Buka Google.</span>
          </h1>
          <p className="font-sans text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto text-slate-700 mb-10">
            Lima menit kemudian, kamu membaca tentang penyakit serius. Sepuluh
            menit kemudian, kamu merasa cemas. Fenomena ini punya nama:{" "}
            <span className="font-bold bg-pink-200 px-1 border border-black rounded-sm">
              Cyberchondria
            </span>
            .
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <p className="font-mono text-sm text-slate-500 max-w-md">
              Bukan karena kamu lemah. Tapi karena otakmu bekerja seperti yang
              dirancang: mendeteksi ancaman.
            </p>
          </div>

          <div className="mt-12 animate-bounce">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Scroll Pelan
            </p>
            <div className="w-[1px] h-12 bg-slate-300 mx-auto mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 1: THE STORY --- */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="mb-4 font-mono text-sm font-bold text-pink-500 uppercase tracking-wider">
              Section 1
            </div>
            <SectionHeading>Cerita yang Terlalu Familiar</SectionHeading>

            <div className="space-y-6 font-sans text-lg text-slate-700">
              <p>
                Kamu mengetik:{" "}
                <span className="font-bold bg-yellow-100 px-1">
                  “Kenapa dada saya nyeri?”
                </span>
              </p>

              <div className="bg-white border-2 border-black rounded-xl p-6 shadow-sm max-w-md">
                <p className="text-sm text-slate-400 mb-2 font-mono">
                  Google Search Results
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>{" "}
                    Otot tegang
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>{" "}
                    Asam lambung
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>{" "}
                    Anxiety
                  </li>
                  <li className="flex items-center gap-2 font-bold text-red-500">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>{" "}
                    Serangan jantung
                  </li>
                </ul>
              </div>

              <p>
                Kamu tahu kemungkinan terakhir kecil. Tapi entah kenapa, itu
                yang paling menarik perhatian. Kamu klik. Baca. Bandingkan
                gejala. Cari lagi.
              </p>
            </div>
          </div>

          {/* Right: Visual Loop */}
          <div className="relative h-[500px] w-full bg-[#EAEAEA] rounded-[3rem] border-2 border-black overflow-hidden flex items-center justify-center">
            {/* Abstract representation of the loop */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

            <div className="relative z-10 flex flex-col gap-6 items-center">
              <Card className="w-64 rotate-3" color="bg-white">
                <div className="flex items-center gap-2 font-bold">
                  <Search className="w-4 h-4" /> Search
                </div>
              </Card>
              <div className="h-8 w-[2px] bg-black"></div>
              <Card className="w-64 -rotate-2" color="bg-yellow-100">
                <div className="flex items-center gap-2 font-bold">
                  <Activity className="w-4 h-4" /> Baca
                </div>
              </Card>
              <div className="h-8 w-[2px] bg-black"></div>
              <Card className="w-64 rotate-2" color="bg-red-100">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4" /> Cemas
                </div>
              </Card>
              <div className="h-8 w-[2px] bg-black"></div>
              <Card className="w-64 -rotate-3" color="bg-blue-100">
                <div className="flex items-center gap-2 font-bold">
                  <RefreshCw className="w-4 h-4" /> Search Lagi
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: DEFINITION & STATS --- */}
      <section className="py-20 px-4 md:px-8 bg-black text-[#fdfbf7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-5xl md:text-6xl mb-6 text-[#ccf381]">
                Apa Itu Cyberchondria?
              </h2>
              <p className="text-xl leading-relaxed opacity-90 mb-8">
                Pola peningkatan kecemasan akibat pencarian informasi kesehatan
                secara berlebihan di internet.
              </p>
              <p className="font-mono text-sm opacity-60">
                Istilah ini dipopulerkan oleh peneliti dari Microsoft pada 2008.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/20">
                <div className="text-6xl font-serif mb-2 text-pink-400">
                  70%
                </div>
                <p className="font-mono text-sm uppercase tracking-wider">
                  Orang pernah mencari info kesehatan online
                </p>
              </div>
              <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/20">
                <div className="text-6xl font-serif mb-2 text-blue-400">
                  38%
                </div>
                <p className="font-mono text-sm uppercase tracking-wider">
                  Melaporkan kecemasan meningkat setelah mencari
                </p>
              </div>
              <div className="md:col-span-2 bg-[#fdfbf7] text-black p-8 rounded-2xl border border-white/20 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">
                    Bukan soal frekuensi.
                  </h3>
                  <p className="text-lg">
                    Ini soal bagaimana pencarian itu membuatmu{" "}
                    <span className="italic font-serif">merasa</span>.
                  </p>
                </div>
                <Brain className="absolute -right-10 -bottom-10 w-64 h-64 text-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PERSONA QUIZ --- */}
      <section
        id="persona-quiz"
        className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full border border-black bg-white mb-4 font-mono text-sm">
            Interactive Moment
          </div>
          <SectionHeading>
            Mungkin Kamu Punya <br />
            <span className="italic text-pink-500">“Search Persona”</span>
          </SectionHeading>
          <p className="max-w-xl mx-auto text-lg text-slate-600">
            Pilih mana yang paling terasa seperti kamu. Bukan tes. Bukan label.
            Hanya refleksi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(PERSONAS).map((persona) => (
            <button
              key={persona.id}
              onClick={() => setSelectedPersona(persona.id)}
              className={cn(
                "text-left group relative h-full",
                "focus:outline-none",
              )}
            >
              <Card
                className={cn(
                  "h-full flex flex-col justify-between transition-all duration-300",
                  selectedPersona === persona.id
                    ? "ring-4 ring-black ring-offset-4 scale-[1.02]"
                    : "hover:scale-[1.02]",
                )}
                color={
                  selectedPersona === persona.id ? persona.color : "bg-white"
                }
              >
                <div>
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mb-4 bg-white">
                    {persona.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4">
                    {persona.title}
                  </h3>
                  <p className="font-sans text-slate-700 italic">
                    &quot;{persona.quote}&quot;
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-black/10">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider opacity-50 group-hover:opacity-100 transition-opacity">
                    Pilih Persona Ini →
                  </span>
                </div>
              </Card>
            </button>
          ))}
        </div>

        {/* --- RESULT CARD GENERATOR --- */}
        <AnimatePresence>
          {selectedPersona && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-16 overflow-hidden"
            >
              <div className="bg-black/5 rounded-[3rem] p-8 md:p-16 border-2 border-black/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* The Card Preview (To be captured) */}
                  <div className="flex justify-center">
                    <div
                      ref={cardRef}
                      className={cn(
                        "relative w-full max-w-[400px] aspect-square rounded-3xl border-[3px] border-black p-8 flex flex-col justify-between shadow-2xl",
                        PERSONAS[selectedPersona].color,
                      )}
                    >
                      {/* Card Header */}
                      <div className="flex justify-between items-start">
                        <div className="bg-black text-white px-3 py-1 rounded-full font-mono text-xs font-bold uppercase">
                          Search Persona
                        </div>
                        <Brain className="w-8 h-8 opacity-50" />
                      </div>

                      {/* Card Body */}
                      <div className="text-center relative z-10">
                        <h3 className="font-serif text-4xl md:text-5xl mb-4 leading-none">
                          {PERSONAS[selectedPersona].title}
                        </h3>
                        <p className="font-sans font-medium text-lg leading-tight opacity-90">
                          {PERSONAS[selectedPersona].description}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-black/10 mb-4">
                          <p className="font-mono text-sm font-bold text-center">
                            {PERSONAS[selectedPersona].advice}
                          </p>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="font-mono text-[10px] opacity-60">
                            #ThinkBeforeYouPanic
                          </span>
                          <span className="font-serif italic font-bold">
                            Cyberchondria.
                          </span>
                        </div>
                      </div>

                      {/* Decorative Texture */}
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] pointer-events-none rounded-3xl"></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="text-center lg:text-left space-y-6">
                    <h3 className="font-serif text-4xl">Ini Pola Kamu.</h3>
                    <p className="text-lg text-slate-600 max-w-md">
                      Mengetahui pola bukan berarti kamu harus berhenti mencari
                      informasi. Itu berarti kamu tahu kapan harus berhenti.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Simpan Kartu
                      </button>
                      {/* <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 bg-white border-2 border-black text-black px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        Share
                      </button> */}
                    </div>
                    <button
                      onClick={() => setSelectedPersona(null)}
                      className="text-sm font-mono text-slate-500 underline hover:text-black"
                    >
                      Coba persona lain
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* --- SECTION 4: AWARENESS SHIFT --- */}
      <section className="py-24 px-4 md:px-8 bg-[#ccf381] border-t-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-white border-2 border-black p-3 rounded-full animate-spin-slow">
              <RefreshCw className="w-8 h-8" />
            </div>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl mb-8">
            Awareness Shift
          </h2>
          <p className="font-sans text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto">
            Literasi digital health bukan tentang melarang Google. Tapi tentang
            memahami bagaimana pikiranmu bereaksi terhadap informasi.
            <br />
            <br />
            <span className="font-bold bg-white px-2">
              Informasi itu netral. Interpretasi membentuk emosi.
            </span>
          </p>

          <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <p className="font-mono text-sm uppercase tracking-widest mb-4 text-slate-500">
              Campaign Tagline
            </p>
            <h3 className="font-serif text-4xl md:text-6xl font-bold">
              Think Before You Panic.
            </h3>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: REFLECTION WALL --- */}
      <ReflectionWall />

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-2xl mb-2">
              Cyberchondria Awareness.
            </h4>
            <p className="text-slate-400 text-sm max-w-xs">
              Sebuah inisiatif literasi digital health untuk generasi digital.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-600">
            © 2026 Digital Health Initiative
          </div>
        </div>
      </footer>
    </main>
  );
}
