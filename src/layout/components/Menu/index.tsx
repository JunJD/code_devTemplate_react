import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { RootState, useDispatch, useSelector } from '@src/redux';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];


const items:MenuItem[] = [
  {
      "key": "/app/home",
      "icon": <AppstoreOutlined/>,
      "label": "主页"
  },
  {
      "key": "/403",
      "icon": <MailOutlined/>,
      "children": [
          {
              "key": "403",
              "label": "无权限页面"
          },
          {
              "key": "404",
              "label": "无此页面"
          }
      ],
      "label": "错误页面"
  },
  {
      "key": "/login",
      "icon": <SettingOutlined/>,
      "label": "登录页面"
  }
]

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const LayoutMenu: React.FC = () => {
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onSelect:MenuProps['onSelect'] = key => {
    console.log(key)
    navigate(key.key)
  }
  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
   <div className='menu'>
     <Menu
      mode="inline"
      openKeys={openKeys}
      theme="dark"
      onOpenChange={onOpenChange}
      items={items}
      onSelect={onSelect}
    />
   </div>
  );
};

export default LayoutMenu;