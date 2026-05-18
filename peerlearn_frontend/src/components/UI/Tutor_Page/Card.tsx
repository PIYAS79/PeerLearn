"use client";

import Image from "next/image";
import Link from "next/link";
import { Crown, Star, MessageSquare, GraduationCap, CalendarDays, ChevronRight, Zap } from "lucide-react";

type ExpertiseType = { topic: string; level: string };

type TutorType = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    photo_url: string | null;
    created_at: string;
    academicInfo: {
        department?: string;
        university?: string;
        level?: string;
        term?: string;
    } | null;
    expertises: ExpertiseType[];
    as_target_user: { ai_rating: number | null }[];
    as_review_target_user: { human_rating: number }[];
};

/* ── expertise level color ── */
const LEVEL_STYLE: Record<string, string> = {
    EXPERT:       "bg-amber-500/10 border-amber-500/20 text-amber-400",
    INTERMEDIATE: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    BEGINNER:     "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
};

/* ── join date format ── */
const formatJoinDate = (iso: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

/* ── star renderer ── */
const StarRow = ({ rating, count }: { rating: number; count: number }) => (
    <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className={`w-3 h-3 ${
                        s <= Math.round(rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-700 fill-slate-700"
                    }`}
                />
            ))}
        </div>
        <span className="text-[11px] font-bold text-amber-400">
            {rating > 0 ? rating.toFixed(1) : "—"}
        </span>
        <span className="text-[10px] text-slate-600 font-medium">
            ({count} review{count !== 1 ? "s" : ""})
        </span>
    </div>
);

const Tutor_Card = ({ teacher }: { teacher: TutorType }) => {
    /* ── compute ratings ── */
    const humanReviews = teacher.as_review_target_user ?? [];
    const humanRating =
        humanReviews.length > 0
            ? humanReviews.reduce((s, r) => s + (r.human_rating ?? 0), 0) / humanReviews.length
            : 0;

    const aiItems = (teacher.as_target_user ?? []).filter((r) => r.ai_rating !== null);
    const aiRating =
        aiItems.length > 0
            ? aiItems.reduce((s, r) => s + (r.ai_rating ?? 0), 0) / aiItems.length
            : 0;

    /* prefer human rating; fall back to AI */
    const displayRating = humanRating > 0 ? humanRating : aiRating;
    const reviewCount   = humanReviews.length;
    const isTopRated    = displayRating >= 4;
    const hasExpertises = teacher.expertises?.length > 0;

    return (
        <Link href={`/tutor/${teacher.email}`} className="block group">
            <div
                className={`relative bg-slate-900 border rounded-2xl p-5 transition-all duration-300 overflow-hidden
                    hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5
                    ${isTopRated
                        ? "border-amber-500/20 hover:border-amber-500/35"
                        : "border-white/6 hover:border-indigo-500/30"
                    }`}
            >
                {/* ── Top glow line on hover ── */}
                <div className={`absolute -top-px left-8 right-8 h-px transition-all duration-500 bg-gradient-to-r from-transparent to-transparent
                    ${isTopRated
                        ? "via-amber-500/0 group-hover:via-amber-500/50"
                        : "via-indigo-500/0 group-hover:via-indigo-500/40"
                    }`}
                />

                {/* ── Top Rated badge ── */}
                {isTopRated && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25">
                        <Crown className="w-2.5 h-2.5 text-amber-400" />
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">Top Rated</span>
                    </div>
                )}

                {/* ── Avatar + Info ── */}
                <div className="flex items-start gap-4 mb-4">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-300
                            ${isTopRated
                                ? "border-amber-500/30 group-hover:border-amber-500/60"
                                : "border-indigo-500/20 group-hover:border-indigo-500/50"
                            }`}
                        >
                            {teacher.photo_url ? (
                                <Image
                                    src={teacher.photo_url}
                                    alt={`${teacher.first_name} ${teacher.last_name}`}
                                    width={56}
                                    height={56}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500/30 to-violet-600/30 flex items-center justify-center">
                                    <span className="text-lg font-bold text-indigo-300">
                                        {(teacher.first_name?.[0] ?? "?").toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Active dot */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                    </div>

                    {/* Name + Dept */}
                    <div className="flex-1 min-w-0 pt-0.5">
                        {teacher.academicInfo?.department && (
                            <div className="flex items-center gap-1 mb-1">
                                <GraduationCap className="w-2.5 h-2.5 text-indigo-400/60 shrink-0" />
                                <span className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-widest truncate">
                                    {teacher.academicInfo.department}
                                    {teacher.academicInfo.level && ` · ${teacher.academicInfo.level}`}
                                    {teacher.academicInfo.term && ` ${teacher.academicInfo.term}`}
                                </span>
                            </div>
                        )}

                        <h3 className="text-base font-bold text-slate-100 leading-tight truncate group-hover:text-indigo-300 transition-colors">
                            {teacher.first_name} {teacher.last_name}
                        </h3>

                        {teacher.academicInfo?.university && (
                            <p className="text-[10px] text-slate-600 mt-0.5 truncate">
                                {teacher.academicInfo.university}
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="w-full h-px bg-white/4 mb-3" />

                {/* ── Rating ── */}
                <div className="flex items-center justify-between mb-3">
                    <StarRow rating={displayRating} count={reviewCount} />
                    {aiRating > 0 && humanRating === 0 && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-500/8 border border-blue-500/15">
                            <Zap className="w-2.5 h-2.5 text-blue-400" />
                            <span className="text-[9px] text-blue-400 font-semibold">AI Rated</span>
                        </div>
                    )}
                    {humanRating > 0 && (
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-slate-600" />
                            <span className="text-[10px] text-slate-600 font-medium">{reviewCount}</span>
                        </div>
                    )}
                </div>

                {/* ── Expertise Badges ── */}
                {hasExpertises && (
                    <div className="mb-3">
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">Expertise</p>
                        <div className="flex flex-wrap gap-1.5">
                            {teacher.expertises.slice(0, 4).map((e, i) => (
                                <span
                                    key={i}
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[9px] font-semibold uppercase tracking-wider ${
                                        LEVEL_STYLE[e.level] ?? "bg-slate-500/10 border-slate-500/20 text-slate-400"
                                    }`}
                                >
                                    {e.topic}
                                    <span className="opacity-50">·</span>
                                    <span className="opacity-60 normal-case tracking-normal font-medium">{e.level.charAt(0)}</span>
                                </span>
                            ))}
                            {teacher.expertises.length > 4 && (
                                <span className="px-2 py-0.5 rounded-lg border border-white/8 bg-white/4 text-[9px] text-slate-500 font-semibold">
                                    +{teacher.expertises.length - 4} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {!hasExpertises && (
                    <div className="mb-2 px-3 py-2 rounded-xl bg-white/3 border border-white/5">
                        <p className="text-[10px] text-slate-600 text-center">No expertise listed yet</p>
                    </div>
                )}

                {/* ── Join Date ── */}
                <div className="flex items-center gap-1.5 mb-2">
                    <CalendarDays className="w-3 h-3 text-slate-700" />
                    <span className="text-[10px] text-slate-600 font-medium">
                        Joined {formatJoinDate(teacher.created_at)}
                    </span>
                </div>

                {/* ── CTA Button ── */}
                <button
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn
                        ${isTopRated
                            ? "bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/40"
                            : "bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-indigo-500/20"
                        }`}
                >
                    View Profile
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </Link>
    );
};

export default Tutor_Card;