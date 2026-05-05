import Navbar from '@/components/Shared/Navbar'
import React from 'react'

const Common_Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar/>
        {children}
        <h1>Footer</h1>
    </div>
  )
}

export default Common_Layout