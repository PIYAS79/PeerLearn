'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  ArrowLeft, 
  Star, 
  Zap, 
  CheckCircle2, 
  BookOpen, 
  MessageSquare, 
  Calendar,
  X,
  Clock,
  Award,
  Users
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { MOCK_TUTORS } from '@/constants/initial';


interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Alex Chen',
    userAvatar: 'https://picsum.photos/seed/alex/100/100',
    rating: 5,
    comment: 'Absolutely amazing! Helped me understand Red-Black trees in just 30 minutes. Highly recommended.',
    date: '2 days ago'
  },
  {
    id: 'r2',
    userName: 'Sarah Miller',
    userAvatar: 'https://picsum.photos/seed/sarah/100/100',
    rating: 4.5,
    comment: 'Very patient and clear. The session was very productive.',
    date: '1 week ago'
  }
];

export default function Tutor_Profile_Page() {
  const params = useParams();
  const tutorId = params.id as string;
  const tutor = MOCK_TUTORS.find(t => t.id === tutorId) || MOCK_TUTORS[0];
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 pb-20">

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Profile Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="custom-glass rounded-[2.5rem] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[60px] -z-10" />
              
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-white/10 relative shadow-2xl">
                  <Image 
                    src={tutor.avatar} 
                    alt={tutor.name} 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-slate-950 ${tutor.isOnline ? 'bg-green-500' : 'bg-slate-500'} shadow-lg`} />
              </div>

              <h1 className="text-3xl font-bold mb-2">{tutor.name}</h1>
              <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-1">{tutor.major}</p>
              <p className="text-slate-400 text-xs font-medium mb-4">{tutor.year}</p>
              
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10 mb-6">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-300">{tutor.institute}</span>
              </div>

              <div className="space-y-4 text-left">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.expertise.map((exp, i) => (
                    <span key={i} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs font-bold text-indigo-400">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="custom-glass rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-bold text-slate-200">{tutor.rating} Rating</span>
                </div>
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  View Reviews
                </button>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4" />
                <span className="text-sm font-bold text-slate-200">{tutor.reviewsCount} Sessions Done</span>
              </div>
            </div>
          </div>

          {/* Right Side: Details & Action */}
          <div className="lg:col-span-8 space-y-8">
            <div className="custom-glass rounded-[2.5rem] p-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-indigo-400" />
                About Me
              </h2>
              <p className="text-slate-400 leading-relaxed mb-10 text-lg">
                {tutor.bio}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                    <Clock className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="font-bold mb-2">Availability</h3>
                  <p className="text-sm text-slate-400">Mon - Fri: 6 PM - 10 PM<br />Weekends: Flexible</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-bold mb-2">Response Time</h3>
                  <p className="text-sm text-slate-400">Usually responds within 15 minutes during active hours.</p>
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group">
                <Zap className="w-6 h-6 group-hover:scale-125 transition-transform" />
                Request a Session Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10 max-h-[80vh] overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">Student Reviews</h2>
                <div className="flex items-center justify-center gap-2 text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-xl font-bold text-slate-100">{tutor.rating}</span>
                  <span className="text-sm text-slate-500">based on {tutor.reviewsCount} reviews</span>
                </div>
              </div>

              <div className="space-y-6">
                {[...MOCK_REVIEWS, ...MOCK_REVIEWS].map((review, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10">
                          <Image src={review.userAvatar} alt={review.userName} fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold">{review.userName}</h4>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed italic">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
