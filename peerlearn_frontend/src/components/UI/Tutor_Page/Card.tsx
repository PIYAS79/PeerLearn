import { Crown, Zap } from 'lucide-react'
const Tutor_Card = () => {
    return (
        <div className='custom-glass rounded-2xl p-2'>
            <div className='flex items-top'>
                <div className="avatar mr-auto">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                    </div>
                </div>
                <p className='font-bold text-yellow-500'>4.9 (120 reviews)</p>
            </div>
            <p className='text-xs mt-3'>Computer Science</p>
            <h5 className='text-xl font-bold'>Dr. Sarah Jenkins</h5>


            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] font-bold uppercase tracking-wider my-3">
                <Crown className="w-3 h-3" />
                Top Expertise
            </div>
            <div className='flex gap-3 text-xs uppercase'>
                <p className='bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'>Data structure</p>
                <p className='bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'>Algorithms</p>
            </div>

            <div className='mt-2'>
                <button className='w-full cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 group/btn'>
                    <Zap className='w-4 h-4 group-hover/btn:scale-125 transition-transform' />
                    Send Request
                </button>
            </div>
        </div>
    )
}

export default Tutor_Card