// "use server";


import setAccessToken from './set_Access_Token';

export const userLogin = async (data: any) => {
    const res = await fetch(
        `http://localhost:5000/app/v1/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
            // cache: "no-store",
        }
    );
    const userInfo = await res.json();


    if (userInfo?.data?.access_token) {
        setAccessToken(userInfo?.data?.access_token, {
            redirect: '/profile',
        });
    }

    return userInfo;
};