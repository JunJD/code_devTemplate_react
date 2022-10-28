import BaseTable, { IColumn } from '@src/page/components/baseTable';
import _columns from './_colums';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Button, Col, Input, Row, Select, Space, Tabs } from 'antd';
import { useDynamicColumns } from '@src/hooks/useDynamicColumns';
import { SearchOutlined, HolderOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import openModal from '@src/utils/openModal';
import LoginDrawer from './LoginDrawer';
import myRequest from '@src/utils/myAxios';
import MentionsInput from '@src/page/component/mentionsInput';
import { DataSourceObject } from '@src/page/component/mentionsInput';
const scrollX = document.body.clientWidth - 220 - 100

const MenuManagement: React.FC = () => {
  const { columns: dynamicColumns, CtrlButton } = useDynamicColumns(_columns )
  const [ query, setQuery ] = useState( {
    url: 'admin/get',
    params:{ fuzzy:'' }
  } )

  const [options, setOptions ] = useState([])
  useEffect(()=>{
    myRequest('role/get',{}).then(
      res=>{
          if(res.success) {
            setOptions(res.result.data.map((item: { id: any; role: { id: any; label: any; }; })=>({key:item.id ,value:item.role.id, label: item.role.label})))
          }
      },
  )
  },[])
  
  const handleSearch=()=>{
    return debounce((e:ChangeEvent<HTMLInputElement>)=>{
      const fuzzy = e.target.value
      setQuery( { ...query, params: {fuzzy } } )
    },500)
  }

  const handleAddNewAdmin=()=>{
    openModal(LoginDrawer,{
      options,
      onOk:()=>{
        setQuery( { ...query, params: { ...query.params } } )
      }
    })
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

  const data:DataSourceObject[]=[ 
      {value:'10', label:"扬尼斯·阿德托昆博" },
      {value:'11', label:"卢卡·东契奇"},
      {value:'12', label:"乔尔·恩比德"},
      {value:'13', label:"尼古拉·约基奇"},
      {value:'14', label:"帕斯卡尔·西亚卡姆"},
      {value:'15', label:"克里斯塔普斯·波尔津吉斯"},
      {value:'16', label:"艾尔·霍福德"},
      {value:'17', label:"尼古拉·武切维奇"}, 
      {value:'18', label:"鲁迪·戈贝尔"},
      {value:'19', label:"本·西蒙斯"},
  ] 

  const handleFetch = (query: string) => {
    return new Promise<DataSourceObject[]>(resolve=>{
      setTimeout(() => {
        console.log(query,'<===这是值')
        const result = data.filter(item=>{
          if( !query ) return true
          return item.label?.includes(query) || item.value?.includes(query)
        })
        resolve(result) // 模拟一下异步请求
      }, 1000);
    })
  }



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
            options={options}
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
        <Button type="primary" icon={<PlusCircleOutlined />} size="large" onClick={handleAddNewAdmin} >
          Add newAdmin
        </Button>
      </Col>
      </Row>

      <div className='pdb-16'></div>

      <Tabs
        defaultActiveKey="1"
        onChange={ ( ) => { } }
        items={[
          {
            label: <h2>Admin</h2>,
            key: '1',
            children: content,
          },
          {
            label: <h2>MentionsInput</h2>,
            key: '2',
            children: 

            <MentionsInput
              fetchSuggestions={ handleFetch }
              data={data}
              placeholder='请输入'
              size="large"
            />,

          }
        ]}
      />
    </div>
  )
};

export default MenuManagement;