"use client"
import { useGetMeQuery } from '@/redux/api/personApi'
import { get_User_Info } from '@/services/auth.services'
import { setToLocalStorage } from '@/utils/local-storage'
import { GraduationCap, Building2, BookOpen, Hash, Layers } from 'lucide-react'
import Right_Col from '@/components/UI/Profile_Page/Right_Col'
import Image from 'next/image'

const Profile_Page = () => {
  const user = get_User_Info()
  const user_info = get_User_Info()
  const user_email = (user as { email?: string } | null)?.email || ''
  const { data, isLoading } = useGetMeQuery({ email: user_email })

  if (data?.id) {
    setToLocalStorage('person_id', data.id)
  }

  const role = (user_info as any)?.role || 'STUDENT'

  const roleMeta: Record<string, { label: string; color: string; bg: string; border: string }> = {
    TUTOR:   { label: 'Tutor',   color: 'text-indigo-300', bg: 'bg-indigo-500/20', border: 'border-indigo-500/40' },
    STUDENT: { label: 'Student', color: 'text-green-500', bg: 'bg-green-500/20', border: 'border-emerald-500/40' },
    ADMIN:   { label: 'Admin',   color: 'text-amber-300',   bg: 'bg-amber-500/20',   border: 'border-amber-500/40' },
  }
  const badge = roleMeta[role] ?? { label: role, color: 'text-slate-300', bg: 'bg-slate-500/20', border: 'border-slate-500/40' }

  return (
    <div className="flex flex-col relative lg:flex-row gap-8 min-h-screen p-3 lg:p-10">

      {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
      <aside className="w-full lg:w-72 xl:w-80 shrink-0">
        <div className="custom-glass rounded-3xl p-6 border border-white/10 sticky top-10 space-y-5">

          {/* Avatar + badge */}
          <div className="flex justify-center">
            <div className="relative w-36 h-36">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl scale-110 -z-10" />

              {/* Ring border */}
              <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <Image
                    src={data?.photo_url || 'https://i.pinimg.com/736x/9e/7b/04/9e7b041059f24da6fdf9182dcd7fe28f.jpg'}
                    alt="Profile"
                    width={144}
                    height={144}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Role badge — bottom-left, slightly raised */}
              <div
                className={`absolute bottom-0 -left-6.5 ${badge.bg} ${badge.border} border rounded-md px-1.5 py-0.5 flex items-center gap-1 shadow-lg`}
                style={{ fontSize: '8px' }}
              >
                <span className={`font-bold uppercase tracking-wider ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="text-center">
            {isLoading ? (
              <div className="h-5 w-32 mx-auto bg-white/10 rounded-lg animate-pulse" />
            ) : (
              <h2 className="text-lg font-bold text-white tracking-tight">
                {data?.first_name} {data?.last_name}
              </h2>
            )}
            <p className="text-xs text-slate-500 mt-1">{user_email}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Info rows */}
          <div className="space-y-3">
            <InfoRow
              icon={<Building2 className="w-3.5 h-3.5" />}
              label="University"
              value={data?.academicInfo?.university}
              loading={isLoading}
            />
            <InfoRow
              icon={<Layers className="w-3.5 h-3.5" />}
              label="Level & Term"
              value={
                data?.academicInfo?.level || data?.academicInfo?.term
                  ? `${data?.academicInfo?.level ?? 'N/A'} · Term ${data?.academicInfo?.term ?? 'N/A'}`
                  : null
              }
              loading={isLoading}
            />
            <InfoRow
              icon={<BookOpen className="w-3.5 h-3.5" />}
              label="Department"
              value={data?.academicInfo?.department}
              loading={isLoading}
            />
            <InfoRow
              icon={<Hash className="w-3.5 h-3.5" />}
              label="Student ID"
              value={data?.academicInfo?.student_id}
              loading={isLoading}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Expertises */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Expertises</p>
            </div>
            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-6 w-16 bg-white/10 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : data?.expertises?.length ? (
              <div className="flex flex-wrap gap-2">
                {data.expertises.map((expertise: any) => (
                  <span
                    key={expertise?.id}
                    className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-2.5 py-1 text-indigo-300 font-medium"
                    style={{ fontSize: '10px' }}
                  >
                    {expertise?.topic}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-600 italic">No expertise specified</p>
            )}
          </div>
        </div>
      </aside>

      {/* ── RIGHT COLUMN ────────────────────────────────────────── */}
      <main className="flex-1 min-w-0">
        {data ? <Right_Col p_data={data} /> : (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="custom-glass rounded-3xl h-40 border border-white/5" />
            ))}
          </div>
        )}
      </main>

    </div>
  )
}

/* ── Reusable info row ──────────────────────────────────────────── */
const InfoRow = ({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode
  label: string
  value?: string | null
  loading?: boolean
}) => (
  <div className="flex items-start gap-2.5">
    <div className="mt-0.5 w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{label}</p>
      {loading ? (
        <div className="h-3.5 w-28 bg-white/10 rounded mt-1 animate-pulse" />
      ) : (
        <p className="text-xs text-slate-300 font-medium truncate mt-0.5">
          {value ?? <span className="text-slate-600 italic">Not specified</span>}
        </p>
      )}
    </div>
  </div>
)

export default Profile_Page