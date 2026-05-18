"use client";

import { useEffect, useRef, useState } from "react";
import {
  Users, BookOpen, Star, Zap, Globe, Shield,
  MessageSquare, TrendingUp, Mail, Cat, Network,
  ArrowRight, Sparkles, Brain, Target, Layers,
  Code2, Database, Server, Lock, Cloud, Bot,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

// ── SCROLL REVEAL HOOK ────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── SECTION WRAPPER ───────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const features = [
  { icon: Users,        title: "Peer-to-Peer Learning",    desc: "Connect directly with knowledgeable peers for real academic sessions tailored to your pace." },
  { icon: BookOpen,     title: "Session Requests",         desc: "Request focused help on any topic and get matched with the right tutor instantly." },
  { icon: Star,         title: "Smart Reviews & Ratings",  desc: "Transparent quality signals keep the community trustworthy and continuously improving." },
  { icon: Brain,        title: "Expertise System",         desc: "Tutors build verified academic profiles showcasing their subject-level mastery." },
  { icon: Bot,          title: "AI-Enhanced Experience",   desc: "AI surfaces the right matches, surfaces key session insights, and powers smarter discovery." },
  { icon: Zap,          title: "Real-Time Collaboration",  desc: "Live sessions with instant communication tools that make learning feel natural." },
  { icon: TrendingUp,   title: "Student Profiles",         desc: "Track your learning journey, showcase skills earned, and build a credible academic identity." },
  { icon: Globe,        title: "Learning Community",       desc: "A living ecosystem where every interaction makes the platform smarter and more connected." },
];

const frontendStack = [
  { icon: Code2,    label: "React" },
  { icon: Layers,   label: "Next.js" },
  { icon: Shield,   label: "TypeScript" },
  { icon: Sparkles, label: "Tailwind CSS" },
  { icon: Target,   label: "Redux" },
];

const backendStack = [
  { icon: Server,   label: "Node.js" },
  { icon: Code2,    label: "Express.js" },
  { icon: Server,    label: "Sockek IO" },
  { icon: Database, label: "Prisma ORM" },
  { icon: Database, label: "PostgreSQL" },
];

const otherStack = [
  { icon: Lock,  label: "JWT Auth" },
  { icon: Cloud, label: "Cloudinary" },
  { icon: Mail, label: "Nodemailer" },
  { icon: Bot,   label: "AI Client - Gemini" },
];

