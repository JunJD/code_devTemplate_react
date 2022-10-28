import { AppstoreOutlined, MailOutlined, SettingOutlined,UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { RootState, useDispatch, useSelector } from '@src/redux';
import myRequest from '@src/utils/myAxios';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@src/page/component/Icon';
type MenuItem = Required<MenuProps>['items'][number];
interface ImapTree {
  children?: any[],
  path: any,
  label: any,
  icon: string
}

const baseItems:MenuItem[] = [
  {
      "key": "/app/Home",
      "icon": <Icon icon={'AppstoreOutlined'}/>,
      "label": "主页"
  }
]

const mapTree = (org: ImapTree):any => {
  const haveChildren = Array.isArray(org.children) && org.children.length > 0;
  return {
       key : org.path,
       label: org.label,
       icon: <Icon icon={org.icon}/>,
       children:haveChildren ? org?.children?.map((i:ImapTree) => mapTree(i)) : undefined,
   }
}

const LayoutMenu: React.FC = () => {
  const navigate = useNavigate()

  const { menuList } = useSelector((state: RootState) => state.menu);
  const items = baseItems.concat((menuList as ImapTree[]).map(item=>{
    return mapTree(item)
  }))

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
