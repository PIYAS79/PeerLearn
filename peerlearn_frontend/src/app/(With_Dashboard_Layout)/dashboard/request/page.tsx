"use client"
import Action_Btn from '@/components/UI/Profile_Page/Acion_Btn';
import Req_Action_Btn from '@/components/UI/Request_Page/Req_Action_Btn';
import { useGetMyRequestQuery, useGetTargetRequestQuery } from '@/redux/api/requestApi';
import { Request_Data_Type } from '@/types';
import { getFromLocalStorage } from '@/utils/local-storage';
import { MessageSquare, Flame, X, Calendar, User, Tag, FileText, Clock, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

// ── STATUS BADGE ──────────────────────────────────────────────────────────────

type StatusType = 'PENDING' | 'ACCEPTED' | 'ONGOING' | 'COMPLETED' | 'REJECTED';

const statusStyles: Record<StatusType, string> = {
  PENDING:   'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  ACCEPTED:  'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  ONGOING:   'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  COMPLETED: 'bg-green-500/10 text-green-400 border border-green-500/20',
  REJECTED:  'bg-red-500/10 text-red-400 border border-red-500/20',
};

const statusGlow: Record<StatusType, string> = {
  PENDING:   'from-amber-500/20 to-transparent',
  ACCEPTED:  'from-blue-500/20 to-transparent',
  ONGOING:   'from-violet-500/20 to-transparent',
  COMPLETED: 'from-green-500/20 to-transparent',
  REJECTED:  'from-red-500/20 to-transparent',
};

const statusBarColor: Record<StatusType, string> = {
  PENDING:   'bg-amber-500',
  ACCEPTED:  'bg-blue-500',
  ONGOING:   'bg-violet-500',
  COMPLETED: 'bg-green-500',
  REJECTED:  'bg-red-500',
};

const StatusBadge = ({ status }: { status: StatusType }) => (
  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide shrink-0 ${statusStyles[status] ?? 'bg-slate-500/10 text-slate-400'}`}>
    {status}
  </span>
);

// ── URGENT BADGE ──────────────────────────────────────────────────────────────

const UrgentBadge = () => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
    <Flame className="w-2.5 h-2.5" />
    Urgent
  </span>
);

// ── DETAIL MODAL ──────────────────────────────────────────────────────────────

type DetailModalProps = {
  request: any;
  type: 'sent' | 'received';
  onClose: () => void;
};

const DetailModal = ({ request, type, onClose }: DetailModalProps) => {
  const status = request?.status as StatusType;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#080f1e] border border-white/[0.08] rounded-[28px] shadow-2xl overflow-hidden">
        {/* Top color bar */}
        <div className={`h-1 w-full ${statusBarColor[status] ?? 'bg-indigo-500'}`} />

        {/* Subtle top glow */}
        <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${statusGlow[status] ?? 'from-indigo-500/10 to-transparent'} pointer-events-none`} />

        <div className="relative p-7 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {type === 'sent' ? 'Sent Request' : 'Received Request'}
                </span>
                <StatusBadge status={status} />
                {request?.is_urgent && <UrgentBadge />}
              </div>
              <h2 className="text-xl font-black text-white tracking-tight leading-snug">
                {request?.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 shrink-0 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.05]" />

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Person — full width */}
            <div className="col-span-2 flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                  {type === 'sent' ? 'To (Tutor)' : 'From (Student)'}
                </p>
                <p className="text-sm font-bold text-white">
                  {type === 'sent'
                    ? request?.target_user?.first_name
                      ? `${request.target_user.first_name} ${request.target_user.last_name}`
                      : 'Open Request'
                    : `${request?.req_maker?.first_name ?? ''} ${request?.req_maker?.last_name ?? ''}`
                  }
                </p>
              </div>
            </div>

            {/* Created date */}
            <div className="flex items-start gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-7 h-7 rounded-xl bg-slate-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Created</p>
                <p className="text-[11px] font-bold text-white leading-tight">
                  {request?.created_at
                    ? new Date(request.created_at).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', hour12: true,
                      }).replace(',', ' at')
                    : '—'}
                </p>
              </div>
            </div>

            {/* Call scheduled — only if present */}
            {request?.call_start_at ? (
              <div className="flex items-start gap-2 p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold text-emerald-500/70 uppercase tracking-wider mb-0.5">Call Scheduled</p>
                  <p className="text-[11px] font-bold text-emerald-300 leading-tight">{request.call_start_at}</p>
                </div>
              </div>
            ) : null}

            {/* Topic — only if present */}
            {request?.topic ? (
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-8 h-8 rounded-xl bg-slate-500/10 flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Topic</p>
                  <p className="text-sm font-bold text-white">{request.topic}</p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Student's message */}
          {request?.message && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-8 h-8 rounded-xl bg-slate-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Message</p>
                <p className="text-sm text-slate-300 leading-relaxed">{request.message}</p>
              </div>
            </div>
          )}

          {/* Tutor's response message — if present */}
          {request?.response_message && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <ArrowUpRight className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-indigo-500/70 uppercase tracking-wider mb-1.5">
                  {type === 'sent' ? "Tutor's Response" : 'Your Response'}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">{request.response_message}</p>
              </div>
            </div>
          )}

          {/* Close footer */}
          <button
            type="button"
            onClick={onClose}
            className="w-full h-11 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-slate-300 font-semibold text-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

