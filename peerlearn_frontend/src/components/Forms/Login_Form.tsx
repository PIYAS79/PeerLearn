"use client";


import { GraduationCap, Mail, Lock, Cat, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const Login_Form = () => {
  return (
    <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="custom-glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto mb-6">
              <GraduationCap className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight font-display mb-2">Welcome Back</h1>
            <p className="text-slate-400">Continue your learning journey with PeerLearn</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@university.edu"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 mt-4">
              Sign In
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-950 px-4 text-slate-500 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="custom-glass hover:bg-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-all group">
              <Globe className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="custom-glass hover:bg-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-all group">
              <Cat className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          <p className="text-center text-slate-400 text-sm mt-10">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              Join PeerLearn
            </Link>
          </p>
        </motion.div>
  )
}

export default Login_Form