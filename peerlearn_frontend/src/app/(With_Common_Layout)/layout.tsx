"use client"

import Navbar from '@/components/Shared/Navbar'
import { is_Log_in } from '@/services/auth.services'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Common_Layout = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = is_Log_in();
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
    <div className='bg-slate-950'>
      <Navbar />
      {children}
      <h1>Footer</h1>
    </div>
  )
}

export default Common_Layout