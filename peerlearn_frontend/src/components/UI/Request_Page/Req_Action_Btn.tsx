'use client';

import React, { useState } from 'react';
import { useUpdateMyRequestMutation, useDeleteMyRequestMutation } from '@/redux/api/requestApi';
import { toast } from 'sonner';
import {
  Zap,
  X,
  Loader2,
  Pencil,
  Trash2,
  AlertTriangle,
  MessageSquare,
  Flame,
} from 'lucide-react';

// =============================================
// TYPES
// =============================================

type Status = 'PENDING' | 'ACCEPTED' | 'ONGOING' | 'COMPLETED' | 'REJECTED';

type Props = {
  request_id: string;
  status: Status;
  current_message?: string;
  current_is_urgent?: boolean;
};

type ModalView = 'menu' | 'update' | 'delete';

// =============================================
// COMPONENT
// =============================================

const Req_Action_Btn = ({ request_id, status, current_message = '', current_is_urgent = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ModalView>('menu');
  const [message, setMessage] = useState(current_message);
  const [isUrgent, setIsUrgent] = useState(current_is_urgent);
  const [loading, setLoading] = useState(false);

  const [updateMyRequest] = useUpdateMyRequestMutation();
  const [deleteMyRequest] = useDeleteMyRequestMutation();

  const canAct = status === 'PENDING' || status === 'ACCEPTED';

  // ── OPEN / CLOSE ──────────────────────────

  const openModal = () => {
    setView('menu');
    setMessage(current_message);
    setIsUrgent(current_is_urgent);
    setIsOpen(true);
  };

  const closeModal = () => {
    if (loading) return;
    setIsOpen(false);
    setView('menu');
  };

  // ── UPDATE ────────────────────────────────

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res: any = await updateMyRequest({ request_id, message, is_urgent: isUrgent });
      if (res?.data) {
        toast.success('Request updated successfully!');
        closeModal();
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── DELETE ────────────────────────────────

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res: any = await deleteMyRequest(request_id);
      if (res?.data) {
        toast.success('Request deleted.');
        closeModal();
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!canAct) return null;

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={openModal}
        className="group relative inline-flex items-center gap-1.5 px-2 py-1 ml-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 cursor-pointer overflow-hidden shrink-0"
      >
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <Zap className="w-3.5 h-3.5" />
        <span className="text-[10px]">ACTION</span>
      </button>

      {/* MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-sm bg-[#080f1e] border border-white/[0.08] rounded-[28px] shadow-2xl overflow-hidden">
            {/* Top glow bar */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white tracking-tight">
                  {view === 'menu' && 'Manage Request'}
                  {view === 'update' && 'Update Request'}
                  {view === 'delete' && 'Delete Request'}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="w-8 h-8 shrink-0 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ── MENU VIEW ── */}
              {view === 'menu' && (
                <div className="grid grid-cols-2 gap-3">
                  {/* UPDATE */}
                  <button
                    type="button"
                    onClick={() => setView('update')}
                    className="group relative flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                      <Pencil className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Edit</span>
                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() => setView('delete')}
                    className="group relative flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center transition-colors">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Delete</span>
                  </button>
                </div>
              )}

              {/* ── UPDATE VIEW ── */}
              {view === 'update' && (
                <div className="space-y-4">
                  {/* Message */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Message
                      <span className="text-slate-600 font-normal">— optional</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Update your message to the tutor…"
                      rows={3}
                      className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 resize-none transition-colors"
                    />
                  </div>

                  {/* Urgent toggle */}
                  <button
                    type="button"
                    onClick={() => setIsUrgent(!isUrgent)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-200 cursor-pointer
                      ${isUrgent
                        ? 'bg-orange-500/10 border-orange-500/50'
                        : 'bg-white/[0.02] border-white/[0.07] hover:border-orange-500/30 hover:bg-orange-500/5'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Flame className={`w-4 h-4 ${isUrgent ? 'text-orange-400' : 'text-slate-500'}`} />
                      <span className={`text-sm font-bold ${isUrgent ? 'text-orange-300' : 'text-slate-400'}`}>
                        Mark as Urgent
                      </span>
                    </div>
                    {/* Toggle pill */}
                    <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${isUrgent ? 'bg-orange-500' : 'bg-white/10'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${isUrgent ? 'left-5' : 'left-0.5'}`} />
                    </div>
                  </button>

                  {/* Footer */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setView('menu')}
                      disabled={loading}
                      className="flex-1 h-11 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-slate-300 font-semibold text-sm transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdate}
                      disabled={loading}
                      className="flex-[2] h-11 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                    >
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Pencil className="w-4 h-4" /> Save Changes</>}
                    </button>
                  </div>
                </div>
              )}

              {/* ── DELETE VIEW ── */}
              {view === 'delete' && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-3 py-3">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7 text-red-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-300 font-medium">Are you sure you want to delete this request?</p>
                      <p className="text-xs text-slate-600 mt-1">This action cannot be undone.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setView('menu')}
                      disabled={loading}
                      className="flex-1 h-11 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-slate-300 font-semibold text-sm transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={loading}
                      className="flex-[2] h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/20"
                    >
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting…</> : <><Trash2 className="w-4 h-4" /> Yes, Delete</>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Req_Action_Btn;