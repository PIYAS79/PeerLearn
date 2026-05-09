'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  useUpdateExpertiseMutation,
  useCreateExpertiseMutation,
  useDeleteExpertiseMutation,
} from '@/redux/api/expertiseApi';
import { useUpdateAcademicInfoMutation } from '@/redux/api/academicApi';

import {
  Camera,
  Save,
  User,
  Wallet,
  ImageIcon,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  Pencil,
  X,
  BookOpen,
  Code2,
  Tag,
  BarChart2,
} from 'lucide-react';

import {
  useGetMeQuery,
  useUpdateMeMutation,
} from '@/redux/api/personApi';

import { getFromLocalStorage } from '@/utils/local-storage';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { get_User_Info } from '@/services/auth.services';

// =============================================
// TYPES
// =============================================

type ExpertiseItem = {
  id: string;
  course_title: string;
  course_code: string;
  topic: string;
  level: string;
};

type ActiveSection = 'profile' | 'academic' | 'expertise';

// =============================================
// EMPTY EXPERTISE TEMPLATE
// =============================================

const emptyExpertise: Omit<ExpertiseItem, 'id'> = {
  course_title: 'OS',
  course_code: '',
  topic: '',
  level: 'BEGINNER',
};

// =============================================
// LEVEL BADGE COLORS
// =============================================

const levelColor: Record<string, string> = {
  BEGINNER:
    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  EXPERT:
    'bg-violet-500/10 text-violet-400 border border-violet-500/20',
};

// =============================================
// MAIN COMPONENT
// =============================================

