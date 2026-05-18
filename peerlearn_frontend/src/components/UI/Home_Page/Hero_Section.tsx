"use client"


import { ArrowRight, ChevronDown, Sparkles, Star, Users } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Hero_Section = () => {

    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
      const onScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
  
  return (
    <div>
      {/* ── GLOBAL AMBIENT LIGHTS ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[120px]"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        />
        <div
          className="absolute top-1/3 -right-60 w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[100px]"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      {/* ════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center overflow-hidden">

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-24 left-16 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(34,211,238,0.5)] animate-pulse" />
        <div className="absolute top-48 right-24 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_3px_rgba(99,102,241,0.5)] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-32 w-1 h-1 rounded-full bg-violet-400 shadow-[0_0_6px_2px_rgba(167,139,250,0.5)] animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-48 right-16 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_3px_rgba(96,165,250,0.5)] animate-pulse" style={{ animationDelay: "1.5s" }} />

        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-8"
          style={{ animation: "fadeSlideDown 0.8s ease both" }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Built for Students, by Students
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6 max-w-4xl"
          style={{ animation: "fadeSlideDown 0.9s ease 0.1s both" }}
        >
          <p className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
             Master Any Topic <br />
            <span className="gradient-text">Before the Exam Night</span>
           </p>
        </h1>

        {/* Sub */}
        <p
          className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
          style={{ animation: "fadeSlideDown 1s ease 0.2s both" }}
        >
          Stuck on a complex concept? Don&apos;t panic. Connect with peers <br /> who&apos;ve mastered it.
             Learn in real-time, solve problems together, and ace your finals.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 relative"
          style={{ animation: "fadeSlideDown 1s ease 0.3s both" }}
        >

          <Link href={'/timeline'} className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-95 overflow-hidden cursor-pointer">
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <Sparkles className="w-4 h-4" />
            Get Help Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

            <Link href={'/tutor'} className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 font-bold text-sm transition-all duration-200 cursor-pointer active:scale-95">
              <Users className="w-4 h-4" />
              Become A Tutor
            </Link>

        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600" style={{ animation: "fadeSlideDown 1s ease 0.6s both" }}>
          <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>

        {/* Hero glass card — floating UI mockup */}
        <div
          className="absolute bottom-20 right-8 hidden xl:block w-52 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md pointer-events-none"
          style={{ animation: "fadeSlideDown 1.2s ease 0.5s both" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Star className="w-3 h-3 text-indigo-400" />
            </div>
            <span className="text-[11px] font-bold text-slate-300">Top Session</span>
          </div>
          <p className="text-[10px] text-slate-500 mb-2">Quantum Mechanics Basics</p>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
            <span className="text-[9px] text-slate-500 ml-1">5.0</span>
          </div>
        </div>

        <div
          className="absolute top-32 right-12 hidden xl:block w-44 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md pointer-events-none"
          style={{ animation: "fadeSlideDown 1.2s ease 0.4s both" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.5)]" />
            <span className="text-[10px] font-bold text-slate-400">Live Session</span>
          </div>
          <p className="text-[10px] text-slate-500">React Hooks Deep Dive</p>
          <p className="text-[9px] text-indigo-400 mt-1">2 students connected</p>
        </div>

      </section>
    </div>
  )
}

export default Hero_Section
