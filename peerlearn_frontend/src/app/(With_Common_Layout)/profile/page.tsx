import { Calendar, CheckCircle2, Clock, MessageSquare, Star } from 'lucide-react'

const receivedRequests: any = [
    { id: '3', topic: 'Intro to Python', status: 'pending', date: 'Oct 14', otherParty: 'Emma Watson' }
];
const sentRequests: any = [
    { id: '1', topic: 'Quantum Mechanics Basics', status: 'pending', date: 'Oct 12', otherParty: 'Dr. Sarah' },
    { id: '2', topic: 'React Hooks Deep Dive', status: 'accepted', date: 'Oct 10', otherParty: 'James Wilson' }
];
const writtenReviews: any = [
    { id: '1', rating: 5, comment: 'Great tutor, very patient!', date: 'Oct 05', fromTo: 'Sarah Jenkins' }
];

const earnedReviews: any = [
    { id: '2', rating: 4.8, comment: 'Explained everything clearly.', date: 'Sep 28', fromTo: 'Mike Ross' }
];

const studentSessions: any = [
    { id: '1', topic: 'Calculus II', time: '04:00 PM', date: 'Tomorrow', otherParty: 'Prof. Oak' }
];

const tutorSessions: any = [
    { id: '2', topic: 'Web Development', time: '02:00 PM', date: 'Monday', otherParty: 'John Doe' }
];

const Profile_Page = () => {

    const isTutor = true; // This would come from user data in a real app







    return (
        <div className=' bg-slate-950 clear-start flex justify-between min-h-screen'>
            <div className='border-r min-w-[350px] '>
                <div className="avatar w-full justify-center mt-8">
                    <div className="w-[50%] border-2 border-green-500 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-center mt-4">S M Piyas Mahamude Alif</h3>
                <p className="text-center text-gray-500">Software Engineer</p>
            </div>
            <div className=' flex-1'>
                {/* Right Column: Requests, Reviews, Sessions */}
                <div className="lg:col-span-8 space-y-8 max-w-5xl m-auto ">

                    {/* View Requests Section */}
                    <section className='mt-8'>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-indigo-400" />
                            View Requests
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sent Requests (Student) */}
                            <div className="custom-glass rounded-3xl p-6 border-white/5">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Sent as Student</p>
                                <div className="space-y-4">
                                    {sentRequests.map((req: any) => (
                                        <div key={req.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-bold mb-1">{req.topic}</h4>
                                                <p className="text-[10px] text-slate-500">To: {req.otherParty} • {req?.date}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${req.status === 'accepted' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Received Requests (Tutor) */}
                            <div className={`custom-glass rounded-3xl p-6 border-white/5 transition-opacity ${!isTutor ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Received as Tutor</p>
                                <div className="space-y-4">
                                    {receivedRequests.map((req: any) => (
                                        <div key={req.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-bold mb-1">{req.topic}</h4>
                                                <p className="text-[10px] text-slate-500">From: {req.otherParty} • {req.date}</p>
                                            </div>
                                            <button className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-all">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {receivedRequests.length === 0 && <p className="text-center text-slate-600 text-sm py-4">No requests yet</p>}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Star className="w-6 h-6 text-amber-400" />
                            Reviews
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Written Reviews */}
                            <div className="custom-glass rounded-3xl p-6 border-white/5">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Reviews to My Tutors</p>
                                <div className="space-y-4">
                                    {writtenReviews.map((rev: any) => (
                                        <div key={rev.id} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-slate-300">{rev.fromTo}</span>
                                                <div className="flex items-center gap-1 text-amber-400">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span className="text-[10px] font-bold">{rev.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 italic">&quot;{rev.comment}&quot;</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Earned Reviews */}
                            <div className={`custom-glass rounded-3xl p-6 border-white/5 transition-opacity ${!isTutor ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">My Earned Reviews</p>
                                <div className="space-y-4">
                                    {earnedReviews.map((rev: any) => (
                                        <div key={rev.id} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-slate-300">From: {rev.fromTo}</span>
                                                <div className="flex items-center gap-1 text-amber-400">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span className="text-[10px] font-bold">{rev.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 italic">&quot;{rev.comment}&quot;</p>
                                        </div>
                                    ))}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* As Student */}
                            <div className="custom-glass rounded-3xl p-6 border-white/5">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Me as Student</p>
                                <div className="space-y-4">
                                    {studentSessions.map((session: any) => (
                                        <div key={session.id} className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex flex-col items-center justify-center text-indigo-400">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-[8px] font-bold mt-1">{session.time}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold">{session.topic}</h4>
                                                <p className="text-[10px] text-slate-500">Tutor: {session.otherParty} • {session.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* As Tutor */}
                            <div className={`custom-glass rounded-3xl p-6 border-white/5 transition-opacity ${!isTutor ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Me as Tutor</p>
                                <div className="space-y-4">
                                    {tutorSessions.map((session: any) => (
                                        <div key={session.id} className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex flex-col items-center justify-center text-purple-400">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-[8px] font-bold mt-1">{session.time}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold">{session.topic}</h4>
                                                <p className="text-[10px] text-slate-500">Student: {session.otherParty} • {session.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {tutorSessions.length === 0 && <p className="text-center text-slate-600 text-sm py-4">No sessions scheduled</p>}
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default Profile_Page