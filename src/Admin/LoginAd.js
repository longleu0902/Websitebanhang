import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {auth} from "../firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth";
import { message } from 'antd';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import MainAdmin from './main-admin';
const LoginAd = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [authenticated,setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem('authenticated'|| false))
  )
  const onFinish =  async (values) => {
    // console.log('Received values of form: ', values);
    const email = values.username;
    const password = values.password
    try{
    const user = await signInWithEmailAndPassword(auth,email,password)
    const tokenResponse = await user.user.getIdToken();
    console.log(tokenResponse)
    if(tokenResponse){
      localStorage.setItem('authenticated',true);
      navigate('/mainAdmin')
    }
    }catch(err){
      messageApi.open({
        type: 'warning',
        content: 'Tài khoản hoặc mật khẩu không đúng',
      });
    }
  };
    return (
      <div className='Admin'>
        {contextHolder}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>

    );
  };
export default LoginAd;