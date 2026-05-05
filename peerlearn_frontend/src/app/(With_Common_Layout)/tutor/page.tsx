import Tutor_Card from '@/components/UI/Tutor_Page/Card'
import { Crown, Zap } from 'lucide-react'
import React from 'react'

const Tutor_Page = () => {
    return (
        <div className='min-h-screen mt-10'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
                <Tutor_Card />
                <Tutor_Card />
                <Tutor_Card />
                <Tutor_Card />
            </div>

        </div>
    )
}

export default Tutor_Page