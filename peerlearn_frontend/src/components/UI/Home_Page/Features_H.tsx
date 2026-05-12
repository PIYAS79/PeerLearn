import { BrainCircuit, Clock, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const Features = () => {
  const features = [
    { id : 1,
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Instant Help",
      description: "Post your problem and get connected with a peer who knows the topic in minutes."
    },
    {
      id:2,
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Peer-to-Peer",
      description: "Learn from someone who speaks your language and understands exactly where you&apos;re stuck."
    },
    {
      id:3,
      icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
      title: "Teach to Learn",
      description: "The best way to master a topic is to teach it. Earn reputation and help your community."
    },
    {
      id:4,
      icon: <Clock className="w-6 h-6 text-green-400" />,
      title: "24/7 Availability",
      description: "Whether it&apos;s 2 PM or 2 AM before the exam, someone is always online to help."
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose PeerLearn?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We&apos;ve built the ultimate ecosystem for academic success, powered by the collective intelligence of students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, id) => (
            <div 
              key={feature.id}
              className="p-8 rounded-3xl bg-slate-800/50 border border-white/5 hover:border-indigo-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-700/50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};