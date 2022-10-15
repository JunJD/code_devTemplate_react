import { Button, Card, Checkbox, Form, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
import { getCookie } from '@src/utils/cookie';
interface ILoginFormProps {
  onLogin: (value:string)=>void,
  loading: boolean
}
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript
  ],
});



const LoginForm: React.FC<ILoginFormProps> = ({ onLogin, loading }) => {
  const [ form ] = Form.useForm()

  useEffect(()=>{
    const userName = getCookie('userName') ? getCookie('userName') : '';
    const password = getCookie('userPwd') ? getCookie('userPwd') : '';
    form.setFieldsValue({
      name:userName,
      password
    })
  }, [])

  
  const handleLogin = () => {
    onLogin( form.getFieldsValue() )
  }
  return (
    <Card style={{borderTop:'5px solid #444CCC'}}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <div style={{margin:"50px 20px",display:'flex',flexDirection: "column",fontSize:'30px', fontWeight:510,color:"#444CCC",fontFamily:'initial'}}>
            
            <span>欢迎登录<IconFont type="icon-javascript" /></span>
            <span>React练手平台</span>
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
      </Space>
      
    </Card>
  )
};

export default LoginForm;