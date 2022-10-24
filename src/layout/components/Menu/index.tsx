import { AppstoreOutlined, MailOutlined, SettingOutlined,UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { RootState, useDispatch, useSelector } from '@src/redux';
import myRequest from '@src/utils/myAxios';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {setMenuList} from '@src/redux/modules/menu/reducer'
type MenuItem = Required<MenuProps>['items'][number];

const baseItems:MenuItem[] = [
  {
      "key": "/app/Home",
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

const LayoutMenu: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(()=>{
    myRequest( 'menu/get', {  } ).then(res=>{
      if(res.success){
      dispatch(setMenuList(res.result.data))
      }

    })
  },[])

  const { menuList } = useSelector((state: RootState) => state.menu);
  
  const items = baseItems.concat(menuList as MenuItem[])

  const onSelect:MenuProps['onSelect'] = key => {
    navigate(key.key)
  }

  return (
   <div className='menu'>
     <Menu
      mode="inline"
      theme="dark"
      items={items}
      onSelect={onSelect}
    />
   </div>
  );
};

export default LayoutMenu;
