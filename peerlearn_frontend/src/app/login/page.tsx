import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Login_Form from '@/components/Forms/Login_Form';



const Login_Page = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] -z-10 rounded-full" />

      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <Login_Form />

      </div>
    </main>
  );
}

export default Login_Page