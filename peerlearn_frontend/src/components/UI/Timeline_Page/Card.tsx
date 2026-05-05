import {
    Edit3, Trash2, BookOpen,
    Clock,
    Zap
} from 'lucide-react';

const Timeline_Card = () => {
    return (
        <div className='custom-glass p-2'>
            <div className='flex'>
                <div className="w-12 aspect-square bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                </div>
                <div className='pl-2 mr-auto flex flex-col justify-center'>
                    <h6 className='text-md font-bold'>User Name</h6>
                    <p className='text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider'>CSE</p>
                </div>
                <div className='flex items-center gap-4'>
                    <Edit3 className='w-4' />
                    <Trash2 className='w-4' />
                </div>
            </div>
            <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] font-bold uppercase tracking-wider my-3">
                    <BookOpen className="w-3 h-3" />
                    Descrete Mathmatics
                </div>
                <h3 className="text-lg min-h-20 font-bold text-slate-100 mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                    TITLE HERE
                </h3>

                <div className='flex justify-between items-center'>
                    <p className='cursor-pointer text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider'>view details</p>

                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            3M AGO
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <button className='w-full cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 group/btn'>
                    <Zap className='w-4 h-4 group-hover/btn:scale-125 transition-transform' />
                    Accept Request
                </button>
            </div>
        </div>
    )
}

export default Timeline_Card