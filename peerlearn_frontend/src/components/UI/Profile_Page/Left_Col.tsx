"use client";

import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/actions/logout';

const Left_Col = () => {

    const router = useRouter();

    const handleLogout = () => {
        logoutUser(router);
    }


    return (
        <div className='border-r min-w-[350px] '>
            <div className="avatar w-full justify-center mt-8">
                <div className="w-[50%] border-2 border-green-500 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
            </div>
            <h3 className="text-xl font-bold text-center mt-4">S M Piyas Mahamude Alif</h3>
            <p className="text-center text-gray-500">Software Engineer</p>
            <div className='flex justify-center mt-5'>
                <button onClick={handleLogout} className='btn bg-red-500 btn-error'>Logout</button>
            </div>
        </div>
    )
}

export default Left_Col