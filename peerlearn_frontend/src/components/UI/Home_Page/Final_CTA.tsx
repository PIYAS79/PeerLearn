import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Final_CTA = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="custom-glass rounded-[3rem] p-12 md:p-20 text-center border border-white/10 shadow-2xl">
          <p className="uppercase tracking-[0.3em] text-indigo-400 text-sm font-bold mb-6">
            Start Learning Smarter
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8 gradient-text">
            Your Next Exam <br />
            Doesn&apos;t Have To Be Stressful !
          </h2>

          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
            Join the fastest-growing student learning community and turn
            confusion into confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              Join PeerLearn
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/tutor"
              className="custom-glass px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Explore Tutors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};