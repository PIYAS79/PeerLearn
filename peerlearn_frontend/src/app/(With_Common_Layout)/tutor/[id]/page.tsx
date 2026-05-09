import Image from 'next/image';
import {
  BookOpen,
  Crown,
  Star,
  Zap,
  Clock3,
  GraduationCap,
  BadgeCheck
} from 'lucide-react';

import { Person_Data_Response_Type } from '@/types';
import Direct_Req_Btn from '@/components/UI/Tutor_Page/Direct_Req_Btn';

type PropTypes = {
  params: Promise<{
    id: string;
  }>;
};

const Teacher_Details_Page = async ({ params }: PropTypes) => {

  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/app/v1/person/${id}`,
    {
      cache: 'no-store',
    }
  );
  const { data: teacher } = await res.json() as Person_Data_Response_Type;
  console.log(teacher);

  if (!teacher) {
    return (
      <div className='min-h-screen flex items-center justify-center text-slate-400'>
        Teacher Not Found
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#0f172a] text-white px-4 py-6'>

      {/* Container */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>

        {/* LEFT SIDE */}
        <div className='lg:col-span-1 space-y-6'>

          {/* Profile Card */}
          <div className='bg-white/5 border border-white/5 rounded-2xl p-5'>

            <div className='flex flex-col items-center text-center'>

              <div className='relative'>
                <div className='w-28 h-28 rounded-full overflow-hidden ring-4 ring-indigo-500/20'>
                  <Image
                    src={
                      teacher?.photo_url
                        ? teacher.photo_url
                        : 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'
                    }
                    alt='Teacher Image'
                    width={200}
                    height={200}
                    className='object-cover w-full h-full'
                  />
                </div>

                {/* <div className='absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-[#0f172a]' /> */}
              </div>

              <h1 className='text-2xl font-bold mt-4'>
                {teacher?.first_name} {teacher?.last_name}
              </h1>

              <p className='text-indigo-400 text-xs uppercase tracking-widest font-bold mt-1'>
                {teacher?.academicInfo?.department}
              </p>

              <div className='flex items-center gap-1 mt-3 text-yellow-400'>
                <Star className='w-4 h-4 fill-yellow-400' />

                <span className='font-bold text-sm'>
                  4.9
                </span>

                <span className='text-slate-500 text-xs'>
                  (120 Reviews)
                </span>
              </div>

              <Direct_Req_Btn targetUserId={teacher?.id} />
            </div>
          </div>

          {/* Academic Info */}
          <div className='bg-white/5 border border-white/5 rounded-2xl p-5'>

            <div className='flex items-center gap-2 mb-4'>
              <GraduationCap className='w-5 h-5 text-indigo-400' />

              <h3 className='font-bold text-lg'>
                Academic Info
              </h3>
            </div>

            <div className='space-y-4 text-sm'>

              <div className='flex justify-between gap-4'>
                <p className='text-slate-400'>
                  University
                </p>

                <p className='font-semibold text-right'>
                  {teacher?.academicInfo?.university}
                </p>
              </div>

              <div className='flex justify-between gap-4'>
                <p className='text-slate-400'>
                  Department
                </p>

                <p className='font-semibold text-right'>
                  {teacher?.academicInfo?.department}
                </p>
              </div>

              <div className='flex justify-between gap-4'>
                <p className='text-slate-400'>
                  Level
                </p>

                <p className='font-semibold text-right'>
                  {teacher?.academicInfo?.level}
                </p>
              </div>

              <div className='flex justify-between gap-4'>
                <p className='text-slate-400'>
                  Term
                </p>

                <p className='font-semibold text-right'>
                  {teacher?.academicInfo?.term}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='lg:col-span-2 space-y-6'>

          {/* Expertise Section */}
          <div className='bg-white/5 border border-white/5 rounded-2xl p-5'>

            <div className='flex items-center gap-2 mb-5'>
              <Crown className='w-5 h-5 text-indigo-400' />

              <h2 className='text-xl font-bold'>
                Expertise
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

              {teacher?.expertises?.map((item) => (
                <div
                  key={item.id}
                  className='bg-white/5 border border-white/5 rounded-xl p-4 hover:border-indigo-500/20 transition-all'
                >

                  <div className='flex items-start justify-between gap-3'>

                    <div>
                      <h3 className='font-bold text-base'>
                        {item.course_title}
                      </h3>

                      <p className='text-indigo-400 text-xs uppercase tracking-wider font-bold mt-1'>
                        {item.course_code}
                      </p>
                    </div>

                    <div
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest
                      ${item.level === 'EXPERT'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                    >
                      {item.level}
                    </div>

                  </div>

                  <div className='mt-4'>
                    <p className='text-sm text-slate-300 leading-relaxed'>
                      {item.topic}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* Reviews */}
          <div className='bg-white/5 border border-white/5 rounded-2xl p-5'>

            <div className='flex items-center gap-2 mb-5'>
              <BadgeCheck className='w-5 h-5 text-indigo-400' />

              <h2 className='text-xl font-bold'>
                Student Reviews
              </h2>
            </div>

            <div className='space-y-4'>

              {teacher?.as_review_target_user?.slice(0, 4).map((review) => (
                <div
                  key={review.id}
                  className='bg-white/5 border border-white/5 rounded-xl p-4'
                >

                  <div className='flex items-center justify-between'>

                    <div className='flex items-center gap-2'>
                      <BookOpen className='w-4 h-4 text-indigo-400' />

                      <p className='text-sm font-bold'>
                        {review.course_title}
                      </p>
                    </div>

                    <div className='flex items-center gap-1 text-yellow-400'>
                      <Star className='w-4 h-4 fill-yellow-400' />

                      <span className='text-sm font-bold'>
                        {review.human_rating}
                      </span>
                    </div>

                  </div>

                  <p className='text-sm text-slate-300 mt-3 leading-relaxed'>
                    {review.details}
                  </p>

                  <div className='mt-4 flex items-center justify-between text-[11px] uppercase tracking-widest text-slate-500 font-bold'>

                    <span>
                      {review.topic}
                    </span>

                    <div className='flex items-center gap-1'>
                      <Clock3 className='w-3 h-3' />

                      Recent
                    </div>

                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher_Details_Page;