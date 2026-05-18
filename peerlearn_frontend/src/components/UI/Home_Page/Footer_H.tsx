import { GraduationCap, Mail } from "lucide-react";
import Link from "next/link";

export const Footer_H = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-black text-sm"><GraduationCap/></span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">PeerLearn</span>
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
                    <Mail className="w-4 h-4" /> Jannatul Ferdaus Sumaiya
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
  );
};