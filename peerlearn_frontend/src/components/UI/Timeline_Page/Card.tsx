"use client";

import { Request_Data_Type } from '@/types';
import { getFromLocalStorage } from '@/utils/local-storage';
import {
    Edit3,
    Trash2,
    Clock,
    Zap,
    X,
    Search,
    GraduationCap,
    AlertCircle,
    AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';
import Accept_Req_Button from './Accept_Req_Button';
import Image from 'next/image';
import {
    useUpdateMyRequestMutation,
    useDeleteMyRequestMutation,  // make sure this is exported from requestApi
} from '@/redux/api/requestApi';

const Timeline_Card = (props: { props: Request_Data_Type; from_dashboard?: boolean }) => {
    const my_id = getFromLocalStorage('person_id');
    const isOwner = my_id === props.props.req_maker_id;

    const [updateMyRequest, { isLoading: isUpdating }] = useUpdateMyRequestMutation();
    const [deleteMyRequest, { isLoading: isDeleting }] = useDeleteMyRequestMutation();

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [editForm, setEditForm] = useState({
        message: props.props.message || '',
        is_urgent: props.props.is_urgent || false,
    });

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateMyRequest({
            request_id: props.props.id,
            message: editForm.message,
            is_urgent: editForm.is_urgent,
        });
        setIsEditModalOpen(false);
    };

    const handleDelete = async () => {
        await deleteMyRequest(props.props.id);
        setIsDeleteModalOpen(false);
    };

    const timeAgo = (dateStr?: string) => {
        if (!dateStr) return '—';
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
        <>
            {/* ── Card ── */}
            <div
                className={`group relative rounded-2xl p-4 transition-all duration-300 overflow-hidden
                    ${isOwner
                        // Own post: violet/indigo left-accent glow border
                        ? 'bg-indigo-950/40 border border-indigo-500/40 shadow-[0_0_0_1px_rgba(99,102,241,0.12),inset_0_0_24px_rgba(99,102,241,0.06)] hover:border-indigo-400/60 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.25),inset_0_0_32px_rgba(99,102,241,0.10)]'
                        // Others: neutral dark card
                        : 'bg-slate-900 border border-white/6 hover:border-indigo-500/25 hover:bg-slate-800/80'
                    }`}
            >

                {/* Hover top glow line */}
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/40 transition-all duration-500" />

                {/* Urgent badge */}
                {props.props.is_urgent && (
                    <div className="absolute top-1 right-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <Zap className="w-2.5 h-2.5 text-amber-400" />
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">Urgent</span>
                    </div>
                )}


                {/* Header */}
                <div className="flex items-center gap-3 mb-3.5">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-slate-700 shrink-0">
                        <Image
                            src={props.props.req_maker?.photo_url || 'https://i1-c.pinimg.com/736x/7f/5c/9c/7f5c9c4aff40b7eeaef97ec40d116b6f.jpg'}
                            alt="User"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-100 leading-none truncate">
                            {props.props.req_maker?.first_name} {props.props.req_maker?.last_name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                            <GraduationCap className="w-3 h-3 text-indigo-400/70 shrink-0" />
                            <span className="text-[10px] font-semibold text-indigo-400/80 uppercase tracking-wider truncate">
                                {props.props.req_maker?.academicInfo?.department || 'N/A'}
                            </span>
                        </div>
                    </div>

                    {/* Owner actions */}
                    {isOwner && (
                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                onClick={() => {
                                    setEditForm({ message: props.props.message || '', is_urgent: props.props.is_urgent || false });
                                    setIsEditModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
                                title="Edit"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/8 transition-all"
                                title="Delete"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/4 mb-3.5" />

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-100 leading-snug mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2 min-h-[2.5rem]">
                    {props.props.title}
                </h3>

                {/* Message preview */}
                {props.props.message && (
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3.5">
                        {props.props.message}
                    </p>
                )}

                {/* Timestamp */}
                <div className="flex items-center gap-1 mb-3.5">
                    <Clock className="w-3 h-3 text-slate-600" />
                    <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
                        {timeAgo(props.props.created_at)}
                    </span>
                </div>

                {/* Actions */}
                {!isOwner ? (
                    <div className={`grid gap-2 ${props.from_dashboard ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <Accept_Req_Button request_id={props.props.id} from_dashboard={props.from_dashboard} />
                        {!props.from_dashboard && (
                            <button
                                onClick={() => setIsDetailModalOpen(true)}
                                className="w-full flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 text-slate-300 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all"
                            >
                                <Search className="w-3.5 h-3.5" />
                                Details
                            </button>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setIsDetailModalOpen(true)}
                        className="w-full flex items-center justify-center gap-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-300 hover:text-indigo-200 py-2.5 rounded-xl text-xs font-bold transition-all"
                    >
                        <Search className="w-3.5 h-3.5" />
                        View Details
                    </button>
                )}
            </div>

            {/* ── Detail Modal ── */}
            {isDetailModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60"
                    >
                        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                        <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-3 right-5 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10">
                                <Image
                                    src={props.props.req_maker?.photo_url || 'https://i1-c.pinimg.com/736x/7f/5c/9c/7f5c9c4aff40b7eeaef97ec40d116b6f.jpg'}
                                    alt="User"
                                    width={44}
                                    height={44}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold">{props.props.req_maker?.first_name} {props.props.req_maker?.last_name}</p>
                                <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider mt-0.5">
                                    {props.props.req_maker?.academicInfo?.department}
                                </p>
                            </div>
                            {props.props.is_urgent && (
                                <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                                    <AlertCircle className="w-3 h-3 text-amber-400" />
                                    <span className="text-[8px] font-bold text-amber-400 uppercase tracking-wider">Urgent</span>
                                </div>
                            )}
                        </div>

                        <div className="w-full h-px bg-white/6 mb-5" />

                        <h2 className="text-base font-bold text-slate-100 leading-snug mb-3">{props.props.title}</h2>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6">{props.props.message || 'No additional description provided.'}</p>

                        <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-semibold uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            {timeAgo(props.props.created_at)}
                        </div>

                        {!isOwner && (
                            <div className="mt-5 pt-5 border-t border-white/6">
                                <Accept_Req_Button request_id={props.props.id} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Edit / Update Modal ── */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/20 rounded-3xl p-8 shadow-2xl shadow-black/60"
                    >
                        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                                <Edit3 className="w-4 h-4 text-indigo-400" />
                            </div>
                            <h2 className="text-lg font-bold tracking-tight">Edit Request</h2>
                        </div>

                        {/* Read-only title preview */}
                        <p className="text-xs text-slate-500 mb-6 pl-1 line-clamp-1">
                            <span className="text-slate-600">Title: </span>{props.props.title}
                        </p>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Description
                                </label>
                                <textarea
                                    value={editForm.message}
                                    onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                                    required
                                    rows={4}
                                    placeholder="Update your description..."
                                    className="w-full bg-slate-800/60 border border-white/8 rounded-2xl py-3 px-4 text-sm outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 resize-none"
                                />
                            </div>

                            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 cursor-pointer hover:bg-white/5 transition-all group">
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${editForm.is_urgent ? 'bg-amber-500 border-amber-400' : 'border-white/20 bg-white/5'}`}>
                                    {editForm.is_urgent && <div className="w-2 h-2 rounded-sm bg-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={editForm.is_urgent}
                                    onChange={(e) => setEditForm({ ...editForm, is_urgent: e.target.checked })}
                                />
                                <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-300 transition-colors">
                                    Mark as urgent
                                </span>
                                <span className="ml-auto text-[10px] font-bold text-amber-500/70 uppercase tracking-wider">Priority</span>
                            </label>

                            <div className="flex gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 py-3 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 text-slate-400 hover:text-white text-sm font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
                                >
                                    {isUpdating ? 'Saving...' : 'Update Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Delete Confirm Modal ── */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div onClick={() => setIsDeleteModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-sm bg-slate-900 border border-red-500/20 rounded-3xl p-8 shadow-2xl shadow-black/60 text-center"
                    >
                        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

                        <button onClick={() => setIsDeleteModalOpen(false)} className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                            <X className="w-5 h-5" />
                        </button>

                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                        </div>

                        <h2 className="text-lg font-bold mb-2">Delete Request?</h2>
                        <p className="text-sm text-slate-400 leading-relaxed mb-1 line-clamp-2 px-2">
                            "{props.props.title}"
                        </p>
                        <p className="text-xs text-slate-600 mb-7">This action cannot be undone.</p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 py-3 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 text-slate-400 hover:text-white text-sm font-bold transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-lg shadow-red-500/20"
                            >
                                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Timeline_Card;