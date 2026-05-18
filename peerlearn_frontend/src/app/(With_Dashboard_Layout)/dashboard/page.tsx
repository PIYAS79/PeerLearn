"use client"

import { get_User_Info } from '@/services/auth.services'
import React from 'react'

const Dashboard_Page = () => {
  const user_info = get_User_Info();
  return (
    <div className='h-50 flex justify-center items-center'>
      <h1 className='uppercase text-4xl font-bold gradient-text'>Welcome to {(user_info as any)?.role} Dashboard</h1>
    </div>
  )
}

export default Dashboard_Page