import {IColumn} from '@src/page/components/baseTable'
export default [
    {
        title: <span style={{color:"red"}}>Name</span>,
        dataIndex: 'name',
        width: 150,
        align: "center"
    },
    {
        title: 'Email',
        dataIndex: 'menu_code',
        width: 180,
        align: "center"
    },
    {
        title: 'Status',
        dataIndex: 'parent_id',
        width: 100,
        align: "center"
    },
    {
        title: 'LastAcess',
        dataIndex: 'path',
        width: 150,
        align: "center"
    }
] as IColumn[]