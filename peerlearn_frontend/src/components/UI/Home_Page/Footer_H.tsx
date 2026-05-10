import { GraduationCap } from "lucide-react";
import Link from "next/link";

export const Footer_H = () => {
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