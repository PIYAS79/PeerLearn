"use client"

import { useCreateRequestMutation } from "@/redux/api/requestApi";
import { getFromLocalStorage } from "@/utils/local-storage";
import { X, Zap } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";

const Direct_Req_Btn = ({ targetUserId }: { targetUserId: string }) => {

    const [createRequest] = useCreateRequestMutation();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newRequest, setNewRequest] = useState({
        title: "",
        message: "",
        req_maker_id: "",
        target_user_id: "",
        is_urgent: false,
    });


    const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newRequest.req_maker_id = getFromLocalStorage('person_id') || '';
        newRequest.target_user_id = targetUserId;

        try {
            const res:any = await createRequest(newRequest);
            if(res?.data?.status === 'success') {
                toast.success('Request sent successfully!');
            }else{
                toast.error(res?.error?.data?.error_title)
            }
            console.log(res);
        } catch (err:any) {
            console.log(err);
        }
        setIsCreateModalOpen(false);
    }



    return (
        <>
            <button
                onClick={() => setIsCreateModalOpen(true)}
                className='mt-5 w-full cursor-pointer bg-indigo-600 hover:bg-indigo-500 transition-all py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10'>
                <Zap className='w-4 h-4' />

                Send Request
            </button>
            {/* Modal start */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div
                        onClick={() => {
                            setIsCreateModalOpen(false);
                        }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />
                    <div
                        className="relative w-full max-w-lg custom-glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10"
                    >
                        <button
                            onClick={() => {
                                setIsCreateModalOpen(false);
                            }}
                            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold font-display mb-8">
                            Create Direct Request
                        </h2>

                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Title Here</label>
                                <input
                                    name="topic"
                                    onChange={(e) =>
                                        setNewRequest({ ...newRequest, title: e.target.value })
                                    }
                                    required
                                    placeholder="e.g. Linear Algebra - Eigenvectors"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                                <textarea
                                    name="description"
                                    onChange={(e) =>
                                        setNewRequest({ ...newRequest, message: e.target.value })
                                    }
                                    required
                                    rows={3}
                                    placeholder="Explain what you're struggling with..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 resize-none text-sm"
                                />
                            </div>

                            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 mt-2">
                                Post Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Model end */}
        </>
    )
}

export default Direct_Req_Btn