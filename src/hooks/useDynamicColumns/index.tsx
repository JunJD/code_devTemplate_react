import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Popover, Checkbox, Divider } from 'antd'
import {  SettingFilled } from '@ant-design/icons'
import { IColumn } from '@src/page/components/baseTable';
import myStore from '@src/utils/localStorage'
import './index.less'

let _couter = 0
export const DYNAMIC_COLUMNS = 'table-dynamic-columns'

/**
 * 动态显示列
 */
export function useDynamicColumns(columns: IColumn[]){
	const location = useLocation()
	const ref_origin = useRef<IColumn[]>(columns)
	const uniqueVal = (col: IColumn) => (col.key || col.dataIndex || col.title) as string
	const checked2columns = (checked: any[] = []) => ref_origin.current.filter((col) => checked.includes(uniqueVal(col)))
	const cache: { [k: string]: string[] } = myStore.get(DYNAMIC_COLUMNS) ?? {}
	let cache_key = `${location.pathname}[${_couter}]`

	useLayoutEffect(() => {
		_couter++
	}, [])
	useEffect(() => {
		_couter = 0
	}, [location.pathname])

	const cache_checked = cache[cache_key]

	const columns2checked = (columns = ref_origin.current) => columns.map((col) => uniqueVal(col))

	const [checked, setChecked] = useState<string[]>(cache_checked ? cache_checked : columns2checked())

	const [_columns, set_columns] = useState<IColumn[]>(checked2columns(checked))

	const [visible, setVisible] = useState(false)
	
	const ref_checked = useRef<string[]>(checked)

	const changeCheckbox = (values: any) => {
		setChecked((ref_checked.current = values))
	}

	const clickConfirm = () => {
		setVisible(false)
		set_columns(checked2columns(ref_checked.current))
		cache[cache_key] = ref_checked.current
		myStore.set(DYNAMIC_COLUMNS, cache)
	}

	const options: any = ref_origin.current.map((item) => ({
		value: uniqueVal(item),
		label: item.title,
	}))

	const indeterminate = checked.length < ref_origin.current.length && checked.length > 0	
	const checkedAll = checked.length === ref_origin.current.length
	const clickCheckAll = () => {
		ref_checked.current = indeterminate || checked.length === 0 ? columns2checked() : []
		setChecked(ref_checked.current)
	}
	const onVisibleChange = () => {
		setVisible(!visible)
	}

	const content = useMemo(()=>{
		return (
			<div className='dynamic-column-checkbox-group'>
			<Checkbox.Group onChange={changeCheckbox} value={checked} options={options} />
			<Divider/>
			<div >
				<Button size='small' type='primary' onClick={clickConfirm}>
					确定
				</Button>
			</div>
		</div>
		)
	}, [checked, options])

	const CtrlButton = (
		<div className='table-dynamic-column'>
			<Popover
				placement='bottomRight'
				title={
					<Checkbox indeterminate={indeterminate} onChange={clickCheckAll} checked={checkedAll}>
						全选
					</Checkbox>
				}
				visible={visible}
				content={content}
				onVisibleChange={onVisibleChange}
				trigger='click'
			>
				<SettingFilled />
			</Popover>
		</div>
	)

	return {
		columns: _columns,
		setColumns: set_columns,
		CtrlButton,
	}
}
