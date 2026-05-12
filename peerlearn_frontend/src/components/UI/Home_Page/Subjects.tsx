import {
  Atom,
  Code2,
  Calculator,
  Brain,
  BookOpen,
  Database,
  LetterText,
  History,
  TestTube,
} from "lucide-react";

export const Subjects = () => {
  const subjects = [
    { icon: <Code2 />, name: "Programming" },
    { icon: <Calculator />, name: "Mathematics" },
    { icon: <Atom />, name: "Physics" },
    { icon: <Brain />, name: "AI & ML" },
    { icon: <BookOpen />, name: "Biology" },
    { icon: <Database />, name: "Databases" },
    { icon: <LetterText />, name: "English" },
    { icon: <History />, name: "History" },
    { icon: <TestTube />, name: "Chemistry" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8">
          Learn Any Subject
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
          From programming to quantum physics — PeerLearn connects you with
          students who already mastered the topic.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {subjects.map((subject, idx) => (
            <div
              key={idx}
              className="group px-8 py-5 rounded-3xl custom-glass flex items-center gap-4 hover:scale-105 transition-all cursor-pointer"
            >
              <div className="text-indigo-400 group-hover:rotate-12 transition-transform">
                {subject.icon}
              </div>

              <span className="font-bold text-lg">{subject.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};