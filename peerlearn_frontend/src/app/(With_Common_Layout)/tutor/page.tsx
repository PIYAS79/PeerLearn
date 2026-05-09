"use client"

import Tutor_Card from '@/components/UI/Tutor_Page/Card'
import { useGetAllTeacherQuery } from '@/redux/api/teacherApi';
import { getFromLocalStorage } from '@/utils/local-storage';

const Tutor_Page = () => {
    const { data: teachers, isLoading, error } = useGetAllTeacherQuery({ page: 1, limit: 20 });
    console.log(teachers);
    return (
        <div className='min-h-screen mt-10'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
                {teachers?.length && teachers?.filter(one => one.id !== getFromLocalStorage('person_id')).map((teacher) => (
                    <Tutor_Card key={teacher.id} teacher={teacher} />
                ))}
            </div>

        </div>
    )
}

export default Tutor_Page