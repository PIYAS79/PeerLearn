"use server";

export const registerUser = async (formData: any) => {
    const res = await fetch(
        `https://peer-learn-blush.vercel.app/app/v1/user/person`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        }
    );

    const userInfo = await res.json();
    return userInfo;
};