"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2, Calculator, Atom, Brain, BookOpen,
  Database, LetterText, History, TestTube,
  ArrowRight, Users, Clock, Star,
} from "lucide-react";
import Link from "next/link";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.90s ease ${delay}ms, transform 0.90s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const courses = [
  {
    icon: Code2,
    name: "Programming",
    tagline: "From syntax to systems",
    students: "3.2K",
    sessions: "14K",
    rating: "4.9",
    color: "indigo",
    glow: "rgba(99,102,241,0.15)",
    border: "rgba(99,102,241,0.25)",
    tags: ["Python", "JS", "React", "DSA"],
    accent: "#818cf8",
  },
  {
    icon: Calculator,
    name: "Mathematics",
    tagline: "Numbers that make sense",
    students: "2.8K",
    sessions: "11K",
    rating: "4.8",
    color: "cyan",
    glow: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.20)",
    tags: ["Calculus", "Linear Algebra", "Stats"],
    accent: "#22d3ee",
  },
  {
    icon: Atom,
    name: "Physics",
    tagline: "Understand the universe",
    students: "1.9K",
    sessions: "7K",
    rating: "4.9",
    color: "violet",
    glow: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.20)",
    tags: ["Quantum", "Mechanics", "Optics"],
    accent: "#a78bfa",
  },
  {
    icon: Brain,
    name: "AI & Machine Learning",
    tagline: "Build intelligent systems",
    students: "4.1K",
    sessions: "18K",
    rating: "5.0",
    color: "blue",
    glow: "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.20)",
    tags: ["PyTorch", "NLP", "CV", "LLMs"],
    accent: "#60a5fa",
    hot: true,
  },
  {
    icon: TestTube,
    name: "Chemistry",
    tagline: "Reactions, bonds & beyond",
    students: "1.4K",
    sessions: "5K",
    rating: "4.7",
    color: "emerald",
    glow: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.20)",
    tags: ["Organic", "Inorganic", "Physical"],
    accent: "#34d399",
  },
  {
    icon: Database,
    name: "Databases",
    tagline: "Store, query, scale",
    students: "2.2K",
    sessions: "8K",
    rating: "4.8",
    color: "amber",
    glow: "rgba(251,191,36,0.10)",
    border: "rgba(251,191,36,0.18)",
    tags: ["SQL", "PostgreSQL", "MongoDB"],
    accent: "#fbbf24",
  },
  {
    icon: BookOpen,
    name: "Biology",
    tagline: "Life at every scale",
    students: "1.7K",
    sessions: "6K",
    rating: "4.7",
    color: "green",
    glow: "rgba(74,222,128,0.10)",
    border: "rgba(74,222,128,0.18)",
    tags: ["Cell Bio", "Genetics", "Anatomy"],
    accent: "#4ade80",
  },
  {
    icon: History,
    name: "History",
    tagline: "Context shapes the present",
    students: "980",
    sessions: "3K",
    rating: "4.6",
    color: "rose",
    glow: "rgba(251,113,133,0.10)",
    border: "rgba(251,113,133,0.18)",
    tags: ["World", "Political", "Cultural"],
    accent: "#fb7185",
  },
  {
    icon: LetterText,
    name: "English & Writing",
    tagline: "Communicate with clarity",
    students: "2.5K",
    sessions: "9K",
    rating: "4.8",
    color: "slate",
    glow: "rgba(148,163,184,0.10)",
    border: "rgba(148,163,184,0.15)",
    tags: ["Essay", "Grammar", "IELTS"],
    accent: "#94a3b8",
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export const Subjects = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-cyan-500/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <Reveal className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_2px_rgba(99,102,241,0.6)]" style={{ animation: "pulseDot 2s infinite" }} />
            Course Catalog
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-2 mb-5 leading-[1.0]">
            Learn{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Any Subject
            </span>
            <br />
            With Real Peers
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            From programming to quantum physics — connect with students who already
            mastered the topic and are ready to teach.
          </p>
        </Reveal>

        {/* Stats bar */}
        <Reveal delay={100} className="flex flex-wrap items-center justify-center gap-8 mb-16">
          {[
            { value: "9+", label: "Subjects" },
            { value: "21K+", label: "Active Learners" },
            { value: "81K+", label: "Sessions Completed" },
            { value: "4.8★", label: "Avg Rating" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">{value}</p>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </Reveal>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, i) => {
            const Icon = course.icon;
            const isHovered = hovered === i;
            return (
              <Reveal key={course.name} delay={i * 55}>
                <div
                  className="group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 h-full"
                  style={{
                    background: isHovered
                      ? `radial-gradient(ellipse at top left, ${course.glow}, transparent 70%), rgba(255,255,255,0.02)`
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isHovered ? course.border : "rgba(255,255,255,0.06)"}`,
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isHovered ? `0 20px 60px -10px ${course.glow}` : "none",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Hot badge */}
                  {course.hot && (
                    <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-400 text-[9px] font-black uppercase tracking-widest">
                      🔥 Trending
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{
                      background: isHovered ? `${course.glow}` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isHovered ? course.border : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: course.accent }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-white mb-1">{course.name}</h3>
                  <p className="text-[11px] text-slate-500 mb-4">{course.tagline}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all duration-200"
                        style={{
                          background: isHovered ? `${course.glow}` : "rgba(255,255,255,0.04)",
                          border: `1px solid ${isHovered ? course.border : "rgba(255,255,255,0.06)"}`,
                          color: isHovered ? course.accent : "#64748b",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-600" />
                      <span className="text-[10px] font-bold text-slate-500">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-600" />
                      <span className="text-[10px] font-bold text-slate-500">{course.sessions} sessions</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-400">{course.rating}</span>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div
                    className="mt-4 flex items-center gap-1 text-[11px] font-bold transition-all duration-300 overflow-hidden"
                    style={{
                      maxHeight: isHovered ? "24px" : "0",
                      opacity: isHovered ? 1 : 0,
                      color: course.accent,
                    }}
                  >
                    Find a tutor
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Browse all CTA */}
        <Reveal delay={200} className="text-center mt-12">
          <Link href={'/timeline'}>
          <button className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/40 hover:bg-indigo-500/5 text-slate-300 hover:text-white font-bold text-sm transition-all duration-200">
            Browse All Subjects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          </Link>
        </Reveal>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.7); }
        }
      `}</style>
    </section>
  );
};