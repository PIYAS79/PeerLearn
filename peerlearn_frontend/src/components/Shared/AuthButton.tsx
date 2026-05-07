import useUserInfo from '@/hooks/userUserInfo';
import { logoutUser } from '@/services/actions/logout';
import { get_User_Info } from '@/services/auth.services';
import { removeFromLocalStorage } from '@/utils/local-storage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthButton = () => {

    const userInfo = get_User_Info();
    console.log(userInfo);
    const router = useRouter();

    const handleLogout = () => {
        logoutUser(router);
        removeFromLocalStorage('person_id');
    }


    return (
        <>
            {userInfo ?
                <div className='flex justify-center '>
                    <button onClick={handleLogout} className='btn bg-red-600 w-full rounded-lg'>Logout</button>
                </div> :
                <div className='flex justify-center'>
                    <Link href={'/login'}>
                        <button className='btn bg-indigo-600 btn-error'>Login</button>
                    </Link>
                </div>
            }
        </>
    )
}

export default AuthButton