'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Zap, 
  MessageSquare, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  GraduationCap,
  BrainCircuit
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight font-display">PeerLearn</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#" className="hover:text-white transition-colors">How it works</Link>
          <Link href="/timeline" className="hover:text-white transition-colors">Timeline</Link>
          <Link href="#" className="hover:text-white transition-colors">Top Tutors</Link>
          <Link href="#" className="hover:text-white transition-colors">Resources</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-white transition-colors hidden sm:block">Log in</Link>
          <Link href="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20">
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-600/20 blur-[120px] -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
            Built for Students, by Students
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Master Any Topic <br />
            <span className="gradient-text">Before the Exam Night</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stuck on a complex concept? Don&apos;t panic. Connect with peers who&apos;ve mastered it. 
            Learn in real-time, solve problems together, and ace your finals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tutors" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 group">
              Get Help Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="w-full sm:w-auto glass hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              Become a Peer Tutor
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="glass rounded-3xl p-4 md:p-8 max-w-5xl mx-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden relative">
                      <Image 
                        src={`https://picsum.photos/seed/student${i}/100/100`} 
                        alt="Student" 
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-400 font-medium">
                  <span className="text-white">124 students</span> are online right now
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                LIVE TIMELINE
              </div>
            </div>

            <div className="space-y-4 text-left">
              {[
                { name: "Alex Chen", topic: "Quantum Mechanics - Schrodinger Equation", time: "2m ago", status: "urgent" },
                { name: "Sarah Miller", topic: "Advanced Calculus - Triple Integrals", time: "5m ago", status: "active" },
                { name: "David Kim", topic: "Data Structures - Red-Black Trees", time: "12m ago", status: "solved" }
              ].map((post, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">{post.topic}</h4>
                      <p className="text-sm text-slate-500">Posted by {post.name} • {post.time}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    post.status === 'urgent' ? 'bg-red-500/20 text-red-400' : 
                    post.status === 'active' ? 'bg-indigo-500/20 text-indigo-400' : 
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {post.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Instant Help",
      description: "Post your problem and get connected with a peer who knows the topic in minutes."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Peer-to-Peer",
      description: "Learn from someone who speaks your language and understands exactly where you&apos;re stuck."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
      title: "Teach to Learn",
      description: "The best way to master a topic is to teach it. Earn reputation and help your community."
    },
    {
      icon: <Clock className="w-6 h-6 text-green-400" />,
      title: "24/7 Availability",
      description: "Whether it&apos;s 2 PM or 2 AM before the exam, someone is always online to help."
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose PeerLearn?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We&apos;ve built the ultimate ecosystem for academic success, powered by the collective intelligence of students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-800/50 border border-white/5 hover:border-indigo-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-700/50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Steps = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              From Confusion to <br />
              <span className="text-indigo-400">Clarity in 3 Steps</span>
            </h2>
            
            <div className="space-y-10">
              {[
                {
                  step: "01",
                  title: "Post Your Problem",
                  desc: "Describe the topic or problem you&apos;re struggling with. Add images or specific questions."
                },
                {
                  step: "02",
                  title: "Connect with a Peer",
                  desc: "A student who has mastered that topic will accept your request and join a live session."
                },
                {
                  step: "03",
                  title: "Learn & Solve",
                  desc: "Work through the problem together via chat, whiteboard, or video call. Master it for good."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-4xl font-black text-indigo-500/20 font-display">{item.step}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full -z-10" />
            <div className="glass rounded-3xl overflow-hidden shadow-2xl relative aspect-video">
              <Image 
                src="https://picsum.photos/seed/learning/800/600" 
                alt="Students learning together" 
                fill
                className="object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Topic Solved!</p>
                    <p className="text-xs text-slate-300">&quot;Thanks Alex! I finally get the Chain Rule now.&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight font-display">PeerLearn</span>
        </div>
        
        <p className="text-slate-500 text-sm">
          © 2026 PeerLearn. Empowering students to succeed together.
        </p>
        
        <div className="flex items-center gap-6 text-slate-400">
          <Link href="#" className="hover:text-white transition-colors text-sm">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors text-sm">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors text-sm">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      
      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 blur-[100px] -z-10" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Ace Your Exams?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join thousands of students who are already learning better, faster, and together.
          </p>
          <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-200 transition-all shadow-xl shadow-white/10">
            Get Started for Free
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
