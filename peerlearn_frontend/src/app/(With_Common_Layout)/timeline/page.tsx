'use client';
import Timeline_Card from '@/components/UI/Timeline_Page/Card';
import { useCreateRequestMutation, useGetAllRequestQuery } from '@/redux/api/requestApi';
import { Request_Data_Type } from '@/types';
import { getFromLocalStorage } from '@/utils/local-storage';
import {
  Plus,
  Search,
  Users,
  X,
  BookOpen,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

const DEPARTMENTS = ['All', 'CSE', 'SWE', 'CIS', 'EEE', 'ME', 'CE', 'BBA', 'ENG'];

const Timeline_Page = () => {
  const { data, isLoading } = useGetAllRequestQuery({});
  const [createRequest] = useCreateRequestMutation();

  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newRequest, setNewRequest] = useState({
    title: '',
    message: '',
    req_maker_id: '',
    is_urgent: false,
  });

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newRequest.req_maker_id = getFromLocalStorage('person_id') || '';
    await createRequest(newRequest);
    setIsCreateModalOpen(false);
    setNewRequest({ title: '', message: '', req_maker_id: '', is_urgent: false });
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data
      .filter((one: Request_Data_Type) => one.target_user_id === null)
      .filter((one: Request_Data_Type) => {
        if (selectedDept === 'All') return true;
        return one.req_maker?.academicInfo?.department === selectedDept;
      })
      .filter((one: Request_Data_Type) => {
        if (!searchQuery.trim()) return true;
        return one.title?.toLowerCase().includes(searchQuery.toLowerCase());
      });
  }, [data, selectedDept, searchQuery]);

  return (
    <div className="bg-slate-950 min-h-screen text-white mt-15">

      {/* ── Create Modal ── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            onClick={() => setIsCreateModalOpen(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60"
          >
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-indigo-400" />
              </div>
              <h2 className="text-lg font-bold tracking-tight">New Study Request</h2>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Topic / Title
                </label>
                <input
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  value={newRequest.title}
                  required
                  placeholder="e.g. Linear Algebra — Eigenvectors"
                  className="w-full bg-slate-800/60 border border-white/8 rounded-2xl py-3 px-4 text-sm outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Description
                </label>
                <textarea
                  onChange={(e) => setNewRequest({ ...newRequest, message: e.target.value })}
                  value={newRequest.message}
                  required
                  rows={4}
                  placeholder="Explain what you're struggling with..."
                  className="w-full bg-slate-800/60 border border-white/8 rounded-2xl py-3 px-4 text-sm outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 resize-none"
                />
              </div>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 cursor-pointer hover:bg-white/5 transition-all group">
                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${newRequest.is_urgent ? 'bg-amber-500 border-amber-400' : 'border-white/20 bg-white/5'}`}>
                  {newRequest.is_urgent && <div className="w-2 h-2 rounded-sm bg-white" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={newRequest.is_urgent}
                  onChange={(e) => setNewRequest({ ...newRequest, is_urgent: e.target.checked })}
                />
                <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-300 transition-colors">
                  Mark as urgent
                </span>
                <span className="ml-auto text-[10px] font-bold text-amber-500/70 uppercase tracking-wider">Priority</span>
              </label>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 mt-1"
              >
                Post Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Page Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="shrink-0">
            <h1 className="text-xl font-bold tracking-tight">Requests Timeline</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {filteredData.length} request{filteredData.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Search + Find Tutor + Create — all inline on the right */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title..."
                className="w-full bg-slate-900 border border-white/8 rounded-xl py-2 pl-9 pr-7 text-xs outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <Link
              href="/tutor"
              className="px-3 py-2 bg-white/5 hover:bg-white/8 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-white/8 flex items-center gap-1.5 shrink-0"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Find Tutor</span>
            </Link>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-500/20 text-xs font-bold shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Create</span>
            </button>
          </div>
        </div>

        {/* Department Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Filter by Department
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all border ${
                  selectedDept === dept
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white/4 border-white/8 text-slate-500 hover:text-white hover:bg-white/8'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-52 rounded-2xl bg-white/3 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-white/5 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-slate-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500">No requests found</p>
            <p className="text-xs text-slate-600 mt-1">Try adjusting your search or department filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((one: Request_Data_Type) => (
              <Timeline_Card key={one.id} props={one} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline_Page;