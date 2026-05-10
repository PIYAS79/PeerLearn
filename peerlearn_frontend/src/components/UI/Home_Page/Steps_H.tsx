import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const Steps = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              From Confusion to <br />
              <span className="text-indigo-400">Clarity in 3 Steps</span>
            </h2>
            
            <div className="space-y-10">
              {[
                {
                  step: "01",
                  title: "Post Your Problem",
                  desc: "Describe the topic or problem you&apos;re struggling with. Add images or specific questions."
                },
                {
                  step: "02",
                  title: "Connect with a Peer",
                  desc: "A student who has mastered that topic will accept your request and join a live session."
                },
                {
                  step: "03",
                  title: "Learn & Solve",
                  desc: "Work through the problem together via chat, whiteboard, or video call. Master it for good."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-4xl font-black text-indigo-500/20 font-display">{item.step}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full -z-10" />
            <div className="glass rounded-3xl overflow-hidden shadow-2xl relative aspect-video">
              <Image 
                src="https://picsum.photos/seed/learning/800/600" 
                alt="Students learning together" 
                fill
                className="object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Topic Solved!</p>
                    <p className="text-xs text-slate-300">&quot;Thanks Alex! I finally get the Chain Rule now.&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};