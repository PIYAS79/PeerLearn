import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, ArrowRight } from 'lucide-react';

const Hero_Section = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-600/20 blur-[120px] -z-0 rounded-full" />

      <div className="max-w-7xl mx-auto text-center">
        <div>
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
            <Link href="/register" className="w-full sm:w-auto custom-glass hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              Become a Peer Tutor
            </Link>
          </div>
        </div>

        <div className="mt-20 relative"
        >
          <div className="custom-glass rounded-3xl p-4 md:p-8 max-w-5xl mx-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden relative">
                      <Image
                        src={`https://picsum.photos/seed/student${i}/100/100`}
                        sizes=''
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
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${post.status === 'urgent' ? 'bg-red-500/20 text-red-400' :
                    post.status === 'active' ? 'bg-indigo-500/20 text-indigo-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                    {post.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero_Section