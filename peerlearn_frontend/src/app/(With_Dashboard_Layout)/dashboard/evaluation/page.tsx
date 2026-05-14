"use client"

import { useGetMyQuestionsQuery, useCheckMyAnswareMutation } from "@/redux/api/questionApi"
import { useGetRequestByCallIdQuery } from "@/redux/api/requestApi"
import { useCreateReviewMutation } from "@/redux/api/reviewApi"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import Image from "next/image"
import {
  Star,
  ChevronRight,
  CheckCircle2,
  XCircle,
  User2,
  BookOpen,
  Trophy,
  Send,
  Loader2,
  Sparkles,
  GraduationCap,
  Target,
  ArrowRight,
  Brain,
  ClipboardList,
  Award,
  MessageSquareText,
} from "lucide-react"

/* ─── types ─────────────────────────────── */
type Question = {
  id: string
  question: string
  question_number: number
  opt_a: string
  opt_b: string
  opt_c: string
  opt_d: string
  request_id: string
}

type AnsPayload = { question_number: number; ans: string }

type ReviewForm = {
  details: string
  course_title: string
  course_code: string
  topic: string
  human_rating: number
  teaching_category: string
}

/* ─── option key helper ──────────────────── */
const OPT_KEYS = ["opt_a", "opt_b", "opt_c", "opt_d"] as const
type OptKey = (typeof OPT_KEYS)[number]

// Map opt key → display letter
const OPT_LETTER: Record<OptKey, string> = {
  opt_a: "A",
  opt_b: "B",
  opt_c: "C",
  opt_d: "D",
}

const TEACHING_CATEGORIES = ["EXCELLENT", "AVERAGE", "BELOW_AVERAGE"] as const

