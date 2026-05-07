"use client";

import { Request_Data_Type } from '@/types';
import { getFromLocalStorage } from '@/utils/local-storage';
import {
    Edit3,
    Trash2,
    Clock,
    Zap,
    X
} from 'lucide-react';
import { useState } from 'react';

const Timeline_Card = (props: { props: Request_Data_Type }) => {
    const my_id = getFromLocalStorage('person_id');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            {/* Card */}
            <div
                className=''
                onClick={() => setIsCreateModalOpen(true)}
            >
                <div className='custom-glass p-3 rounded-xl'>
                    <div className='flex'>
                        <div className="w-12 aspect-square bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        </div>

                        <div className='pl-2 mr-auto flex flex-col justify-center'>
                            <h6 className='text-md font-bold'>
                                {props.props.req_maker?.first_name}{" "}
                                {props.props.req_maker?.last_name}
                            </h6>

                            <p className='text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider'>
                                {props.props.req_maker?.academicInfo?.department}
                            </p>
                        </div>

                        <div className='flex items-center gap-4'>
                            <Edit3 className='w-4 cursor-pointer' />
                            <Trash2 className='w-4 cursor-pointer' />
                        </div>
                    </div>

                    <div className='mt-2'>
                        <h3 className="text-lg min-h-20 font-bold text-slate-100 mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                            {props.props.title}
                        </h3>

                        <div className='flex justify-between items-center'>
                            <p className='cursor-pointer text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider'>
                                SOmething Here
                            </p>

                            <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    3M AGO
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-2'>
                        {my_id !== props.props.req_maker_id ?
                            <button className='w-full cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 group/btn'>
                                <Zap className='w-4 h-4 group-hover/btn:scale-125 transition-transform' />
                                Accept Request
                            </button> :
                            <button className='w-full cursor-pointer bg-orange-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 group/btn'>
                                <Zap className='w-4 h-4 group-hover/btn:scale-125 transition-transform' />
                                My Request
                            </button>
                        }

                    </div>
                </div>
            </div>

            {/* Modal start */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">

                    {/* Overlay */}
                    <div
                        onClick={() => {
                            setIsCreateModalOpen(false);
                        }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-lg custom-glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-white/10"
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
                            Title : {props.props.title}
                        </h2>
                        <p>Description : {props.props.message}</p>
                    </div>
                </div>
            )}
            {/* Modal end */}
        </>
    );
};

export default Timeline_Card;