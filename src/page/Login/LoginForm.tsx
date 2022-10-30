import React, { useEffect } from 'react';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { getCookie } from '@src/utils/cookie';
import { IRequestLoginParams } from '@src/page/Login'
import './index.less'
import Icon from '../component/Icon';
interface ILoginFormProps {
  onLogin: ( values: IRequestLoginParams )=> void,
  loading: boolean
}

const LoginForm: React.FC<ILoginFormProps> = ({ onLogin, loading }) => {
  const [ form ] = Form.useForm()

  useEffect(()=>{
    form.setFieldsValue({
      name:getCookie('userName') ? getCookie('userName') : '',
      password:getCookie('userPwd') ? getCookie('userPwd') : ''
    })
  }, [])

  
  const handleLogin = () => {
    onLogin( form.getFieldsValue() )
  }
  return (
    <Card hoverable style={{borderTop:'5px solid #444CCC',width:"300px"}}>
      {/* <Space direction="vertical" size="middle" > */}
          <div className='proTitle'>
            
            <span>欢迎登录<Icon icon="icon-lanling-zaijianxiangmu" /></span>
            <span>xxxxxx平台</span>
          </div>
          
          <Form
            form={form}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="账号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
            </Form.Item>
          </Form>

          <Button type="primary" onClick={handleLogin} loading={loading} block>登录</Button>
      {/* </Space> */}
      
    </Card>
  )
};

export default LoginForm;