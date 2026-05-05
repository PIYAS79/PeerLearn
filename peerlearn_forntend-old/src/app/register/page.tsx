'use client';

import { motion } from 'motion/react';
import { GraduationCap, ArrowLeft, Mail, Lock, User, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] -z-10 rounded-full" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:block">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-8">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight font-display mb-6 leading-tight">
            Join the <span className="gradient-text">Future of Peer Learning</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Create your account and start connecting with thousands of students ready to help you succeed.
          </p>

          <div className="space-y-6">
            {[
              { icon: <CheckCircle2 className="w-5 h-5 text-green-400" />, text: "Get instant help on any academic topic" },
              { icon: <CheckCircle2 className="w-5 h-5 text-green-400" />, text: "Earn reputation by teaching others" },
              { icon: <CheckCircle2 className="w-5 h-5 text-green-400" />, text: "Access exclusive study resources" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Register Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10 w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto mb-4">
              <GraduationCap className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-display">Create Account</h2>
          </div>

          <h2 className="hidden lg:block text-2xl font-bold font-display mb-8">Create Account</h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">University Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@university.edu"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Major / Study Field</label>
              <div className="relative group">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Computer Science"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20">
                Create Account
              </button>
            </div>
          </form>

          <p className="text-center text-slate-400 text-sm mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              Sign In
            </Link>
          </p>

          <p className="text-[10px] text-slate-500 text-center mt-6 uppercase tracking-widest leading-relaxed">
            By joining, you agree to our <br />
            <Link href="#" className="underline hover:text-slate-300">Terms of Service</Link> & <Link href="#" className="underline hover:text-slate-300">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