const Request_Page = () => {
  const isTutor = true;
  const my_id = getFromLocalStorage('person_id');
  const { data, isLoading } = useGetMyRequestQuery({ person_id: my_id });
  const { data: targetData, isLoading: isTargetRequestLoading } = useGetTargetRequestQuery({ person_id: my_id });

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [modalType, setModalType] = useState<'sent' | 'received'>('sent');

  const openDetail = (req: any, type: 'sent' | 'received', e: React.MouseEvent) => {
    // Don't open detail modal when clicking action buttons
    if ((e.target as HTMLElement).closest('button')) return;
    setSelectedRequest(req);
    setModalType(type);
  };

  return (
    <div className='p-10'>
      <section className='max-w-6xl m-auto'>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-indigo-400" />
          View Requests
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── SENT REQUESTS (Student) ── */}
          <div className="custom-glass rounded-3xl p-6 border-white/5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Sent as Student</p>
            <div className="space-y-3">
              {isLoading ? (
                <p className="text-center text-slate-600 text-sm py-4">Loading…</p>
              ) : data?.length ? (
                data.map((req: any) => (
                  <div
                    key={req.id}
                    onClick={(e) => openDetail(req, 'sent', e)}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 cursor-pointer hover:bg-white/[0.08] hover:border-white/10 transition-all duration-150 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="text-sm font-bold truncate group-hover:text-indigo-300 transition-colors">{req?.title}</h4>
                        {req?.is_urgent && <UrgentBadge />}
                      </div>
                      <p className="text-[10px] text-slate-500">
                        To: {req?.target_user?.first_name
                          ? `${req.target_user.first_name} ${req.target_user.last_name}`
                          : 'OPEN'
                        } • {req?.created_at}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={req?.status} />
                      <Req_Action_Btn
                        request_id={req.id}
                        status={req.status}
                        current_message={req.message}
                        current_is_urgent={req.is_urgent}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-600 text-sm py-4">No sent requests yet</p>
              )}
            </div>
          </div>

          {/* ── RECEIVED REQUESTS (Tutor) ── */}
          <div className={`custom-glass rounded-3xl p-6 border-white/5 transition-opacity ${!isTutor ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Received as Tutor</p>
            <div className="space-y-3">
              {isTargetRequestLoading ? (
                <p className="text-center text-slate-600 text-sm py-4">Loading…</p>
              ) : targetData?.length ? (
                targetData.map((one: Request_Data_Type & { is_urgent?: boolean }) => (
                  <div
                    key={one.id}
                    onClick={(e) => openDetail(one, 'received', e)}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 cursor-pointer hover:bg-white/[0.08] hover:border-white/10 transition-all duration-150 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="text-sm font-bold truncate group-hover:text-indigo-300 transition-colors">{one.title}</h4>
                        {one?.is_urgent && <UrgentBadge />}
                      </div>
                      <p className="text-[10px] text-slate-500">
                        From: {one.req_maker?.first_name} {one.req_maker?.last_name} • {one.created_at}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={one.status as StatusType} />
                      <Action_Btn request_id={one.id} status={one.status} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-600 text-sm py-4">No requests yet</p>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── DETAIL MODAL ── */}
      {selectedRequest && (
        <DetailModal
          request={selectedRequest}
          type={modalType}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
};

export default Request_Page;