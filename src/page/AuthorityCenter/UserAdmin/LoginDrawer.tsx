import myRequest from '@src/utils/myAxios';
import { Button, message, Form, Input, Drawer, Col, Select} from 'antd';
import { values } from 'lodash';
import React, { useEffect, useState } from 'react';
import './index.less'

interface ILoginDrawer {
    visible?:boolean,
    onCancel?:()=>void,
    onOk?:()=>void,
    options:[]
}

const LoginDrawer: React.FC<ILoginDrawer> = (props) => {
    const { visible, onCancel, onOk, options} = props


  const onFinish = (values: any) => {
    myRequest('admin',{...values}).then(
        res=>{
            if(res.success) message.success(res.message);
            onOk && onOk()
        },
    )
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Drawer
        destroyOnClose
        title="新增用户"
        placement="right"
        closable={false}
        onClose={onCancel}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
         <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="角色"
            name="roleId"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Select options={options} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      </>
  );
};

export default LoginDrawer;