import BaseTable from '@src/page/components/baseTable';
import _columns from './_colums';
import React, { useMemo } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux';

const scrollX = document.body.clientWidth - 220 - 100

const MenuManagement: React.FC = () => {

  const { menuList } = useSelector((state: RootState) => state.menu);

  const columns = useMemo(()=>(
    [
      ..._columns,
      {
        title:'操作',
        fixed: 'right' as const ,
        render:(record:unknown)=>{
          return <a onClick={()=>{message.info('待处理')}} >编辑菜单</a>
        }
      }
    ]
  ),[ _columns ])

  return (
    <div>
      <div className='pdb-16'></div>
        <BaseTable dataSource={menuList} columns={columns} scroll={{ x: scrollX,y: 600 }} />
    </div>
  )
};

export default MenuManagement;