

import Navbar from '@/components/Shared/Navbar'
// import React, { useEffect, useState } from 'react'

const Common_Layout = ({ children }: { children: React.ReactNode }) => {

//  const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }


  return (
    <div className='bg-slate-950'>
      <Navbar />
      {children}
      <h1>Footer</h1>
    </div>
  )
}

export default Common_Layout