const team = [
  {
    name: "S M Piyas Mahamude Alif",
    role: "Full Stack Developer",
    focus: "Backcend and Architecture",
    image: "https://i1-c.pinimg.com/736x/b1/06/09/b10609c82fc4495bdd1aae88a03dba7b.jpg",
    bio: "Passionate about scalable systems and modern web architecture. Builds robust APIs and elegant frontends with deep attention to developer experience.",
    skills: ["React", "Next.js", "Express.js", "Prisma", "TypeScript", "PostgreSQL", "MongoDB", "Tailwind"],
    email: "alif15-6479@s.diu.edu.bd",
    uni: "Daffodil International University",
    initials: "PA",
    color: "from-indigo-500 to-cyan-500",
    glow: "shadow-indigo-500/30",
  },
  {
    name: "Jannatul Ferdaus Sumaiya",
    role: "Full Stack Developer",
    image:"https://i1-c.pinimg.com/736x/00/e3/b2/00e3b28d544de2d5f471d7d5c44630cd.jpg",
    focus: "UI/UX and Architecture",
    bio: "Passionate about education technology and collaborative systems. Bridges technical precision with design thinking to craft experiences students love.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "UI/UX"],
    email: "sumaiya15-6423@s.diu.edu.bd",
    uni: "Daffodil International University",
    initials: "JS",
    color: "from-violet-500 to-blue-500",
    glow: "shadow-violet-500/30",
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function About_Page() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020817] text-slate-50 overflow-x-hidden font-sans antialiased selection:bg-indigo-500/30">

      {/* ════════════════════════════════════════════════════
          2. MISSION
      ════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-6 leading-[1.05]">
                Removing the barrier between{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  needing help
                </span>{" "}
                and{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  being able to teach
                </span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Every student holds knowledge that another student needs. PeerLearn was born from a simple
                belief: the best teachers aren't always in classrooms — they're sitting right next to you.
                We built the infrastructure to make that exchange effortless, credible, and rewarding.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users,       label: "Collaborative",   desc: "Every session builds community" },
                { icon: TrendingUp,  label: "Growth-Focused",  desc: "Track and celebrate progress" },
                { icon: Shield,      label: "Trustworthy",     desc: "Verified reviews, real quality" },
                { icon: Zap,         label: "Empowering",      desc: "Students teaching students" },
              ].map(({ icon: Icon, label, desc }, i) => (
                <Reveal key={label} delay={i * 80} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 group cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 flex items-center justify-center mb-3 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-indigo-400" />
                  </div>
                  <p className="text-sm font-bold text-white mb-1">{label}</p>
                  <p className="text-[11px] text-slate-500">{desc}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. FEATURES
      ════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Platform Features</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                learn & teach
              </span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="group relative h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/40 hover:bg-indigo-500/[0.04] transition-all duration-300 cursor-default overflow-hidden">
                  {/* Corner glow on hover */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-all duration-500 blur-xl" />
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] group-hover:bg-indigo-500/15 border border-white/[0.06] flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-sm font-black text-white mb-2">{title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. TECH STACK
      ════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Technology Stack</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3">
              Built with{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                modern tools
              </span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Frontend",  color: "indigo", items: frontendStack },
              { label: "Backend",   color: "cyan",   items: backendStack },
              { label: "Services",  color: "violet", items: otherStack },
            ].map(({ label, color, items }, gi) => (
              <Reveal key={label} delay={gi * 100}>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-full">
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-5 text-${color}-400`}>{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map(({ icon: Icon, label: tech }) => (
                      <div
                        key={tech}
                        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-${color}-500/8 border border-${color}-500/15 hover:border-${color}-500/40 hover:bg-${color}-500/15 transition-all duration-200 cursor-default`}
                      >
                        <Icon className={`w-3 h-3 text-${color}-400`} />
                        <span className={`text-[11px] font-bold text-${color}-300`}>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. TEAM
      ════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">The Builders</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-4">
              Two students.{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                One vision.
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              PeerLearn was conceived and built entirely by two passionate computer science students
              who wanted to change how their peers learn.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((dev, i) => (
              <Reveal key={dev.name} delay={i * 120}>
                <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 overflow-hidden">

                  {/* Ambient glow */}
                  <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${dev.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700`} />

                  {/* Avatar */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="relative shrink-0">
                      <div className={`w-26 h-30 overflow-hidden rounded-lg bg-gradient-to-br ${dev.color} flex items-center justify-center shadow-xl ${dev.glow}`}>
                         <Image
                              src={dev?.image}
                              alt="User"
                              width={500}
                              height={500}
                              className="object-cover w-full h-full"
                          />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white leading-tight">{dev.name}</h3>
                      <p className="text-sm font-bold text-indigo-300 mt-0.5">{dev.role}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{dev.focus}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{dev.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {dev.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-bold text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-white/[0.05]">
                    <span className="text-[10px] text-slate-600 font-medium">{dev.uni}</span>
                    <a
                      href={`mailto:${dev.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      Email
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Connector line */}
          <Reveal className="flex justify-center mt-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_2px_rgba(99,102,241,0.5)]" />
              <span className="text-xs font-semibold text-slate-500">Built together at Daffodil International University</span>
              <div className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.5)]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. VISION
      ════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Our Vision</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 mb-8 leading-[0.95]">
              A world where{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                every student
              </span>
              <br />
              is both learner and teacher
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-4 mt-16">
            {[
              { stat: "∞",      label: "Learning Potential",   desc: "Unlimited peer sessions across every academic field" },
              { stat: "AI",     label: "Powered Matching",     desc: "Intelligent systems connecting the right people" },
              { stat: "🌐",     label: "Global Network",       desc: "Students collaborating across universities worldwide" },
            ].map(({ stat, label, desc }, i) => (
              <Reveal key={label} delay={i * 100}>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-all duration-300">
                  <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2">{stat}</div>
                  <p className="text-sm font-bold text-white mb-1">{label}</p>
                  <p className="text-[11px] text-slate-500">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. FOOTER
      ════════════════════════════════════════════════════ */}
      <footer className="relative py-16 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center">
                  <span className="text-white font-black text-sm">P</span>
                </div>
                <span className="text-white font-black text-xl tracking-tight">PeerLearn</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                A peer-to-peer learning ecosystem built by students, for students. Empowering
                academic collaboration through modern technology.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Platform</p>
              <ul className="space-y-2">
                {["Explore Tutors", "Request Session", "Join Community", "Become a Tutor"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Contact</p>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:alif15-6479@s.diu.edu.bd" className="text-sm text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                    <Mail className="w-4 h-4" /> S M Piyas Mahamude Alif
                  </a>
                </li>
                <li>
                  <a href="mailto:sumaiya15-6423@s.diu.edu.bd" className="text-sm text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />Jannatul Ferdaus Sumaiya
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} PeerLearn. Built with ❤️ by Alif & Sumaiya at DIU.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.4)]" />
              <span className="text-xs text-slate-600">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}