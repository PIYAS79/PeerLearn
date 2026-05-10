import { Features } from '@/components/UI/Home_Page/Features_H'
import { Footer_H } from '@/components/UI/Home_Page/Footer_H'
import Hero_Section from '@/components/UI/Home_Page/Hero_Section'
import { Steps } from '@/components/UI/Home_Page/Steps_H'

const Home_Page = () => {
  return (
    <div className="bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/30 w-full">
      <Hero_Section/>
      {/* <Features/> */}
      {/* <Steps/> */}
      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 blur-[100px] -z-10" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Ace Your Exams?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join thousands of students who are already learning better, faster, and together.
          </p>
          <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-200 transition-all shadow-xl shadow-white/10">
            Get Started for Free
          </button>
        </div>
      </section>

      <Footer_H />
    </div>
  )
}

export default Home_Page