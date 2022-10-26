import {IColumn} from '@src/page/components/baseTable'
export default [
  {
    title: '菜单ID',
    dataIndex: 'id',
    width:110
  },
  {
    title: '菜单名称',
    dataIndex: 'label',
    align:'center',
    editItem: true
  },
  {
    title: '菜单路径',
    dataIndex: 'key',
    align:'center',
    editItem: true
  },
  {
    title: '菜单Icon',
    dataIndex: 'icon',
    align:'center',
    editItem: true,
    inputType: 'select',
    options: [{label:'UsergroupAddOutlined',value:'UsergroupAddOutlined'},{label:'UserOutlined',value:'UserOutlined'},{label:'SlackSquareOutlined',value:'SlackSquareOutlined'}]
  }
] as IColumn[]