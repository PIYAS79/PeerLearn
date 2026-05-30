"use client";

import { useState } from "react";
import { userLogin } from '@/services/actions/login';
import { storeUserInfo } from '@/services/auth.services';
import { GraduationCap, Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Login_Form = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await userLogin(formData);

      if (res?.success) {
        toast.success(res?.message);

        // store token (client side)
        storeUserInfo({ access_token: res.data.access_token });
      } else {
        toast.error(res?.error_title || "Login failed");
      }
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="custom-glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10"
    >
      <div className="text-center mb-5">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto mb-6">
          <GraduationCap className="text-white w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-display mb-2">Welcome Back</h1>
        <p className="text-slate-400">Continue your learning journey with PeerLearn</p>
        <button
          className="text-xs text-blue-400 underline uppercase cursor-pointer"
          onClick={() => {
            const dlg = document.getElementById('my_modal_1') as HTMLDialogElement | null;
            dlg?.showModal();
          }}
        >
          Click to Test Login
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <p className="pb-2 text-blue-400">Simple User</p>
            <p className="pb-0">EMAIL : piyasmahmudealif@gmail.com</p>
            <p className="pb-2">PASS : 222156479</p>
            <br />
            <p className="pb-2 text-blue-400">Admin Login</p>
            <p className="pb-0">EMAIL : admin@gmail.com</p>
            <p className="pb-0">PASS : 222156479</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-error btn-xs">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
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
              className="w-full bg-white/5 border border-white/10 rounded-2xl mt-2 py-4 pl-12 pr-4 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <Link href="#" className="text-xs text-indigo-400">Forgot Password?</Link>
          </div>
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
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none"
            />
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg cursor-pointer">
          Sign In
        </button>
      </form>
      <p className="text-center text-slate-400 text-sm mt-3">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
          Join PeerLearn
        </Link>
      </p>
    </motion.div>
  );
};

export default Login_Form;