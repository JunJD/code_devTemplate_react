import myRequest, {IResReturn} from '@src/utils/myAxios';
import {  Table, TablePaginationConfig, TableProps, Tag } from 'antd';
import type {  ColumnProps, ColumnsType, ColumnType } from 'antd/es/table';
import React, { useEffect, useRef, useState } from 'react';
import './index.less'
interface IQuery {
    url: string    /** 请求地址 */
    params?: any    /** 请求参数 */
    auto?: boolean    /** 是否自动请求 */
}

export interface IColumn extends ColumnProps<any> {
    /** 行显隐藏 */
    show?: boolean
}

interface IbaseTable extends TableProps<any> {
    columns: IColumn[],
    query?: IQuery, // 核心api
    dataSource?: any, 
    pagination?: TablePaginationConfig | false,
    rowHighlight?: boolean // hover行高亮?
}

interface IResult {
    total?:number,
    list?:any[],
    data?:any[]
}

const BaseTable: React.FC<IbaseTable> = (props) => {
    const { columns, query, dataSource: data, pagination, rowHighlight, ...ommited } = props

    const ref_page = useRef({ current: 1, pageSize: 10 }) 
    const ref_auto = useRef<boolean | undefined>(query?.auto ?? true)
    const ref_timer = useRef<any>(true)

    const [dataTotal, setDataTotal] = useState<number>(0)
    const [dataSource, setDataSource] = useState<Array<any> | undefined>(data as Array<any>)
    const [_pagination, set_pagination] = useState<TablePaginationConfig | false | undefined>( pagination === false ? false : { ...ref_page.current, ...pagination } )

    const queryHandle = async(pagination: TablePaginationConfig = _pagination as TablePaginationConfig) => {
        const { current, pageSize } = pagination
        const { url, params } = query ?? {}
        if (url) {
            const res: IResReturn<IResult> = await myRequest(url, { page: current, size: pageSize, ...params })
            const { success, result } = res
            if (success) {
                const { total = 0, list: l, data: d } = result
                const list: any = d ?? l ?? []
                if (Array.isArray(list)) {
                    setDataSource(list)
                    setDataTotal(+total)
                }
            }
        }
    }

    const autoQuery = () => {
        if (ref_timer.current) clearTimeout(ref_timer.current)
        ref_timer.current = setTimeout(() => {
            queryHandle()
        }, 400)
    }

    useEffect(() => {
        if (ref_auto.current) {
            if (!_pagination) {
                autoQuery()
            } else {
                set_pagination({ ..._pagination, current: ref_page.current.current })
            }
        }
    }, [query?.params])

    useEffect(() => {
        autoQuery()
    }, [_pagination])


    const tableProps: TableProps<any> = {
        rowClassName:props.rowClassName ?? rowHighlight ? ()=>'table_card':undefined,
        size: 'small',
        dataSource,
        rowKey: 'id',
        columns: columns
            ?.filter(col => (col.show === undefined ? true : col.show)) as ColumnsType<any>,
        pagination:
            _pagination === false
                ? false
                : {
                    showSizeChanger: true, // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
                    showQuickJumper: true, // 是否可以快速跳转至某页
                    pageSizeOptions: ['10', '30', '50', '100'], // 指定每页可以显示多少条
                    showTotal: (total: number) => `共计${total}条数据`, // 用于显示数据总量和当前数据顺序
                    ..._pagination,
                    total: dataTotal,
                },
        onChange(pagination) {
            set_pagination(pagination as TablePaginationConfig)
        },
        ...ommited,
    }

    return (
        <Table {...(tableProps)} />
    )
};

export default BaseTable;