"use client"
import Dash_Drawer from '@/components/Dashboard/Dash_Drawer';
import { is_Log_in } from '@/services/auth.services';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const Dashboard_Layout = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn =true; // Replace with actual authentication logic, e.g., using a context or a hook to check if the user is logged in
    const router = useRouter();
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn || !mounted) {
        return null;
    }
    return (
        <Dash_Drawer>
            {children}
        </Dash_Drawer>
    )
}

export default Dashboard_Layout;