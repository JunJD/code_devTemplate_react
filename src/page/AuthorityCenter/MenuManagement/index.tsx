import BaseTable, { IColumn } from '@src/page/components/baseTable';
import _columns from './_colums';
import React, { useMemo, useState } from 'react';
import { Form, message, Popconfirm, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux';

const scrollX = document.body.clientWidth - 220 - 100

const MenuManagement: React.FC = () => {

  const { menuList } = useSelector((state: RootState) => state.menu);

  const [form] = Form.useForm();

  const edit = ( record: { key: string } ) => { // 编辑按钮
    form.setFieldsValue({...record}); // 给列设置值
    setEditingKey(record.key); // 控制是否可编辑
  };

  const [editingKey, setEditingKey] = useState<string>(''); // 控制表格是否可编辑key值
  const isEditing = (record:{key: string}) => record.key === editingKey; // 判断表格是否可编辑的核心判断

  const columns = useMemo(()=>(
    [
      ..._columns,
      {
        title:'操作',
        fixed: 'right' as const ,
        render:(record:{key:string})=>{
          const editable = isEditing(record);
          return editable ? (<span>
                <Typography.Link onClick={ ()=>{ setEditingKey(''); message.success('假装发请求成功了') } } style={{ marginRight: 8 }}>
                  提交
                </Typography.Link>
                <Popconfirm title="确定取消?" onConfirm={()=>{ setEditingKey('') }}>
                  <a>取消</a>
                </Popconfirm>
              </span>
          ) :(<a onClick={() => edit(record)} >编辑菜单</a>)
        }
      }
    ]
  ),[ _columns, editingKey ])

  const mergedColumns = columns.map((col: IColumn) => {
    if (!col.editItem) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        options: col.options,
        inputType: col.inputType,
        title: col.title, // 校验提醒用
        dataIndex: col.dataIndex, // 单元格form.set值用
        editing: isEditing(record), // 控制编辑状态
      }),
    };
  });

  return (
      <div>
        <div className='pdb-16'></div>
          <BaseTable editForm={form} editTable dataSource={menuList} columns={mergedColumns as IColumn[]} scroll={{ x: scrollX,y: 600 }} />
      </div>
    )
  };

export default MenuManagement;