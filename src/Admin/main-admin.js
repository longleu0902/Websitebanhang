import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    PieChartOutlined,
    ContainerOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Space } from 'antd';
import UserLogin from './UserLogin';
import Dashboard from './Dashboard';
import User from './User';
import Post from './Post';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { Cart } from './Cart';

const MainAdmin = ({ List, setList }) => {
    const { Header, Sider, Content } = Layout;
    const [authenticated, setAuthenticated] = useState(null)
    useEffect(() => {
        const tokenResponse = localStorage.getItem('authenticated')
        if (tokenResponse) {
            setAuthenticated(tokenResponse)
        }
    }, [])
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [filtle, setFilter] = useState('')
    const handClicktest = (item) => {
        setFilter(item);
    }
    return (
        <>
            {authenticated ? (
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="demo-logo-vertical" />
                        <Menu
                            style={{ marginTop: 80, height: '1000px' }}
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    icon: <PieChartOutlined />,
                                    label: 'Dashboard',
                                    onClick: () => handClicktest(''),
                                },
                                {
                                    key: '2',
                                    icon: <UserOutlined />,
                                    label: 'User',
                                    onClick: () => handClicktest('User'),
                                },
                                {
                                    key: '3',
                                    icon: <ContainerOutlined />,
                                    label: 'Post',
                                    onClick: () => handClicktest('Post'),
                                },
                                {
                                    key: '4',
                                    icon: <ShoppingCartOutlined />,
                                    label: 'Cart',
                                    onClick: () => handClicktest('Cart'),
                                },
                            ]}
                        />
                    </Sider>
                    <Layout>
                        <Header
                            style={{
                                padding: 0,
                                background: colorBgContainer,
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 50,
                                    height: 50,
                                    outline: 'none'
                                }}
                            />
                            <UserLogin />
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                                background: colorBgContainer,
                            }}
                        >
                            {filtle === '' ? (<Dashboard/>) : ''}
                            {filtle === 'User' ? (<User />) : ''}
                            {filtle === 'Post' ? (<Post List={List} setList={setList} />) : ''}
                            {filtle === 'Cart' ? (<Cart/>) : ''}
                        </Content>
                    </Layout>
                </Layout>
            ) : ''}
        </>

    );

};

export default MainAdmin;