'use client';
import { motion } from 'motion/react';
import { GraduationCap, ArrowLeft, Mail, Lock, User, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';


const Register_From = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="custom-glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10 w-full max-w-md mx-auto lg:mx-0"
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
    )
}

export default Register_From