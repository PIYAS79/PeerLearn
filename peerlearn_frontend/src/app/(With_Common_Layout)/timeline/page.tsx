'use client';
import Timeline_Card from '@/components/UI/Timeline_Page/Card';
import useUserInfo from '@/hooks/userUserInfo';
import { useGetAllRequestQuery } from '@/redux/api/requestApi';
import { Request_Data_Type } from '@/types';
import {
  Plus,
  Search,
  GraduationCap,
  X,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { use, useState } from 'react';

const Timeline_Page = () => {
  const dd = useUserInfo();
  console.log(dd);
    const {data,isLoading} = useGetAllRequestQuery({});
    console.log(data);

  const categories = ['All', 'Physics', 'Mathematics', 'Computer Science', 'Biology', 'Chemistry', 'Engineering'];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreateModalOpen(false);
  }




  return (
    <div className='bg-slate-950 min-h-screen text-white'>
      {/* header */}
      <header className="navbar bg-base-100 shadow-sm px-10">
        <div className="flex items-center gap-3 mr-auto">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display">PeerLearn</span>
          </Link>
          <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />
          <h1 className="text-lg font-semibold text-slate-300 hidden md:block">Timeline</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search topics..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-indigo-500/50 transition-all text-sm"
              />
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 shrink-0"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline font-semibold text-sm">Create Post</span>
            </button>
          </div>



          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </header>
      <hr />
      {/* header */}

      {/* Modal start */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            onClick={() => {
              setIsCreateModalOpen(false);
            }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <div
            className="relative w-full max-w-lg custom-glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10"
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
              Create New Request
            </h2>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Topic / Subject</label>
                <input
                  name="topic"
                  required
                  placeholder="e.g. Linear Algebra - Eigenvectors"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Category</label>
                <select
                  name="category"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-200 text-sm"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Image URL (Optional)</label>
                <input
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Explain what you're struggling with..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 resize-none text-sm"
                />
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 mt-2">
                Post Request
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Model end */}
      {/* filter line */}
      <div className="max-w-7xl mx-auto px-0 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedCategory === cat
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/tutor"
              className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-xl text-xs font-bold transition-all border border-indigo-500/20 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Find Tutor
            </Link>
          </div>
        </div>
        {/* Filter Line end */}
        {/* Card Grid Start Here */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data?.map((one: Request_Data_Type) => (
              <Timeline_Card key={one.id}  props={one}/>
            ))
          )}
        </div>
        {/* Card Grid End Here */}
      </div>
    </div>
  )
}

export default Timeline_Page