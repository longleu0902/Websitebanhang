import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate()
  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  const handleMenuClick = (e) => {
    message.info('See You Again');
  //   console.log('click', e);
  };
  const handleLogOut = () => {
      const remove = 'authenticated'
      localStorage.removeItem(remove)
      navigate('/admin')
      
  }
  const items = [
    {
      label: <Button onClick={handleLogOut}>Logout</Button>,
      key: '1',
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return(
  <Space style={{marginRight:20}} wrap>
    <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
      admin
    </Dropdown.Button>
  </Space>
);}
export default UserLogin;