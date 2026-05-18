"use client"

import { useGetAllReviewAsReqMakerQuery, useGetAllReviewAsTargetUserQuery, useUpdateReviewMutation, useDeleteReviewMutation } from "@/redux/api/reviewApi"
import { getFromLocalStorage } from "@/utils/local-storage"
import {
  Award,
  BookOpen,
  MessageSquareText,
  Sparkles,
  Star,
  User2,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Users,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type Update_Review_Type = {
  details?: string
  course_title?: string,
  course_code?: string
  topic?: string
}

const Review_Page = () => {
  const my_id = getFromLocalStorage("person_id")

  const { data: sentReviewsRaw, isLoading: isSentLoading } = useGetAllReviewAsReqMakerQuery({ req_maker_id: my_id })
  const { data: earnedReviewsRaw, isLoading: isEarnedLoading } = useGetAllReviewAsTargetUserQuery({ target_user_id: my_id })

  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation()
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation()

  const [editingReview, setEditingReview] = useState<any>(null)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [formData, setFormData] = useState<Update_Review_Type>({})
  const [activeTab, setActiveTab] = useState<"sent" | "earned">("sent")

  const openEditModal = (review: any) => {
    setEditingReview(review)
    setFormData({
      details: review.details,
      course_title: review.course_title,
      course_code: review.course_code,
      topic: review.topic,
    })
  }

  const closeEditModal = () => {
    setEditingReview(null)
    setFormData({})
  }

  const handleUpdate = async () => {
    if (!editingReview) return
    try {
      await updateReview({ review_id: editingReview.id, data: formData }).unwrap()
      closeEditModal()
    } catch (err) {
      console.error("Update failed", err)
    }
  }

  const handleDelete = async (review_id: string) => {
    try {
      await deleteReview(review_id).unwrap()
      setDeleteTarget(null)
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "EXCELLENT": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      case "GOOD": return "bg-blue-500/10 text-blue-400 border border-blue-500/20"
      case "AVERAGE": return "bg-amber-500/10 text-amber-400 border border-amber-500/20"
      default: return "bg-red-500/10 text-red-400 border border-red-500/20"
    }
  }

  const ReviewCard = ({ review, type }: { review: any; type: "sent" | "earned" }) => {
    const person =
      type === "sent"
        ? review?.request?.target_user
        : review?.request?.request_maker

    return (
      <div className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-200">
        {/* Top Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {person?.photo_url ? (
              <Image
                src={person?.photo_url}
                alt="user"
                width={40}
                height={40}
                className="rounded-xl object-cover border border-white/10"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                <User2 size={18} />
              </div>
            )}
            <div>
              <h4 className="text-sm font-bold text-white leading-none">
                {person?.first_name} {person?.last_name}
              </h4>
              <p className="text-[10px] text-slate-500 mt-1">{person?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Rating badge */}
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-400">{review?.human_rating}</span>
            </div>

            {/* Action buttons — only for sent (req_maker) */}
            {type === "sent" && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(review)}
                  className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 flex items-center justify-center transition-all"
                  title="Edit review"
                >
                  <Pencil size={12} />
                </button>
                <button
                  onClick={() => setDeleteTarget(review.id)}
                  className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-all"
                  title="Delete review"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-slate-400 text-[10px] font-medium border border-white/5">
            <BookOpen size={10} />
            {review?.course_code}
          </span>
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-[10px] font-medium border border-indigo-500/20">
            <Sparkles size={10} />
            {review?.topic}
          </span>
          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${getCategoryStyle(review?.teaching_category)}`}>
            {review?.teaching_category}
          </span>
        </div>

        {/* Feedback */}
        <div className="mt-3">
          <div className="flex items-center gap-1 text-slate-500 mb-1">
            <MessageSquareText size={12} />
            <span className="text-[10px] font-medium uppercase tracking-wide">Feedback</span>
          </div>
          <p className="text-[12px] leading-relaxed text-slate-400 line-clamp-2">{review?.details}</p>
        </div>

        {/* Bottom Row */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-600">Course</p>
            <p className="text-xs font-semibold text-slate-300">{review?.course_title}</p>
          </div>
          <div className="flex items-center gap-1 text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-lg">
            <Award size={11} />
            <span className="text-[10px] font-bold">AI {review?.ai_rating}/5</span>
          </div>
        </div>
      </div>
    )
  }

  const isLoading = isSentLoading || isEarnedLoading

  return (
    <div className="max-w-6xl mx-auto p-10">

      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <MessageSquareText className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold">Reviews</h3>
      </div>

      {/* Mobile Tab Toggle */}
      <div className="flex md:hidden mb-4 custom-glass rounded-2xl p-1 border border-white/5">
        <button
          onClick={() => setActiveTab("sent")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === "sent" ? "bg-indigo-500/20 text-indigo-400" : "text-slate-500"
          }`}
        >
          <GraduationCap size={14} /> Sent
        </button>
        <button
          onClick={() => setActiveTab("earned")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === "earned" ? "bg-purple-500/20 text-purple-400" : "text-slate-500"
          }`}
        >
          <Users size={14} /> Earned
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Sent Reviews */}
        <div className={`custom-glass rounded-3xl p-6 border border-white/5 ${activeTab !== "sent" ? "hidden md:block" : ""}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sent as Student</p>
              <p className="text-sm text-slate-400 mt-0.5">Reviews you gave to teachers</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
              {sentReviewsRaw?.length ?? 0}
            </span>
          </div>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {isSentLoading ? (
              <p className="text-center text-slate-600 text-sm py-8">Loading...</p>
            ) : sentReviewsRaw && sentReviewsRaw?.length > 0 ? (
              sentReviewsRaw.map((review: any) => (
                <ReviewCard key={review.id} review={review} type="sent" />
              ))
            ) : (
              <p className="text-center text-slate-600 text-sm py-8">No reviews sent yet.</p>
            )}
          </div>
        </div>

        {/* Earned Reviews */}
        <div className={`custom-glass rounded-3xl p-6 border border-white/5 ${activeTab !== "earned" ? "hidden md:block" : ""}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Received as Tutor</p>
              <p className="text-sm text-slate-400 mt-0.5">Feedback from your students</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
              {earnedReviewsRaw?.length ?? 0}
            </span>
          </div>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {isEarnedLoading ? (
              <p className="text-center text-slate-600 text-sm py-8">Loading...</p>
            ) : earnedReviewsRaw && earnedReviewsRaw?.length > 0 ? (
              earnedReviewsRaw.map((review: any) => (
                <ReviewCard key={review.id} review={review} type="earned" />
              ))
            ) : (
              <p className="text-center text-slate-600 text-sm py-8">No earned reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeEditModal}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md custom-glass rounded-3xl border border-white/10 p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center">
                  <Pencil size={14} className="text-indigo-400" />
                </div>
                <h3 className="text-base font-bold text-white">Edit Review</h3>
              </div>
              <button
                onClick={closeEditModal}
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-all"
              >
                <X size={14} />
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Topic</label>
                <input
                  type="text"
                  value={formData.topic ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, topic: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                  placeholder="e.g. Quantum Mechanics"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Course Code</label>
                <input
                  type="text"
                  value={formData.course_code ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, course_code: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                  placeholder="e.g. PHY-301"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Course Title</label>
                <input
                  type="text"
                  value={formData.course_title ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, course_title: e.target.value as string }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                  placeholder="e.g. Advanced Physics"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Feedback Details</label>
                <textarea
                  rows={4}
                  value={formData.details ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, details: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all resize-none"
                  placeholder="Share your experience..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={closeEditModal}
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-1 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-sm font-bold text-indigo-400 hover:bg-indigo-500/30 hover:text-indigo-300 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isUpdating ? (
                  "Saving..."
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteTarget(null)}
          />
          <div className="relative w-full max-w-sm custom-glass rounded-3xl border border-white/10 p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Delete Review?</h3>
            <p className="text-sm text-slate-500 mb-6">This action cannot be undone.</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-sm font-bold text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review_Page