import { Person_Data_Type } from '@/types';
import { Calendar, Clock, MessageSquare, Star } from 'lucide-react'
import Action_Btn from './Acion_Btn';
import Link from 'next/link';


const Right_Col = (p_data: { p_data: Person_Data_Type }) => {
    console.log(p_data);
    const isTutor = true; // This would typically come from user data or context
    return (
        <div className="lg:col-span-8 space-y-8 max-w-5xl m-auto ">

            {/* View Requests Section */}
            <section className=''>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-indigo-400" />
                    View Recent Requests
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sent Requests (Student) */}
                    <div className="custom-glass rounded-3xl p-6 border-white/5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Sent as Student</p>
                        <div className="space-y-4">
                            {p_data.p_data?.as_req_maker?.slice(0, 2)?.map((one: any) => (
                                <div key={one.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold mb-1">{one?.title}</h4>
                                        {
                                            one?.target_user ?
                                            <p className="text-[10px] text-slate-500">To: {one?.target_user?.first_name} {one?.target_user?.last_name} • {one?.created_at}</p>
                                            :
                                            <p className="text-[10px] text-slate-500">To: OPEN REQUEST • {one?.created_at}</p>
                                        }
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${one.status === 'PENDING'
                                            ? 'bg-amber-500/10 text-amber-500'

                                            : one.status === 'ACCEPTED'
                                                ? 'bg-blue-500/10 text-blue-500'

                                                : one.status === 'REJECTED'
                                                    ? 'bg-red-500/10 text-red-500'

                                                    : one.status === 'COMPLETED'
                                                        ? 'bg-green-500/10 text-green-500'

                                                        : 'bg-slate-500/10 text-slate-500'
                                            }
    `}
                                    >
                                        {one.status}
                                    </span>
                                </div>
                            ))}
                            {p_data.p_data?.as_req_maker?.length === 0 && <p className="text-center text-slate-600 text-sm py-4">No requests yet</p>}
                        </div>
                    </div>
                    {/* Received Requests (Tutor) */}
                    <div className={`custom-glass rounded-3xl p-6 border-white/5 transition-opacity ${!isTutor ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Received as Tutor</p>
                        <div className="space-y-4">
                            {p_data.p_data?.as_target_user?.filter(one => one.status === 'PENDING')?.slice(0, 2)?.map((one: any) => (
                                <div key={one.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold mb-1">{one.title}</h4>
                                        <p className="text-[10px] text-slate-500">From: {one.req_maker?.first_name} {one.req_maker?.last_name} • {one.created_at}</p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${one.status === 'PENDING'
                                            ? 'bg-amber-500/10 text-amber-500'

                                            : one.status === 'ACCEPTED'
                                                ? 'bg-blue-500/10 text-blue-500'

                                                : one.status === 'REJECTED'
                                                    ? 'bg-red-500/10 text-red-500'

                                                    : one.status === 'COMPLETED'
                                                        ? 'bg-green-500/10 text-green-500'

                                                        : 'bg-slate-500/10 text-slate-500'
                                            }
    `}
                                    >
                                        {one.status}
                                    </span>
                                    <Action_Btn request_id={one.id} status={one.status} />
                                </div>
                            ))}
                            {p_data.p_data?.as_target_user?.filter(one => one.status === 'PENDING').length === 0 && <p className="text-center text-slate-600 text-sm py-4">No pending requests yet</p>}
                        </div>
                    </div>
                </div>
            </section>



            {/* Upcoming Sessions Section */}
            <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-indigo-400" />
                    Upcoming Sessions
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* As Student */}
                    <div className="custom-glass rounded-3xl p-6 border-white/5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Me as Student</p>
                        <div className="space-y-4">
                            {p_data?.p_data?.as_req_maker?.filter(
                                (session: any) => session.status === 'ACCEPTED' || session?.status==="ONGOING"
                            )?.length === 0 ? (
                                <p className="text-center text-slate-600 text-sm py-4">
                                    No requests yet
                                </p>
                            ) : (
                                p_data?.p_data?.as_req_maker
                                    ?.filter(  (session: any) =>    session?.status === 'ACCEPTED' ||    session?.status === 'ONGOING')
                                    ?.map((session: any) => {
                                        const [date, time] = session.call_start_at.split(' at ');

                                        return (
                                            <Link href={`/dashboard/meeting?call_id=${session.call_id}`} key={session.id} className='block'>

                                                <div
                                                    key={session.id}
                                                    className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4"
                                                >
                                                    <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex flex-col items-center justify-center text-indigo-400">
                                                        <Clock className="w-4 h-4" />

                                                        <span className="text-[10px] font-bold mt-1">
                                                            {time}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-bold text-white">{session.title}</h4>

                                                        <p className="text-[10px] text-slate-500">
                                                            Tutor: {session.target_user.first_name}{' '}
                                                            {session.target_user.last_name} • {date}
                                                        </p>
                                                        <p className='text-[8px] font-bold'>{session?.status}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                    {/* As Tutor */}
                    <div className={`custom-glass rounded-3xl p-6 border-white/5 transition-opacity ${!isTutor ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Me as Tutor</p>
                        <div className="space-y-4">
                            {p_data?.p_data?.as_target_user?.filter(
                                (session: any) => session.status === 'ACCEPTED' || session?.status==="ONGOING"
                            )?.length === 0 ? (
                                <p className="text-center text-slate-600 text-sm py-4">
                                    No requests yet
                                </p>
                            ) : (
                                p_data?.p_data?.as_target_user
                                    ?.filter((session: any) => session?.status === 'ACCEPTED'  || session?.status === "ONGOING")
                                    ?.map((session: any) => {
                                        const [date, time] = session.call_start_at.split(' at ');

                                        return (
                                            <Link href={`/dashboard/meeting?call_id=${session.call_id}`} key={session.id} className='block'>
                                                <div
                                                    className="p-4 gap-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-center "
                                                >
                                                    <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex flex-col items-center justify-center text-purple-400">
                                                        <Clock className="w-4 h-4" />

                                                        <span className="text-[10px] font-bold mt-1">
                                                            {time}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-bold text-white">{session.title}</h4>

                                                        <p className="text-[10px] text-slate-500">
                                                            Student: {session.req_maker.first_name}{' '}
                                                            {session.req_maker.last_name} - {date}
                                                        </p>
                                                        <p className='text-[8px] font-bold'>{session?.status}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Right_Col