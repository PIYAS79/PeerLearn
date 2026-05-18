'use client';

import React from 'react';
import {
  DownloadOutlined,
  HomeOutlined,
  LockOutlined,
  SettingOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { get_User_Info } from '@/services/auth.services';
import { GraduationCap } from 'lucide-react';

const { Content, Sider } = Layout;

// ── ROUTE → KEY MAP ──────────────────────────────────────────────────────────

const routeKeyMap: Record<string, string> = {
  '/dashboard/profile': '1',
  '/dashboard/request': '2',
  '/dashboard/review':  '3',
  '/dashboard/setting': '4',
  '/':                  '5',
  '/dashboard/admin':   '9',
};

// ── MENU ITEMS ────────────────────────────────────────────────────────────────

const persons_items = [
  { key: '1', icon: React.createElement(UserOutlined),     label: <Link href="/dashboard/profile">Profile</Link> },
  { key: '2', icon: React.createElement(DownloadOutlined), label: <Link href="/dashboard/request">Requests</Link> },
  { key: '3', icon: React.createElement(StarOutlined),     label: <Link href="/dashboard/review">Reviews</Link> },
  { key: '4', icon: React.createElement(SettingOutlined),  label: <Link href="/dashboard/setting">Settings</Link> },
  { key: '5', icon: React.createElement(HomeOutlined),     label: <Link href="/">Back to Home</Link> },
];

const admins_items = [
  { key: '1', icon: React.createElement(UserOutlined),     label: <Link href="/dashboard/profile">Profile</Link> },
  { key: '2', icon: React.createElement(DownloadOutlined), label: <Link href="/dashboard/request">Requests</Link> },
  { key: '3', icon: React.createElement(StarOutlined),     label: <Link href="/dashboard/review">Reviews</Link> },
  { key: '4', icon: React.createElement(SettingOutlined),  label: <Link href="/dashboard/setting">Settings</Link> },
  { key: '5', icon: React.createElement(HomeOutlined),     label: <Link href="/">Back to Home</Link> },
  { key: '9', icon: React.createElement(LockOutlined),     label: <Link href="/dashboard/admin">Admin Dashboard</Link> },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

interface DashDrawerProps {
  children: React.ReactNode;
}

const Dash_Drawer: React.FC<DashDrawerProps> = ({ children }) => {
  const AuthButton = dynamic(() => import('../Shared/AuthButton'), { ssr: false });
  const pathname = usePathname();
  const user_info = get_User_Info();

  const isAdminOrSuperAdmin =
    (user_info as any)?.role !== 'STUDENT' && (user_info as any)?.role !== 'TEACHER';

  const items = isAdminOrSuperAdmin ? admins_items : persons_items;

  // Match active key — exact first, then prefix match
  const selectedKey =
    routeKeyMap[pathname] ??
    Object.entries(routeKeyMap).find(([route]) => pathname.startsWith(route) && route !== '/')?.[1] ??
    '1';

  // Page title from active item
  const activeLabel =
    items.find((i) => i.key === selectedKey)
      ?.label?.props?.children ?? 'Dashboard';

  return (
    <Layout className="min-h-screen">
      {/* ── SIDEBAR ── */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: '#080f1e',
        //   height:"screen",
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Logo */}
        <div className="px-6 py-5 flex items-center gap-2">
          {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 shrink-0">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <GraduationCap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white ">PeerLearn</span>
                </Link>
        </div>

        {/* Nav label */}
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-6 mb-2">Navigation</p>

        {/* Menu */}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
          style={{ background: 'transparent', border: 'none' }}
          theme="dark"
        />

        {/* Auth button pinned bottom */}
        <div className="mt-2 px-1">
          <AuthButton />
        </div>
      </Sider>

      {/* ── MAIN ── */}
      <Layout style={{ background: '#020817' }}>

        {/* ── HEADER ── */}
        <div
          className="flex items-center justify-between px-8 py-0 shrink-0"
          style={{
            height: 56,
            background: 'rgba(8,15,30,0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-xs font-semibold">Dashboard</span>
            <span className="text-slate-700 text-xs">/</span>
            <span className="text-slate-200 text-xs font-bold">{activeLabel}</span>
          </div>

          {/* Right side pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(99,102,241,0.5)]" />
            <span className="text-xs font-semibold text-slate-400">
              {(user_info as any)?.role ?? 'User'}
            </span>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <Content className="bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/30 w-full">
          <div className="text-slate-50 p-0">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dash_Drawer;