'use server';

import { cookies } from 'next/headers';

import { authKey } from '@/constants/auth.key';
import { redirect } from 'next/navigation';

const setAccessToken = async (token: string, option?: any) => {
    const cookieStore = await cookies();
    cookieStore.set(authKey, token);
    if (option && option.redirect) {
        redirect(option.redirect);
    }
};

export default setAccessToken;