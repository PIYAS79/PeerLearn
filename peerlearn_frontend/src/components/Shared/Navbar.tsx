"use client"
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
    const AuthButton = dynamic(() => import('./AuthButton'), { ssr: false })

    return (
        <div className="navbar items-center custom-glass">
            <div className="navbar-start     ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <Link href={'/'}><li>Home</li></Link>
                        <Link href={'/timeline'}><li>Timeline</li></Link>
                        <Link href={'/tutor'}><li>Tutors</li></Link>
                        <Link href={'/dashboard/profile'}><li>Profile</li></Link>
                    </ul>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <GraduationCap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight font-display">PeerLearn</span>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex mr-auto">
                <ul className="menu menu-horizontal px-1 gap-4">
                    <Link href={'/'}><li>Home</li></Link>
                    <Link href={'/timeline'}><li>Timeline</li></Link>
                    <Link href={'/tutor'}><li>Tutors</li></Link>
                    <Link href={'/dashboard/profile'}><li>Profile</li></Link>
                </ul>
            </div>
            <AuthButton />
        </div>
    )
}

export default Navbar