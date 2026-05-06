import useUserInfo from '@/hooks/userUserInfo';
import { logoutUser } from '@/services/actions/logout';
import { get_User_Info } from '@/services/auth.services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthButton = () => {

    const userInfo = get_User_Info();
    console.log(userInfo);
    const router = useRouter();

    const handleLogout = () => {
        logoutUser(router);
    }


    return (
        <>
            {userInfo ?
                <div className='flex justify-center '>
                    <button onClick={handleLogout} className='btn bg-red-500 btn-error'>Logout</button>
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