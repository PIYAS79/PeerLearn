'use client';

import React, { useState } from 'react';
import { useUpdateRequestStatusMutation } from '@/redux/api/requestApi';
import { getFromLocalStorage } from '@/utils/local-storage';
import { toast } from 'sonner';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {
  CheckCircle2,
  XCircle,
  MessageSquare,
  Zap,
  X,
  Loader2,
  CalendarClock,
} from 'lucide-react';

// =============================================
// TYPES
// =============================================

type Props = {
  request_id: string,
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED"
};

type ActionType = 'ACCEPTED' | 'REJECTED' | null;

// =============================================
// COMPONENT
// =============================================

const Action_Btn = ({ request_id, status }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ActionType>(null);
  const [message, setMessage] = useState('');
  const [callDateTime, setCallDateTime] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);

  const [acceptRequest] = useUpdateRequestStatusMutation();
  const my_id = getFromLocalStorage('person_id');

  // ── OPEN / CLOSE ──────────────────────────

  const openModal = () => {
    setSelected(null);
    setMessage('');
    setCallDateTime(null);
    setIsOpen(true);
  };

  const closeModal = () => {
    if (loading) return;
    setIsOpen(false);
    setSelected(null);
    setMessage('');
    setCallDateTime(null);
  };

  // ── VALIDATION ────────────────────────────

  const isSubmitDisabled = () => {
    if (!selected) return true;
    if (selected === 'ACCEPTED' && !callDateTime) return true;
    return false;
  };

  // ── SUBMIT ────────────────────────────────

  const handleSubmit = async () => {
    if (!selected) {
      toast.error('Please choose Accept or Reject.');
      return;
    }
    if (selected === 'ACCEPTED' && !callDateTime) {
      toast.error('Please select a call date & time.');
      return;
    }

    try {
      setLoading(true);

      const body: Record<string, any> = {
        request_id,
        target_user_id: my_id,
        status: selected,
      };

      if (message.trim()) {
        body.message = message.trim();
      }

      if (selected === 'ACCEPTED' && callDateTime) {
        body.call_start_at = dayjs(callDateTime).format('DD MMM YYYY [at] hh:mm A');
      }

      const res: any = await acceptRequest(body);

      if (res?.data?.status === 'success' || res?.data) {
        toast.success(
          selected === 'ACCEPTED'
            ? 'Request accepted successfully!'
            : 'Request rejected.'
        );
        closeModal();
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── RENDER ────────────────────────────────

  return (
    <>
      {/* TRIGGER BUTTON */}
      {status === 'PENDING' && <button
        type="button"
        onClick={openModal}
        className="group relative inline-flex items-center gap-2 px-2 py-1 ml-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 cursor-pointer overflow-hidden"
      >
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <Zap className="w-3.5 h-3.5" />
<span className='text-[10px]'>ACTION</span>      
</button>}

      {/* MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-md bg-[#080f1e] border border-white/[0.08] rounded-[28px] shadow-2xl overflow-hidden">

            {/* Top glow bar */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="p-7 space-y-1">

              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    Respond to Request
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="w-9 h-9 shrink-0 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ACTION CHOICE */}
              <div className="grid grid-cols-2 gap-3">

                {/* ACCEPT */}
                <button
                  type="button"
                  onClick={() => setSelected('ACCEPTED')}
                  className={`
                    relative group flex items-center justify-center gap-1 h-10 rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer
                    ${selected === 'ACCEPTED'
                      ? 'bg-emerald-500/15 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                      : 'bg-white/[0.02] border-white/[0.07] hover:border-emerald-500/30 hover:bg-emerald-500/5'
                    }
                  `}
                >
                  {selected === 'ACCEPTED' && (
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-emerald-500/40 pointer-events-none" />
                  )}
                  <CheckCircle2
                    className={`w-6 h-6 transition-colors ${selected === 'ACCEPTED' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-500/70'}`}
                  />
                  <span
                    className={`text-sm font-bold tracking-wide transition-colors ${selected === 'ACCEPTED' ? 'text-emerald-300' : 'text-slate-400 group-hover:text-slate-300'}`}
                  >
                    Accept
                  </span>
                  {selected === 'ACCEPTED' && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
                  )}
                </button>

                {/* REJECT */}
                <button
                  type="button"
                  onClick={() => { setSelected('REJECTED'); setCallDateTime(null); }}
                  className={`
                    relative group flex items-center justify-center gap-1 h-10 rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer
                    ${selected === 'REJECTED'
                      ? 'bg-red-500/15 border-red-500/60 shadow-lg shadow-red-500/10'
                      : 'bg-white/[0.02] border-white/[0.07] hover:border-red-500/30 hover:bg-red-500/5'
                    }
                  `}
                >
                  {selected === 'REJECTED' && (
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-red-500/40 pointer-events-none" />
                  )}
                  <XCircle
                    className={`w-6 h-6 transition-colors ${selected === 'REJECTED' ? 'text-red-400' : 'text-slate-500 group-hover:text-red-500/70'}`}
                  />
                  <span
                    className={`text-sm font-bold tracking-wide transition-colors ${selected === 'REJECTED' ? 'text-red-300' : 'text-slate-400 group-hover:text-slate-300'}`}
                  >
                    Reject
                  </span>
                  {selected === 'REJECTED' && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_2px_rgba(248,113,113,0.5)]" />
                  )}
                </button>
              </div>

              {/* DATE & TIME — only shown when ACCEPTED */}
              {selected === 'ACCEPTED' && (
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                    <CalendarClock className="w-3.5 h-3.5 text-emerald-400" />
                    Call Date & Time
                    <span className="text-red-400 ml-0.5">*</span>
                  </label>
                  <DatePicker
                    showTime
                    format="DD MMM YYYY [at] hh:mm A"
                    value={callDateTime}
                    onChange={(value) => setCallDateTime(value)}
                    placeholder="Pick a date & time"
                    needConfirm={false}
                    className="w-full !h-12 !rounded-2xl !bg-white/[0.03] !border-white/[0.08] !text-white hover:!border-emerald-500/50 focus-within:!border-emerald-500/60"
                  />
                  {!callDateTime && (
                    <p className="text-xs text-slate-600 mt-1.5 ml-1">
                      Required to confirm acceptance
                    </p>
                  )}
                </div>
              )}

              {/* MESSAGE FIELD */}
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Message
                  <span className="text-slate-600 font-normal">— optional</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    selected === 'REJECTED'
                      ? "Let them know why you're declining…"
                      : 'Add a note for the requester…'
                  }
                  rows={3}
                  className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 py-3.5 text-white text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 resize-none transition-colors"
                />
              </div>

              {/* DIVIDER */}
              {/* <div className="h-px bg-white/[0.05]" /> */}

              {/* FOOTER ACTIONS */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="flex-1 h-12 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-slate-300 font-semibold text-sm transition-all"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || isSubmitDisabled()}
                  className={`
                    flex-[2] h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg
                    ${isSubmitDisabled()
                      ? 'bg-white/[0.04] border border-white/[0.07] text-slate-600 cursor-not-allowed'
                      : selected === 'ACCEPTED'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white shadow-emerald-500/20 active:scale-[0.98]'
                        : 'bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90 text-white shadow-red-500/20 active:scale-[0.98]'
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing…
                    </>
                  ) : selected === 'ACCEPTED' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm Accept
                    </>
                  ) : selected === 'REJECTED' ? (
                    <>
                      <XCircle className="w-4 h-4" />
                      Confirm Reject
                    </>
                  ) : (
                    'Select an Action'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Action_Btn;