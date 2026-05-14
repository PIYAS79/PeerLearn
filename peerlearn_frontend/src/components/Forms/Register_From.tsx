"use client";

import { useState } from "react";
import { motion } from 'motion/react';
import { GraduationCap, Mail, Lock, User, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/actions/registration';
import { toast } from 'sonner';
import { userLogin } from '@/services/actions/login';
import { storeUserInfo } from '@/services/auth.services';

const Register_From = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "STUDENT",
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // split full name
        const nameParts = formData.fullName.trim().split(" ");
        const first_name = nameParts.slice(0, -1).join(" ") || nameParts[0];
        const last_name = nameParts.slice(-1).join("");
        const payload = {
            email: formData.email,
            password: formData.password,
            first_name,
            last_name,
            role: formData.role,
        }


        try {
            const res = await registerUser(payload);
            console.log(res);
            if (res?.data?.id) {
                router.push('/login')
                toast.success(res?.message || "Registration successful");
            } else {
                toast.error(res?.message || "Registration failed due to duplicate email");
            }
        } catch (err: any) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

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

            <h2 className="hidden lg:block text-2xl font-bold font-display mb-8">
                Create Account
            </h2>

            <form className="space-y-4" onSubmit={handleRegister}>
                {/* Full Name */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                        Full Name
                    </label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                        University Email
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="email"
                            placeholder="name@university.edu"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none"
                        />
                    </div>
                </div>

                {/* Role (Modified from Major) */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                        Major / Study Field
                    </label>
                    <div className="relative group">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none text-slate-300"
                        >
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                        </select>
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                        Password
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg">
                        Create Account
                    </button>
                </div>
            </form>

            <p className="text-center text-slate-400 text-sm mt-8">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-400 font-bold">
                    Sign In
                </Link>
            </p>
        </motion.div>
    );
};

export default Register_From;