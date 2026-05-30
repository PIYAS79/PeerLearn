"use client"
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { GraduationCap } from 'lucide-react';
import { is_Log_in } from '@/services/auth.services';

const Navbar = () => {
    const AuthButton = dynamic(() => import('./AuthButton'), { ssr: false })
    const isLoggedIn = is_Log_in();

    // Links always visible (public)
    const publicLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
    ];

    // Links only visible after login
    const privateLinks = [
        { href: '/timeline', label: 'Timeline' },
        { href: '/tutor', label: 'Tutors' },
        { href: '/dashboard/profile', label: 'Profile' },
    ];

    const navLinks = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl">
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl custom-glass border border-white/10 shadow-xl shadow-black/20">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 shrink-0">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <GraduationCap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">PeerLearn</span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-200"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile hamburger */}
                <div className="md:hidden m-auto dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="p-2 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={-1} className="dropdown-content mt-3 p-2 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl w-48 z-50">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Auth Button */}
                <AuthButton />
            </div>
        </div>
    )
}

export default Navbar