
import Register_From from '@/components/Forms/Register_From';
import { GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const Register_Page = () => {
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
        <Register_From />
      </div>
    </main>
  );
}

export default Register_Page