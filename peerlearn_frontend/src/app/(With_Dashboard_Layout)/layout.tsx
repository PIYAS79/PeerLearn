"use client"
import Dash_Drawer from '@/components/Dashboard/Dash_Drawer';
import { is_Log_in } from '@/services/auth.services';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const Dashboard_Layout = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn =is_Log_in();
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