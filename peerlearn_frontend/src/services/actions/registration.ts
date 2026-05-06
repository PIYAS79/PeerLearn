"use server";

export const registerUser = async (formData: any) => {
    const res = await fetch(
        `http://localhost:5000/app/v1/user/person`,
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