import Image from "next/image";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CSE Student",
      text: "PeerLearn literally saved me before finals week. I understood Calculus in one night.",
      image: "https://picsum.photos/seed/girl1/200/200",
    },
    {
      name: "David Kim",
      role: "Engineering Student",
      text: "The live whiteboard sessions are insane. It feels better than private tutoring.",
      image: "https://picsum.photos/seed/boy1/200/200",
    },
    {
      name: "Emily Watson",
      role: "Medical Student",
      text: "I used PeerLearn almost every night before exams. Best student platform ever.",
      image: "https://picsum.photos/seed/girl2/200/200",
    },
  ];

  return (
    <section className="py-28 px-6 bg-slate-900/40 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/10 blur-[160px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <p className="text-pink-400 uppercase tracking-[0.3em] text-sm font-bold mb-4">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Loved by Students
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Thousands of students are already transforming the way they study.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="custom-glass rounded-[2rem] p-8 relative hover:border-pink-500/30 transition-all"
            >
              <Quote className="absolute top-6 right-6 text-white/10 w-14 h-14" />

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-slate-400 text-sm">{item.role}</p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-lg">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};