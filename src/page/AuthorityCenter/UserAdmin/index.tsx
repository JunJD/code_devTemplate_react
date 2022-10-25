import BaseTable, { IColumn } from '@src/page/components/baseTable';
import _columns from './_colums';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { Button, Col, Input, Row, Select, Space, Tabs } from 'antd';
import { useDynamicColumns } from '@src/hooks/useDynamicColumns';
import { SearchOutlined, HolderOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

const scrollX = document.body.clientWidth - 220 - 100

const MenuManagement: React.FC = () => {
  const { columns: dynamicColumns, CtrlButton } = useDynamicColumns(_columns )
  const [ query, setQuery ] = useState( {
    url: 'admin/get',
    params: { fuzzy: "" }
  } )

  const handleSearch=()=>{
    return debounce((e:ChangeEvent<HTMLInputElement>)=>{
      const fuzzy = e.target.value
      setQuery( { ...query, params: { fuzzy } } )
    },500)
  }

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

  const content = useMemo(()=>(
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row>
        <Col span={2}>
          {CtrlButton}
        </Col>
        <Col span={6} offset={12}>
          <Input 
            size="large"
            bordered={false} 
            className='myCard' 
            allowClear 
            placeholder="Search" 
            prefix={<SearchOutlined />} 
            onChange={handleSearch()} 
          />
        </Col>
        <Col span={3} offset={1} >
          <Select
            size="large"
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
          <BaseTable query={query} columns={finallyColumns} scroll={{ x: scrollX,y: 600 }} />
        </Col>
      </Row>
    </Space>
  ),[ query.params, CtrlButton, finallyColumns, scrollX ])

  return (
    <div>
      <Row>
        <Col span={4}>
          <span style={{fontWeight:700,fontSize:"32px"}} >User&Admin</span>
        </Col>
      <Col span={6} offset={14}>
        <Button type="primary" icon={<PlusCircleOutlined />} size="large">
          Add newAdmin
        </Button>
      </Col>
      </Row>

      <div className='pdb-16'></div>

      <Tabs
        defaultActiveKey="1"
        onChange={()=>{}}
        items={[
          {
            label: <h2>Admin</h2>,
            key: '1',
            children: content,
          },
          {
            label: <h2>User</h2>,
            key: '2',
            children: `Content of Tab Pane 2`,
          }
        ]}
      />
    </div>
  )
};

export default MenuManagement;