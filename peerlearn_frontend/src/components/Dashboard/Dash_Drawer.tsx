import React from 'react';
import { DownloadOutlined, HomeOutlined, SettingOutlined, StarOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const { Header, Content, Sider } = Layout;

const items = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        label: (
            <Link href="/dashboard/profile">
                Profile
            </Link>
        ),
    },
    {
        key: '2',
        icon: React.createElement(DownloadOutlined),
        label: (
            <Link href="/dashboard/request">
                Requests
            </Link>
        ),
    },
    {
        key: '3',
        icon: React.createElement(StarOutlined),
        label: (
            <Link href="/dashboard/review">
                Reviews
            </Link>
        ),
    },
    {
        key: '4',
        icon: React.createElement(VideoCameraOutlined),
        label: (
            <Link href="/dashboard/meeting">
                Meetings
            </Link>
        ),
    },
    {
        key: '5',
        icon: React.createElement(HomeOutlined),
        label: (
            <Link href="/">
                Back to Home
            </Link>
        ),
    },
    {
        key: '6',
        icon: React.createElement(SettingOutlined),
        label: (
            <Link href="/dashboard/setting">
                Settings
            </Link>
        ),
    },
    {
        key: '7',
        icon: React.createElement(UploadOutlined),
        label: (
            <Link href="/dashboard/material">
                Upload Material
            </Link>
        ),
    },
];

interface DashDrawerProps {
    children: React.ReactNode;
}

const Dash_Drawer: React.FC<DashDrawerProps> = ({ children }) => {
    const AuthButton = dynamic(() => import('../Shared/AuthButton'), { ssr: false })
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const currentYear = new Date().getFullYear();

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="font-bold text-xl text-white p-4">PeerLearn</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
                <AuthButton />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, color: 'white', textAlign: 'center' }}>Welcome to Dashboard</Header>
                <Content className='bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/30 w-full '>
                    <div
                        className=' text-slate-50 p-10'
                        style={{
                            //   minHeight: 360,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{currentYear} Created by Ant UED
        </Footer> */}
            </Layout>
        </Layout>
    );
};

export default Dash_Drawer;