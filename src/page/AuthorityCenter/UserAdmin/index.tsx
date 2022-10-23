import BaseTable, { IColumn } from '@src/page/components/baseTable';
import _columns from './_colums';
import React, { useMemo, useState } from 'react';
import { Col, Input, Popover, Row, Select, Space } from 'antd';
import { useDynamicColumns } from '@src/hooks/useDynamicColumns';
import { SearchOutlined, HolderOutlined } from '@ant-design/icons';
const UserAdim: React.FC = () => {
  const { columns: dynamicColumns, CtrlButton } = useDynamicColumns(_columns )

  const [ query, setQuery ] = useState( {
    url: 'admin/get',
    params: { }
  } )

  // const handleSearch=(params)=>{
  //   setQuery( { ...query, params: { ...params } } )
  // }
  // const handleEcho=()=>{
  //   setQuery( { ...query, params: { ...query.params } } )
  // }


  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const finallyColumns = useMemo( () => {
    return [
        ...dynamicColumns,
        {
            title: 'Action',
            align: "center" as const,
            width:100,
            fixed: "right" as const,
            render(record: { allocateStatus: number; }) {
                return (
                  <HolderOutlined />
                )
            },
        },
    ]
  },[ dynamicColumns ] )

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row>
        <Col span={2}>
          {CtrlButton}
        </Col>
        <Col span={6} offset={12}>
          <Input bordered={false} className='myCard' allowClear placeholder="Search" prefix={<SearchOutlined />} />
        </Col>
        <Col span={3} offset={1} >
          <Select
            bordered={false}
            className='myCard'
            showSearch
            placeholder="Select a role"
            onChange={()=>{}}
            options={[{label:'测试',value:"121"}]}
            optionFilterProp="label"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BaseTable query={query} columns={finallyColumns} scroll={{ x: 1200,y: 400 }} />
        </Col>
      </Row>
    </Space>  
  )
};

export default UserAdim;