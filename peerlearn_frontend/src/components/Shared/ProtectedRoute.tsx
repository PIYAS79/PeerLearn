"use client"

import { is_Log_in } from '@/services/auth.services';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = is_Log_in();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    if (!mounted || !isLoggedIn) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;