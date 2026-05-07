import { CheckCircle2, MessageSquare } from 'lucide-react'


const receivedRequests: any = [
    { id: '3', topic: 'Intro to Python', status: 'pending', date: 'Oct 14', otherParty: 'Emma Watson' }
];
const sentRequests: any = [
    { id: '1', topic: 'Quantum Mechanics Basics', status: 'pending', date: 'Oct 12', otherParty: 'Dr. Sarah' },
    { id: '2', topic: 'React Hooks Deep Dive', status: 'accepted', date: 'Oct 10', otherParty: 'James Wilson' }
];

const Request_Page = () => {  
  const isTutor = true; // This would typically come from user data or context


  return (
    <div>
      {/* View Requests Section */}
      <section className=' max-w-7xl m-auto'>
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
    </div>
  )
}

export default Request_Page