import { BookOpen, Users, Video, Star } from "lucide-react";

export const Community_Stats = () => {
  const stats = [
    {
      icon: <Users className="w-7 h-7 text-indigo-400" />,
      value: "12K+",
      label: "Active Students",
    },
    {
      icon: <Video className="w-7 h-7 text-pink-400" />,
      value: "48K+",
      label: "Live Sessions",
    },
    {
      icon: <BookOpen className="w-7 h-7 text-green-400" />,
      value: "320K+",
      label: "Problems Solved",
    },
    {
      icon: <Star className="w-7 h-7 text-yellow-400" />,
      value: "4.9/5",
      label: "Student Satisfaction",
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-bold uppercase tracking-[0.3em] mb-4 text-sm">
            Community Powered
          </p>

          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight gradient-text">
            Students Helping <br />
            Students Worldwide
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A collaborative ecosystem where students teach, learn, and grow
            together in real time.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="custom-glass rounded-3xl p-8 text-center hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>

              <h3 className="text-4xl font-black mb-2 gradient-text">
                {item.value}
              </h3>

              <p className="text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};