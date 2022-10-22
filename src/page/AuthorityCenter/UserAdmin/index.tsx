import BaseTable, { IColumn } from '@src/page/components/baseTable';
import _columns from './_colums';
import React, { useState } from 'react';
import { Space } from 'antd';
import { useDynamicColumns } from '@src/hooks/useDynamicColumns';

const UserAdim: React.FC = () => {
  const { columns: dynamicColumns, CtrlButton } = useDynamicColumns(_columns )

  const [ query, setQuery ] = useState( {
    url: 'menu/get',
    params: { }
  } )

  // const handleSearch=(params)=>{
  //   setQuery( { ...query, params: { ...params } } )
  // }
  // const handleEcho=()=>{
  //   setQuery( { ...query, params: { ...query.params } } )
  // }

  return (
    <div className='list-part'>
      <Space className='pdb-12'>
          {/* <Space direction="vertical" align="baseline"> */}
            {CtrlButton}
          {/* </Space> */}
          {CtrlButton}
      </Space>
      <BaseTable query={query} columns={dynamicColumns} />
    </div>  
  )
};

export default UserAdim;