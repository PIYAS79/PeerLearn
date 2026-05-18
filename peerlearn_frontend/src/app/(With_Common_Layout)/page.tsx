import { Community_Stats } from '@/components/UI/Home_Page/Community_Stats'
import { Features } from '@/components/UI/Home_Page/Features_H'
import { Final_CTA } from '@/components/UI/Home_Page/Final_CTA'
import { Footer_H } from '@/components/UI/Home_Page/Footer_H'
import Hero_Section from '@/components/UI/Home_Page/Hero_Section'
import { Steps } from '@/components/UI/Home_Page/Steps_H'
import { Subjects } from '@/components/UI/Home_Page/Subjects'
import { Testimonials } from '@/components/UI/Home_Page/Testimonials'

const Home_Page = () => {
  return (
    <div className="bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/30 w-full">
      <Hero_Section />
      <Steps />
      <Features />
      <Community_Stats />
      <Subjects/>
      <Testimonials/>
      <Final_CTA/>

      <Footer_H />
    </div>
  )
}

export default Home_Page