const Setting_Page = () => {
  const [loading, setLoading] = useState(false);

  const [updateMe] = useUpdateMeMutation();
  const [updateAcademicInfo] = useUpdateAcademicInfoMutation();
  const [updateExpertise] = useUpdateExpertiseMutation();
  const [createExpertise] = useCreateExpertiseMutation();
  const [deleteExpertise] = useDeleteExpertiseMutation();

  const my_id = getFromLocalStorage('person_id');
  const user = get_User_Info();
  const user_email = (user as { email?: string } | null)?.email || '';
  const router = useRouter();

  // =========================================
  // ACTIVE SECTION
  // =========================================

  const [activeSection, setActiveSection] = useState<ActiveSection>('profile');

  // =========================================
  // GET PROFILE DATA
  // =========================================

  const { data: profileData } = useGetMeQuery({ email: user_email });

  // =========================================
  // PROFILE FORM
  // =========================================

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    photo_url: '',
    bkash: '',
  });

  // =========================================
  // ACADEMIC FORM
  // =========================================

  const [academicData, setAcademicData] = useState({
    person_id: '',
    student_id: '',
    university: '',
    department: 'CSE',
    level: 'L1',
    term: 'T1',
  });

  // =========================================
  // EXPERTISE STATE
  // =========================================

  // List of existing expertises from server
  const [expertiseList, setExpertiseList] = useState<ExpertiseItem[]>([]);

  // New expertise form (for creating)
  const [newExpertise, setNewExpertise] = useState<Omit<ExpertiseItem, 'id'>>({
    ...emptyExpertise,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  // Edit modal
  const [editingExpertise, setEditingExpertise] = useState<ExpertiseItem | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Delete confirm
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // =========================================
  // DEFAULT VALUES
  // =========================================

  useEffect(() => {
    if (profileData) {
      setFormData({
        first_name: profileData?.first_name || '',
        last_name: profileData?.last_name || '',
        photo_url: profileData?.photo_url || '',
        bkash: profileData?.bkash || '',
      });

      if (profileData?.academicInfo) {
        setAcademicData({
          person_id: (my_id as string) || '',
          student_id: profileData?.academicInfo?.student_id || '',
          university: profileData?.academicInfo?.university || '',
          department: profileData?.academicInfo?.department || 'CSE',
          level: profileData?.academicInfo?.level || 'L1',
          term: profileData?.academicInfo?.term || 'T1',
        });
      }

      if (profileData?.expertises && profileData?.expertises?.length > 0) {
        setExpertiseList(profileData.expertises);
      }
    }
  }, [profileData]);

  // =========================================
  // PROFILE HANDLERS
  // =========================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =========================================
  // ACADEMIC HANDLERS
  // =========================================

  const handleAcademicChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAcademicData({ ...academicData, [e.target.name]: e.target.value });
  };

  // =========================================
  // DYNAMIC TITLE
  // =========================================

  const renderTitle = () => {
    if (activeSection === 'profile')
      return {
        title: 'Profile Settings',
        desc: 'Update your personal information and payment details.',
      };
    if (activeSection === 'academic')
      return {
        title: 'Academic Information',
        desc: 'Manage your academic background and education details.',
      };
    return {
      title: 'Expertise Settings',
      desc: 'Manage your teaching expertise and specialized subjects.',
    };
  };

  // =========================================
  // PROFILE & ACADEMIC SUBMIT
  // =========================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (activeSection === 'profile') {
        await updateMe({ id: my_id, data: { ...formData } });
        toast.success('Profile updated successfully!');
        router.push('/dashboard/profile');
      }

      if (activeSection === 'academic') {
        if (!my_id) {
          toast.error('User ID not found. Please log in again.');
          router.push('/login');
          return;
        }
        academicData.person_id = my_id as string;
        await updateAcademicInfo({ id: my_id, data: { ...academicData } });
        toast.success('Academic info updated successfully!');
        router.push('/dashboard/profile');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // CREATE EXPERTISE
  // =========================================

  const handleCreateExpertise = async () => {
    if (!newExpertise.course_code.trim()) {
      toast.error('Course code is required.');
      return;
    }
    try {
      setAddLoading(true);
      const res: any = await createExpertise({
        data: { person_id: my_id, ...newExpertise },
      });
      if (res?.data) {
        setExpertiseList((prev) => [...prev, res.data]);
        toast.success('Expertise added!');
        router.push('/dashboard/profile');
        setNewExpertise({ ...emptyExpertise });
        setShowAddForm(false);
      }
    } catch (err) {
      toast.error('Failed to add expertise.');
    } finally {
      setAddLoading(false);
    }
  };

  // =========================================
  // UPDATE EXPERTISE (MODAL SAVE)
  // =========================================

  const handleUpdateExpertise = async () => {
    if (!editingExpertise) return;
    try {
      setEditLoading(true);
      await updateExpertise({
        id: editingExpertise.id,
        data: {
          course_title: editingExpertise.course_title,
          course_code: editingExpertise.course_code,
          topic: editingExpertise.topic,
          level: editingExpertise.level,
        },
      });
      setExpertiseList((prev) =>
        prev.map((item) =>
          item.id === editingExpertise.id ? editingExpertise : item
        )
      );
      toast.success('Expertise updated!');
      router.push('/dashboard/profile');
      setEditingExpertise(null);
    } catch (err) {
      toast.error('Failed to update expertise.');
    } finally {
      setEditLoading(false);
    }
  };

  // =========================================
  // DELETE EXPERTISE
  // =========================================

  const handleDeleteExpertise = async (id: string) => {
    try {
      setDeleteLoading(true);
      await deleteExpertise({ id });
      setExpertiseList((prev) => prev.filter((item) => item.id !== id));
      toast.success('Expertise deleted.');
      router.push('/dashboard/profile');
      setDeletingId(null);
    } catch (err) {
      toast.error('Failed to delete expertise.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden px-4 py-10">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white">{renderTitle().title}</h1>
          <p className="text-slate-400 mt-2">{renderTitle().desc}</p>
        </div>

        {/* CARD */}
        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">

          {/* TOP BANNER */}
          <div className="h-44 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 relative">
            <div className="absolute -bottom-16 left-10 right-10 flex items-end justify-between gap-6 flex-wrap">

              {/* AVATAR */}
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-[#020617] bg-slate-900 shadow-2xl">
                  {formData.photo_url ? (
                    <Image
                      src={formData.photo_url}
                      alt="Profile"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <User className="w-14 h-14 text-slate-500" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* NAV BUTTONS */}
              <div className="flex flex-wrap gap-3">
                {activeSection !== 'profile' && (
                  <button
                    type="button"
                    onClick={() => setActiveSection('profile')}
                    className="h-12 px-5 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition-all flex items-center gap-2"
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>
                )}
                {activeSection !== 'academic' && (
                  <button
                    type="button"
                    onClick={() => setActiveSection('academic')}
                    className="h-12 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    <GraduationCap className="w-4 h-4" /> Academic Info
                  </button>
                )}
                {activeSection !== 'expertise' && (
                  <button
                    type="button"
                    onClick={() => setActiveSection('expertise')}
                    className="h-12 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 transition-all text-white font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/20"
                  >
                    <Sparkles className="w-4 h-4" /> Expertise
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="pt-28 p-8">

            {/* ============================================================ */}
            {/* PROFILE & ACADEMIC — share one form with a Save button        */}
            {/* ============================================================ */}

            {(activeSection === 'profile' || activeSection === 'academic') && (
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* PROFILE FIELDS */}
                {activeSection === 'profile' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-semibold text-slate-300 mb-3 block">First Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input
                            type="text" name="first_name" value={formData.first_name}
                            onChange={handleChange} placeholder="Enter first name"
                            className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 pl-12 pr-4 text-white outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-300 mb-3 block">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input
                            type="text" name="last_name" value={formData.last_name}
                            onChange={handleChange} placeholder="Enter last name"
                            className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 pl-12 pr-4 text-white outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-300 mb-3 block">Profile Photo URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          type="text" name="photo_url" value={formData.photo_url}
                          onChange={handleChange} placeholder="https://example.com/photo.jpg"
                          className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 pl-12 pr-4 text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-300 mb-3 block">bKash Number</label>
                      <div className="relative">
                        <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          type="text" name="bkash" value={formData.bkash}
                          onChange={handleChange} placeholder="01XXXXXXXXX"
                          className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 pl-12 pr-4 text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* ACADEMIC FIELDS */}
                {activeSection === 'academic' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="student_id" value={academicData.student_id}
                      onChange={handleAcademicChange} placeholder="Student ID"
                      className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 px-5 text-white outline-none focus:border-indigo-500"
                    />
                    <input type="text" name="university" value={academicData.university}
                      onChange={handleAcademicChange} placeholder="University"
                      className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 px-5 text-white outline-none focus:border-indigo-500"
                    />
                    <select name="department" value={academicData.department}
                      onChange={handleAcademicChange}
                      className="w-full h-14 rounded-2xl bg-[#0f172a] border border-white/10 px-5 text-white outline-none focus:border-indigo-500"
                    >
                      <option value="CSE">CSE</option>
                      <option value="CIS">CIS</option>
                      <option value="SWE">SWE</option>
                      <option value="EEE">EEE</option>
                      <option value="MCT">MCT</option>
                      <option value="ESDM">ESDM</option>
                      <option value="PHRM">PHRM</option>
                      <option value="TEX">TEX</option>
                    </select>
                    <select name="level" value={academicData.level}
                      onChange={handleAcademicChange}
                      className="w-full h-14 rounded-2xl bg-[#0f172a] border border-white/10 px-5 text-white outline-none focus:border-indigo-500"
                    >
                      <option value="L1">L1</option>
                      <option value="L2">L2</option>
                      <option value="L3">L3</option>
                      <option value="L4">L4</option>
                    </select>
                    <select name="term" value={academicData.term}
                      onChange={handleAcademicChange}
                      className="w-full h-14 rounded-2xl bg-[#0f172a] border border-white/10 px-5 text-white outline-none focus:border-indigo-500"
                    >
                      <option value="T1">T1</option>
                      <option value="T2">T2</option>
                      <option value="T3">T3</option>
                    </select>
                  </div>
                )}

                {/* SAVE BUTTON */}
                <button
                  type="submit" disabled={loading}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all text-white font-bold text-base shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </form>
            )}

            {/* ============================================================ */}
            {/* EXPERTISE SECTION — no form submit, individual actions        */}
            {/* ============================================================ */}

            {activeSection === 'expertise' && (
              <div className="space-y-6">

                {/* ── EXISTING EXPERTISE CARDS ── */}
                {expertiseList?.length > 0 ? (
                  <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                      Your Expertises
                    </h2>
                    {expertiseList?.map((item) => {
                      return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
                      >
                        {/* INFO */}
                        <div className="flex flex-wrap items-center gap-3 min-w-0">
                          <span className="text-white font-bold text-sm truncate">
                            {item.course_title}
                          </span>
                          <span className="text-slate-400 text-xs font-mono bg-white/5 px-2 py-0.5 rounded-lg">
                            {item.course_code || '—'}
                          </span>
                          {item.topic && (
                            <span className="text-slate-300 text-xs truncate max-w-[180px]">
                              {item.topic}
                            </span>
                          )}
                          <span
                            className={`text-xs font-semibold px-3 py-0.5 rounded-full ${levelColor[item.level] ?? 'bg-white/5 text-slate-400'}`}
                          >
                            {item.level}
                          </span>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setEditingExpertise({ ...item })}
                            className="w-9 h-9 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 transition-all flex items-center justify-center text-indigo-400"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingId(item.id)}
                            className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all flex items-center justify-center text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-500 text-sm">
                    No expertises yet. Add your first one below.
                  </div>
                )}

                {/* ── ADD NEW EXPERTISE ── */}
                {!showAddForm ? (
                  <button
                    type="button"
                    onClick={() => setShowAddForm(true)}
                    className="w-full h-14 rounded-2xl border border-dashed border-purple-500/40 hover:border-purple-500 hover:bg-purple-500/5 transition-all text-purple-400 font-semibold flex items-center justify-center gap-3"
                  >
                    <Plus className="w-5 h-5" /> Add New Expertise
                  </button>
                ) : (
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-purple-500/20 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" /> New Expertise
                      </h3>
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setNewExpertise({ ...emptyExpertise }); }}
                        className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Course Title */}
                      <div>
                        <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> Course Title
                        </label>
                        <select
                          value={newExpertise.course_title}
                          onChange={(e) => setNewExpertise({ ...newExpertise, course_title: e.target.value })}
                          className="w-full h-12 rounded-2xl bg-[#0f172a] border border-white/10 px-4 text-white outline-none focus:border-purple-500 text-sm"
                        >
                          <option value="OS">OS</option>
                          <option value="DMML">DMML</option>
                          <option value="MAD">MAD</option>
                          <option value="AI">AI</option>
                          <option value="WEB_ENGINEERING">WEB_ENGINEERING</option>
                        </select>
                      </div>

                      {/* Course Code */}
                      <div>
                        <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5" /> Course Code
                        </label>
                        <input
                          type="text"
                          value={newExpertise.course_code}
                          onChange={(e) => setNewExpertise({ ...newExpertise, course_code: e.target.value })}
                          placeholder="e.g. CSE421"
                          className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/10 px-4 text-white outline-none focus:border-purple-500 text-sm"
                        />
                      </div>

                      {/* Topic */}
                      <div>
                        <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" /> Topic
                        </label>
                        <input
                          type="text"
                          value={newExpertise.topic}
                          onChange={(e) => setNewExpertise({ ...newExpertise, topic: e.target.value })}
                          placeholder="e.g. Bash Programming"
                          className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/10 px-4 text-white outline-none focus:border-purple-500 text-sm"
                        />
                      </div>

                      {/* Level */}
                      <div>
                        <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                          <BarChart2 className="w-3.5 h-3.5" /> Level
                        </label>
                        <select
                          value={newExpertise.level}
                          onChange={(e) => setNewExpertise({ ...newExpertise, level: e.target.value })}
                          className="w-full h-12 rounded-2xl bg-[#0f172a] border border-white/10 px-4 text-white outline-none focus:border-purple-500 text-sm"
                        >
                          <option value="BEGINNER">BEGINNER</option>
                          <option value="EXPERT">EXPERT</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCreateExpertise}
                      disabled={addLoading}
                      className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-all text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                    >
                      <Plus className="w-4 h-4" />
                      {addLoading ? 'Adding...' : 'Add Expertise'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* EDIT MODAL                                                    */}
      {/* ============================================================ */}

      {editingExpertise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setEditingExpertise(null)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg bg-[#0c1120] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Pencil className="w-5 h-5 text-indigo-400" /> Edit Expertise
              </h2>
              <button
                type="button"
                onClick={() => setEditingExpertise(null)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 gap-5">

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Course Title
                </label>
                <select
                  value={editingExpertise.course_title}
                  onChange={(e) => setEditingExpertise({ ...editingExpertise, course_title: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-[#0f172a] border border-white/10 px-4 text-white outline-none focus:border-indigo-500 text-sm"
                >
                  <option value="OS">OS</option>
                  <option value="DMML">DMML</option>
                  <option value="MAD">MAD</option>
                  <option value="AI">AI</option>
                  <option value="WEB_ENGINEERING">WEB_ENGINEERING</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" /> Course Code
                </label>
                <input
                  type="text"
                  value={editingExpertise.course_code}
                  onChange={(e) => setEditingExpertise({ ...editingExpertise, course_code: e.target.value })}
                  placeholder="e.g. CSE421"
                  className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/10 px-4 text-white outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Topic
                </label>
                <input
                  type="text"
                  value={editingExpertise.topic}
                  onChange={(e) => setEditingExpertise({ ...editingExpertise, topic: e.target.value })}
                  placeholder="e.g. Bash Programming"
                  className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/10 px-4 text-white outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5" /> Level
                </label>
                <select
                  value={editingExpertise.level}
                  onChange={(e) => setEditingExpertise({ ...editingExpertise, level: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-[#0f172a] border border-white/10 px-4 text-white outline-none focus:border-indigo-500 text-sm"
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="EXPERT">EXPERT</option>
                </select>
              </div>
            </div>

            {/* Save */}
            <button
              type="button"
              onClick={handleUpdateExpertise}
              disabled={editLoading}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Save className="w-4 h-4" />
              {editLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE CONFIRM MODAL                                          */}
      {/* ============================================================ */}

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeletingId(null)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-sm bg-[#0c1120] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Delete Expertise?</h3>
              <p className="text-slate-400 text-sm mt-2">
                This action cannot be undone. The expertise entry will be permanently removed.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 h-12 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteExpertise(deletingId)}
                disabled={deleteLoading}
                className="flex-1 h-12 rounded-2xl bg-red-600 hover:bg-red-500 transition-all text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting_Page;