/* ═══════════════════════════════════════════════════════════ */
const Evaluation_Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const call_id = searchParams.get("call_id")

  /* ── queries / mutations ── */
  const { data: requestData, isLoading: rLoading } = useGetRequestByCallIdQuery({ call_id: call_id })
  const { data: questions, isLoading: qLoading } = useGetMyQuestionsQuery({ request_id: requestData?.id })
  const [checkAnswers, { isLoading: isChecking }] = useCheckMyAnswareMutation()
  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation()

  console.log(requestData)

  /* ── quiz state ── */
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOpts, setSelectedOpts] = useState<Record<number, { key: OptKey; value: string }>>({})
  const [submitted, setSubmitted] = useState(false)
  const [scoreData, setScoreData] = useState<any>(null)

  /* ── review form ── */
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    details: "",
    course_title: "",
    course_code: "",
    topic: "",
    human_rating: 0,
    teaching_category: "",
  })

  /* Sync topic from requestData once loaded */
  useEffect(() => {
    if (requestData?.title) {
      setReviewForm((p) => ({ ...p, topic: requestData.title }))
    }
  }, [requestData?.title])

  /* ── animated score counter ── */
  const [displayScore, setDisplayScore] = useState(0)
  useEffect(() => {
    if (!scoreData) return
    // Support multiple possible field names from the API
    const target =
      scoreData?.score ??
      scoreData?.correct ??
      scoreData?.correct_count ??
      scoreData?.total_correct ??
      0
    let cur = 0
    const step = () => {
      cur += 1
      setDisplayScore(cur)
      if (cur < target) setTimeout(step, 80)
    }
    setTimeout(step, 300)
  }, [scoreData])

  if (qLoading || rLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center animate-pulse">
            <Brain size={28} className="text-indigo-400" />
          </div>
          <p className="text-slate-400 text-sm animate-pulse">Loading evaluation…</p>
        </div>
      </div>
    )
  }

  const teacher =
    requestData?.target_user ?? requestData?.request?.target_user ?? null
  const totalQ = questions?.length ?? 0
  const currentQ: Question | undefined = questions?.[currentIdx]
  const isLast = currentIdx === totalQ - 1
  const allAnswered = totalQ > 0 && Object.keys(selectedOpts).length === totalQ

  /* ── resolved score value ── */
  const resolvedScore =
    scoreData?.score ??
    scoreData?.correct ??
    scoreData?.correct_count ??
    scoreData?.total_correct ??
    0

  /* ── handlers ── */
  const handleSelect = (qNum: number, key: OptKey, value: string) => {
    if (submitted) return
    setSelectedOpts((prev) => ({ ...prev, [qNum]: { key, value } }))
  }

  const handleNext = () => {
    if (!selectedOpts[currentQ!.question_number]) {
      toast.error("Please select an answer first.")
      return
    }
    if (!isLast) setCurrentIdx((i) => i + 1)
  }

  const handleSubmit = async () => {
    if (!allAnswered) { toast.error("Please answer all questions."); return }
    const ans: AnsPayload[] = Object.entries(selectedOpts).map(([qNum, { value }]) => ({
      question_number: Number(qNum),
      // strip the "A. " / "B. " prefix if present, send raw option text
      ans: value.replace(/^[A-D]\.\s*/, ""),
    }))
    try {
      console.log(ans)
      const res = await checkAnswers({ request_id: requestData?.id, ans: { ans } }).unwrap()
      console.log("score response:", res)
      setScoreData(res?.data ?? res)
      setSubmitted(true)
      toast.success("Answers submitted successfully!")
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Submission failed. Try again.")
    }
  }

  const handleReviewSubmit = async () => {
    if (!reviewForm.details.trim()) { toast.error("Please write your feedback."); return }
    if (!reviewForm.course_title.trim()) { toast.error("Please enter course title."); return }
    if (!reviewForm.course_code.trim()) { toast.error("Please enter course code."); return }
    if (!reviewForm.topic.trim()) { toast.error("Please enter topic."); return }
    if (!reviewForm.teaching_category) { toast.error("Please select a teaching category."); return }
    try {
      console.log(reviewForm)
      await createReview({ request_id: requestData?.id, data: reviewForm }).unwrap()
      toast.success("Review submitted! Redirecting…")
      setTimeout(() => router.push("/dashboard/profile"), 1500)
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Review submission failed.")
    }
  }

  const scorePercent = totalQ > 0 ? Math.round((resolvedScore / totalQ) * 100) : 0

  const getScoreColor = () => {
    if (scorePercent >= 80) return { ring: "#22c55e", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", label: "Excellent!" }
    if (scorePercent >= 60) return { ring: "#3b82f6", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", label: "Good Job!" }
    if (scorePercent >= 40) return { ring: "#f59e0b", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", label: "Keep Practicing" }
    return { ring: "#ef4444", bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", label: "Needs Improvement" }
  }
  const sc = getScoreColor()

  return (
    <div className="max-w-7xl mx-auto px-2 pb-20">

      {/* ══ Score Banner (after submit) ══ */}
      {submitted && scoreData && (
        <div className={`mb-6 rounded-3xl border ${sc.border} ${sc.bg} p-5 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden`}>
          {/* glow blob */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
            style={{ background: sc.ring }} />

          {/* ring */}
          <div className="relative flex-shrink-0">
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="45" cy="45" r="38" fill="none" stroke={sc.ring} strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - scorePercent / 100)}`}
                strokeLinecap="round" transform="rotate(-90 45 45)"
                style={{ transition: "stroke-dashoffset 1s ease" }} />
              <text x="45" y="50" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
                {displayScore}/{totalQ}
              </text>
            </svg>
          </div>

          <div>
            <p className={`text-2xl font-black ${sc.text}`}>{sc.label}</p>
            <p className="text-slate-400 text-sm mt-1">
              You scored <span className="text-white font-bold">{scorePercent}%</span> on this evaluation.
            </p>
            <p className="text-slate-500 text-xs mt-1">Scroll down to leave a review for your tutor.</p>
          </div>

          <div className="sm:ml-auto flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
            <Trophy size={18} className={sc.text} />
            <span className={`text-sm font-bold ${sc.text}`}>{scorePercent}%</span>
          </div>
        </div>
      )}

      {/* ══ Main Grid ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">

        {/* ── LEFT: Teacher / Request Info ── */}
        <div className="custom-glass rounded-3xl border border-white/5 p-6 h-fit lg:sticky lg:top-6">

          {/* Teacher card */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              {teacher?.photo_url ? (
                <Image src={teacher?.photo_url} alt="teacher" width={56} height={56}
                  className="rounded-2xl object-cover border border-white/10" />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <User2 size={24} className="text-white" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0f1117]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Your Tutor</p>
              <h4 className="text-base font-bold text-white leading-tight">
                {teacher?.first_name} {teacher?.last_name}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{teacher?.email}</p>
            </div>
          </div>

          <div className="h-px bg-white/5 mb-5" />

          {/* Info rows */}
          <div className="space-y-3">
            <InfoRow icon={<GraduationCap size={14} />} label="Session Type" value="Live Session" />
            <InfoRow icon={<Target size={14} />} label="Topic" value={requestData?.title ?? "—"} />
            <InfoRow icon={<ClipboardList size={14} />} label="Total Questions" value={`${totalQ ? totalQ : 5} Questions`} />
          </div>

          <div className="h-px bg-white/5 my-5" />

          {/* Progress pills */}
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              {submitted ? "Completed" : "Progress"}
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {questions?.map((_: Question, i: number) => {
                const q = questions[i] as Question
                const answered = selectedOpts[q.question_number] !== undefined
                const isCurrent = i === currentIdx && !submitted
                return (
                  <div key={i}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all
                      ${isCurrent ? "bg-indigo-500/30 border-indigo-500/50 text-indigo-300" :
                        answered || submitted ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                          "bg-white/5 border-white/5 text-slate-600"}`}>
                    {i + 1}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Quiz / Review ── */}
        <div className="space-y-5">

          {/* Quiz card */}
          {!submitted && currentQ && (
            <div className="custom-glass rounded-3xl border border-white/5 p-6 relative overflow-hidden">
              {/* decorative blob */}
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center">
                    <Brain size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Question</p>
                    <p className="text-sm font-bold text-white">{currentIdx + 1} <span className="text-slate-500 font-normal">of {totalQ}</span></p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-32 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${((currentIdx + 1) / totalQ) * 100}%` }} />
                </div>
              </div>

              {/* Question text */}
              <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-base font-semibold text-white leading-relaxed">{currentQ.question}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OPT_KEYS.map((key) => {
                  const optVal = currentQ[key]
                  const letter = OPT_LETTER[key] // ← fixed: always A, B, C, D
                  const isSelected = selectedOpts[currentQ.question_number]?.key === key
                  return (
                    <button key={key} onClick={() => handleSelect(currentQ.question_number, key, optVal)}
                      className={`group w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-3
                        ${isSelected
                          ? "bg-indigo-500/20 border-indigo-500/40 shadow-lg shadow-indigo-500/10"
                          : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10"}`}>
                      <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black border transition-all
                        ${isSelected ? "bg-indigo-500 border-indigo-400 text-white" : "bg-white/5 border-white/10 text-slate-500 group-hover:border-white/20"}`}>
                        {letter}
                      </span>
                      <span className={`text-sm leading-snug font-medium transition-colors
                        ${isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-300"}`}>
                        {optVal}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Next / Submit */}
              <div className="mt-6 flex justify-end">
                {isLast && allAnswered ? (
                  <button onClick={handleSubmit} disabled={isChecking}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20">
                    {isChecking ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
                    {isChecking ? "Checking…" : "Submit Answers"}
                  </button>
                ) : (
                  <button onClick={handleNext}
                    disabled={!selectedOpts[currentQ.question_number]}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-bold text-sm hover:bg-indigo-500/30 transition-all disabled:opacity-40">
                    Next <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Already submitted — show summary */}
          {submitted && (
            <div className="custom-glass rounded-3xl border border-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/20 flex items-center justify-center">
                  <ClipboardList size={14} className="text-purple-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Answer Summary</h3>
              </div>
              <div className="space-y-3">
                {questions?.map((q: Question) => {
                  const chosen = selectedOpts[q.question_number]
                  return (
                    <div key={q.id} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <p className="text-xs font-semibold text-slate-300 mb-2">
                        <span className="text-slate-500 mr-1">Q{q.question_number}.</span>{q.question}
                      </p>
                      <div className="flex items-center gap-2">
                        {chosen && (
                          <span className="text-[11px] px-2 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-md bg-indigo-500/30 flex items-center justify-center text-[10px] font-black">
                              {OPT_LETTER[chosen.key]}
                            </span>
                            {chosen.value}
                          </span>
                        )}
                        {!chosen && (
                          <span className="text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-500 font-bold">—</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ══ Review Form (after submit) ══ */}
          {submitted && (
            <div className="custom-glass rounded-3xl border border-white/5 p-6 relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/20 flex items-center justify-center">
                  <MessageSquareText size={14} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Leave a Review</h3>
                  <p className="text-[11px] text-slate-500">Share your experience with this tutor</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="mb-6">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setReviewForm((p) => ({ ...p, human_rating: star }))}
                      className="transition-transform hover:scale-110 active:scale-95">
                      <Star size={26}
                        className={star <= reviewForm.human_rating ? "fill-amber-400 text-amber-400" : "text-slate-700"}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-bold text-amber-400">{reviewForm.human_rating}/5</span>
                </div>
              </div>

              {/* Teaching Category */}
              <div className="mb-4">
                <label className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  <Award size={10} /> Teaching Category
                </label>
                <select
                  value={reviewForm.teaching_category}
                  onChange={(e) => setReviewForm((p) => ({ ...p, teaching_category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                >
                  <option value="" disabled className="bg-[#1e2130] text-slate-400">Select a category…</option>
                  {TEACHING_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#1e2130] text-white">
                      {cat.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormField
                  label="Topic"
                  placeholder="e.g. Quantum Mechanics"
                  value={reviewForm.topic}
                  onChange={(v) => setReviewForm((p) => ({ ...p, topic: v }))}
                  icon={<Sparkles size={12} />}
                />
                <FormField
                  label="Course Code"
                  placeholder="e.g. PHY-301"
                  value={reviewForm.course_code}
                  onChange={(v) => setReviewForm((p) => ({ ...p, course_code: v }))}
                  icon={<BookOpen size={12} />}
                />
                <FormField
                  label="Course Title"
                  placeholder="e.g. Advanced Physics"
                  value={reviewForm.course_title}
                  onChange={(v) => setReviewForm((p) => ({ ...p, course_title: v }))}
                  icon={<Award size={12} />}
                  className="sm:col-span-2"
                />
              </div>

              {/* Textarea */}
              <div className="mb-6">
                <label className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  <MessageSquareText size={10} /> Feedback Details
                </label>
                <textarea rows={4}
                  value={reviewForm.details}
                  onChange={(e) => setReviewForm((p) => ({ ...p, details: e.target.value }))}
                  placeholder="Share your detailed experience with this tutor…"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all resize-none"
                />
              </div>

              {/* Submit review */}
              <button onClick={handleReviewSubmit} disabled={isReviewing}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
                {isReviewing ? (
                  <><Loader2 size={15} className="animate-spin" /> Submitting…</>
                ) : (
                  <><Send size={15} /> Submit Review & Finish <ArrowRight size={14} /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Sub-components ─────────────────────── */
const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-slate-600 leading-none mb-0.5">{label}</p>
      <p className="text-xs font-semibold text-slate-300 truncate">{value}</p>
    </div>
  </div>
)

const FormField = ({
  label, placeholder, value, onChange, icon, className = ""
}: {
  label: string; placeholder: string; value: string
  onChange: (v: string) => void; icon: React.ReactNode; className?: string
}) => (
  <div className={className}>
    <label className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
      {icon} {label}
    </label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all" />
  </div>
)

export default Evaluation_Page