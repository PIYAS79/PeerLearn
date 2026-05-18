"use client";

import Tutor_Card from "@/components/UI/Tutor_Page/Card";
import { useGetAllPersonQuery } from "@/redux/api/personApi";
import { getFromLocalStorage } from "@/utils/local-storage";
import {
    Search,
    SlidersHorizontal,
    Users,
    X,
    Star,
    Sparkles,
    GraduationCap,
} from "lucide-react";
import { useState, useMemo } from "react";

const DEPARTMENTS = ["All", "CSE", "SWE", "CIS", "EEE", "ME", "CE", "BBA", "ENG"];

const RATING_OPTIONS = [
    { label: "All", value: 0 },
    { label: "4+", value: 4 },
    { label: "3+", value: 3 },
    { label: "2+", value: 2 },
];

const SORT_OPTIONS = [
    { label: "Newest", value: "newest" },
    { label: "Most Reviews", value: "most_reviews" },
    { label: "Top Rated", value: "top_rated" },
];

const Tutor_Page = () => {
    const my_id = getFromLocalStorage("person_id");
    const { data: persons, isLoading } = useGetAllPersonQuery({ page: 1, limit: 15 });

    const [searchMode, setSearchMode] = useState<"name" | "expertise">("name");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState("All");
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("newest");

    /* Rating out of 10: average of (human_rating + ai_rating)/2 per session */
    const getCombinedRating = (person: any): number => {
        const sessions = person?.as_target_user ?? [];
        const scored = sessions.filter(
            (s: any) => s.ai_rating !== null && s.human_rating !== undefined
        );
        // each session: (ai + human) / 2; fallback to whichever exists
        const sessionRatings = sessions
            .map((s: any) => {
                const ai = s.ai_rating;
                const human = s.human_rating ?? null;
                // if (ai !== null && human !== null) return (ai + human) / 2;
                // if (ai !== null) return ai;
                if (human !== null) return human;
                return null;
            })
            .filter((v: any) => v !== null);

        if (sessionRatings.length === 0) {
            // fallback: use as_review_target_user
            const reviews = person?.as_review_target_user ?? [];
            if (reviews.length === 0) return 0;
            const sum = reviews.reduce((s: number, r: any) => s + (r.human_rating ?? 0), 0);
            return (sum / reviews.length) * 2; // scale 5→10
        }
        const avg = sessionRatings.reduce((s: number, v: number) => s + v, 0) / sessionRatings.length;
        return avg * 2; // scale 5→10
    };

    const filtered = useMemo(() => {
        if (!persons) return [];
        let list = Array.isArray(persons) ? persons : (persons as any)?.data ?? [];

        list = list.filter((p: any) => p.id !== my_id);
        list = list.filter((p: any) => p.user.role !== "ADMIN" );
        list = list.filter((p: any) => p.user.role !== "SUPERADMIN" );

        const q = searchQuery.trim().toLowerCase();
        if (q) {
            list = list.filter((p: any) => {
                if (searchMode === "name") {
                    return `${p.first_name ?? ""} ${p.last_name ?? ""}`.toLowerCase().includes(q);
                }
                return (p.expertises ?? []).some((e: any) => e.topic?.toLowerCase().includes(q));
            });
        }

        if (selectedDept !== "All") {
            list = list.filter((p: any) => p.academicInfo?.department === selectedDept);
        }

        if (minRating > 0) {
            list = list.filter((p: any) => getCombinedRating(p) >= minRating);
        }

        if (sortBy === "newest") {
            list = [...list].sort((a: any, b: any) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
        } else if (sortBy === "most_reviews") {
            list = [...list].sort((a: any, b: any) =>
                (b.as_review_target_user?.length ?? 0) - (a.as_review_target_user?.length ?? 0)
            );
        } else if (sortBy === "top_rated") {
            list = [...list].sort((a: any, b: any) => getCombinedRating(b) - getCombinedRating(a));
        }

        return list;
    }, [persons, searchQuery, searchMode, selectedDept, minRating, sortBy, my_id]);

    const clearAll = () => {
        setSearchQuery("");
        setSelectedDept("All");
        setMinRating(0);
        setSortBy("newest");
    };

    const hasFilters = !!(searchQuery || selectedDept !== "All" || minRating > 0 || sortBy !== "newest");

    return (
        <div className="bg-slate-950 min-h-screen text-white mt-15">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* ── Header + Search inline ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="shrink-0">
                        <h1 className="text-xl font-bold tracking-tight text-white">Find a Tutor</h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {isLoading ? "Loading…" : `${filtered.length} tutor${filtered.length !== 1 ? "s" : ""} available`}
                        </p>
                    </div>

                    {/* Search + clear — right side */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {/* Search input with mode toggle */}
                        <div className="relative flex-1 sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={searchMode === "name" ? "Search by name…" : "Search by expertise…"}
                                className="w-full bg-slate-900 border border-white/8 rounded-xl py-2 pl-9 pr-36 text-xs outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                            />
                            {/* Clear button */}
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-[7.5rem] top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                            {/* Mode chips */}
                            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-slate-800 border border-white/6 rounded-lg p-0.5">
                                <button
                                    onClick={() => setSearchMode("name")}
                                    className={`flex items-center gap-0.5 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                                        searchMode === "name"
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-500 hover:text-slate-300"
                                    }`}
                                >
                                    <Users className="w-2 h-2" />
                                    Name
                                </button>
                                <button
                                    onClick={() => setSearchMode("expertise")}
                                    className={`flex items-center gap-0.5 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                                        searchMode === "expertise"
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-500 hover:text-slate-300"
                                    }`}
                                >
                                    <Sparkles className="w-2 h-2" />
                                    Skill
                                </button>
                            </div>
                        </div>

                        {hasFilters && (
                            <button
                                onClick={clearAll}
                                className="flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-bold text-red-400 border border-red-500/20 bg-red-500/8 hover:bg-red-500/15 transition-all shrink-0"
                            >
                                <X className="w-3 h-3" />
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Filter Row ── */}
                <div className="flex flex-col lg:flex-row gap-5 mb-7">

                    {/* Department */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Filter by Department
            </p>
          </div>
                        <div className="flex flex-wrap gap-1.5">
                            {DEPARTMENTS.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDept(dept)}
                                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all border ${
                                        selectedDept === dept
                                            ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                                            : "bg-white/4 border-white/8 text-slate-500 hover:text-white hover:bg-white/8"
                                    }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rating + Sort */}
                    <div className="flex gap-5 shrink-0 flex-wrap">
                        <div>
                            <div className="flex items-center gap-1.5 mb-2">
                                <Star className="w-3 h-3 text-slate-600" />
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Min Rating / 10</span>
                            </div>
                            <div className="flex gap-1.5">
                                {RATING_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setMinRating(opt.value)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all border ${
                                            minRating === opt.value
                                                ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                                                : "bg-white/4 border-white/8 text-slate-500 hover:text-white hover:bg-white/8"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-1.5 mb-2">
                                <SlidersHorizontal className="w-3 h-3 text-slate-600" />
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Sort By</span>
                            </div>
                            <div className="flex gap-1.5">
                                {SORT_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setSortBy(opt.value)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all border ${
                                            sortBy === opt.value
                                                ? "bg-violet-500/20 border-violet-500/40 text-violet-400"
                                                : "bg-white/4 border-white/8 text-slate-500 hover:text-white hover:bg-white/8"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Grid ── */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-56 rounded-2xl bg-white/3 border border-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-white/5 flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-slate-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-500">No tutors found</p>
                        <p className="text-xs text-slate-600 mt-1">Try adjusting your filters or search query</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((person: any) => (
                            <Tutor_Card key={person.id} teacher={person} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tutor_Page;