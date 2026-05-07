import React from 'react'

const Extra = () => {
    const isTutor = true;
  return (
    <>

    {/* Reviews Section */}
            <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    {/* <Star className="w-6 h-6 text-amber-400" /> */}
                    Reviews
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Written Reviews */}
                    <div className="custom-glass rounded-3xl p-6 border-white/5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Reviews to My Tutors</p>
                        {/* <div className="space-y-4">
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
                        </div> */}
                    </div>
                    {/* Earned Reviews */}
                    <div className={`custom-glass rounded-3xl p-6 border-white/5 transition-opacity ${!isTutor ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">My Earned Reviews</p>
                        {/* <div className="space-y-4">
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
                        </div> */}
                    </div>
                </div>
            </section>

    </>
  )
}

export default Extra