import { Teacher_Type } from '@/types/teacher_types'
import { Crown, Search, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
const Tutor_Card = ({ teacher }: { teacher: Teacher_Type }) => {
    return (
        <Link href={`/tutor/${teacher?.email}`}>
        <div className='bg-white/5 border border-white/5 rounded-xl p-3 hover:border-indigo-500/20 transition-all duration-300'>

            {/* Top Section */}
            <div className='flex items-start'>
                <div className="avatar mr-auto">
                    <div className="w-16 rounded-full ring ring-indigo-500/20 ring-offset-2 ring-offset-[#0f172a]">
                        <Image
                            width={100}
                            height={100}
                            alt='PeerLearn Teacher Image'
                            src={
                                teacher.photo_url
                                    ? teacher.photo_url
                                    : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                            }
                        />
                    </div>
                </div>

                <div className='flex items-center gap-1 text-yellow-400 text-[11px] font-bold uppercase tracking-wider'>
                    ⭐ 4.9
                    <span className='text-slate-500 normal-case font-medium'>
                        (120 reviews)
                    </span>
                </div>
            </div>

            {/* Teacher Info */}
            <div className='mt-3'>
                <p className='text-[10px] font-bold text-indigo-400 uppercase tracking-wider'>
                    {teacher?.academicInfo?.department}
                </p>

                <h5 className='text-lg font-bold text-slate-100 mt-1 leading-tight'>
                    {teacher?.first_name} {teacher?.last_name}
                </h5>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] font-bold uppercase tracking-wider my-3">
                <Crown className="w-3 h-3" />
                Top Expertise
            </div>

            {/* Skills */}
            <div className='flex flex-wrap gap-2'>
                {teacher?.expertises?.map((expertise) => (
                    <p key={expertise.topic} className='px-2 py-1 rounded-lg text-[8px] uppercase tracking-wider bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all'>
                        {expertise.topic}
                    </p>
                ))}
            </div>

            {/* Button */}
            <div className='mt-4'>
                <button className='w-full cursor-pointer bg-indigo-500 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 group/btn'>
                    <Search className='w-4 h-4 group-hover/btn:scale-125 transition-transform' />
                    View Details
                </button>
            </div>
        </div>
        </Link>
    )
}

export default Tutor_Card