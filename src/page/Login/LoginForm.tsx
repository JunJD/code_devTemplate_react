import React, { useEffect } from 'react';
import { Button, Card, Checkbox, Form, Input, Space } from 'antd';
import { LockOutlined, UserOutlined, createFromIconfontCN } from '@ant-design/icons';
import { getCookie } from '@src/utils/cookie';
import { IRequestLoginParams } from '@src/page/Login'
import './index.less'
interface ILoginFormProps {
  onLogin: ( values: IRequestLoginParams )=> void,
  loading: boolean
}

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript
    '//at.alicdn.com/t/c/font_3709432_1q91aos9764.js' //各行业
    /**
     * icon-lanling-siji 焊工行业
     * icon-lanling-dingyue 报纸行业
     * icon-lanling-ershoujiaoyi 二手交易行业
     * icon-lanling-jixiezulin 机械租赁行业
     * icon-lanling-gongchang 工厂行业
     * icon-lanling-jianzhu 建筑行业
     * icon-lanling-xiangji 摄影行业
     * icon-lanling-wuliu 物流行业
     * icon-lanling-baoxian 保险行业
     * icon-lanling-xiaogong 小工行业
     * icon-lanling-jixie 机械行业
     * ...
     */
  ],
});



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
            
            <span>欢迎登录<IconFont type="icon-lanling-zaijianxiangmu" /></span>
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