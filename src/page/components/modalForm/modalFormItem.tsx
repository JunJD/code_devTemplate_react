import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import moment, { Moment } from 'moment'
import React, { useRef, useState } from 'react'
const { RangePicker } = DatePicker
const { Option } = Select
const { TextArea } = Input


export const COMMON_INPUT = (props: any) => {
    let {
        value = 'value',
        name = 'name',
        row = 0,
        col,
        field = '',
        label = '',
        type,
        htmlType='',
        placeholder = '',
        allowClear = true,
        formItemProps = {},
        InputItemProps = {},
    } = props
    const Tell = htmlType?Input[htmlType]:Input
    return (
        <Form.Item label={label} name={field} {...formItemProps}>
            
                <Tell
                    {...InputItemProps}
                    type='text'
                    allowClear={allowClear}
                    placeholder={placeholder}
                />

        </Form.Item>
    )
}

export const COMMON_INPUT_NUMBER = (props: any) => {
    let {
        value = 'value',
        name = 'name',
        row = 0,
        col,
        field = '',
        label = '',
        type,
        placeholder = '',
        allowClear = true,
        formItemProps = {},
        InputItemProps = {},
    } = props
    return (
        <Form.Item label={label} name={field} {...formItemProps}>
            <InputNumber
                {...InputItemProps}
                style={{ width: 150 }}
                allowClear={allowClear}
                placeholder={placeholder}
            />
        </Form.Item>
    )
}

export const COMMON_SELECT = (props: any) => {
    let {
        value = 'value',
        name = 'name',
        row = 0,
        col,
        field = '',
        list = [],
        label = '',
        type,
        placeholder = '',
        allowClear = true,
        formItemProps = {},
        InputItemProps = {},
    } = props
    return (
        <Form.Item label={label} name={field} {...formItemProps}>
            <Select
                showSearch
                placeholder={placeholder}
                optionFilterProp='children'
                filterOption={(input, option:{[key:string]:any}) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear={allowClear}
                {...InputItemProps}
            >
                {list && list instanceof Function
                    ? list().map((item: { [x: string]: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
                        return (
                            <Option value={item[value]} key={String(item[value])}>
                                {item[name]}
                            </Option>
                        )
                    })
                    : list.map((item: { [x: string]: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
                        return (
                            <Option value={item[value]} key={String(item[value])}>
                                {item[name]}
                            </Option>
                        )
                    })}
            </Select>
        </Form.Item>
    )
}

// export const RANGE_PICKER = (props: any) => {
//     const [dateOpen, setdateOpen] = useState(false)
//     let {
//         col,
//         field = '',
//         label = '',
//         placeholder = '',
//         allowClear = true,
//         formItemProps = {},
//         InputItemProps = {},
//         limitDate,
//         limitToday,
//         initialValues = {},
//     } = props
//     const setmonthHandle = (field: string | number, type: string) => {
//         let result = {}
//         let today = new Date()
//         let currentMonth = today.getMonth() + 1
//         let currentYear = today.getFullYear()
    //     let startDate, endDate
    //     if (type === 'now') {
    //         startDate = moment().startOf('month')
    //         endDate = moment().endOf('month')
    //     } else if (type === 'pre') {
    //         startDate = moment().subtract(1,'month').startOf('month')
    //         endDate = moment().subtract(1,'month').endOf('month')
    //     } else {
    //         startDate = new Date()
    //         endDate = new Date()
    //     }
    //     const Month = [
    //         moment(startDate).startOf('day'),
    //         moment(endDate).endOf('day'),
    //     ]
    //     result[field] = Month
    //     setdateOpen(false)
    //     props.setFormVal(result)
    // }
    // const setFormAndClose = (result: any) => {
    //     props.setFormVal(result)
    //     setdateOpen(false)
    // }
    // const nowDate = useRef(initialValues[field])
    // const preDate = useRef()

    // const onOpenChange = (open: boolean | ((prevState: boolean) => boolean)) => {
    //     let result = {}
    //     if (open) {
    //         result[field] = []
    //         preDate.current = nowDate.current
    //         nowDate.current = []
    //     } else {
    //         /**选中值不完整时  回到上一个选中状态 */
    //         // 2022.7.8 bug处理
    //         if (!nowDate.current || !nowDate.current[0] || !nowDate.current[1]) {
    //             result[field] = preDate.current
    //             nowDate.current = preDate.current
    //         } else {
    //             result[field] = nowDate.current
    //         }
    //     }
    //     props.setFormVal(result)
    //     setdateOpen(open)
    // }
    // const disabledDate = (current: number) => {
    //     const dates = nowDate.current || []
    //     if (limitToday) {
    //         return current > moment().subtract(1, 'day') //今天之后
    //     }
    //     if (!dates || dates.length === 0 || !limitDate) {
    //         return false
    //     }
    //     const tooLate = dates[0] && current.diff(dates[0], 'days') > limitDate
    //     const tooEarly = dates[1] && dates[1].diff(current, 'days') > limitDate
    //     return tooEarly || tooLate
    // }

    // const changeDate = (v: [Moment, Moment], dateString: any, range: any) => {
    //     if (!v) {
    //         return nowDate.current = []
    //     }
    //     nowDate.current = [v[0]?.startOf('day'), v[1]?.endOf('day')]
    // }

    // const defaultExtraFooter = () => {
    //     return (
    //         <div>
    //             <Button
    //                 type='primary'
    //                 size='small'
    //                 onClick={() => {
    //                     setmonthHandle(field, 'now')
    //                 }}
    //                 style={{ marginLeft: 5 }}
    //             >
    //                 本月
    //             </Button>
    //             <Button
    //                 type='primary'
    //                 size='small'
    //                 onClick={() => {
    //                     setmonthHandle(field, 'pre')
    //                 }}
    //                 style={{ marginLeft: 5 }}
    //             >
    //                 上月
    //             </Button>
    //             <Button
    //                 type='primary'
    //                 size='small'
    //                 onClick={() => {
    //                     setmonthHandle(field, 'today')
    //                 }}
    //                 style={{ marginLeft: 5 }}
    //             >
    //                 今日
    //             </Button>
    //         </div>
    //     )
    // }

    // const renderExtraFooter = InputItemProps.renderExtraFooter
    // return (
    //     <Form.Item label={label} name={field} {...formItemProps}>
    //         <RangePicker
//                 {...InputItemProps}
//                 open={dateOpen}
//                 disabledDate={disabledDate}
//                 onCalendarChange={changeDate}
//                 onOpenChange={onOpenChange}
//                 renderExtraFooter={
//                     renderExtraFooter
//                         ? () => renderExtraFooter(setFormAndClose)
//                         : defaultExtraFooter
//                 }
//                 allowClear={allowClear}
//                 locale='zh-cn'
//                 style={{ minWidth: 215, display: 'flex' }}
//             />
//         </Form.Item>
//     )
// }

// export const MOUNTH_PICKER = (props: { col: any; field?: string | undefined; label?: string | undefined; placeholder?: string | undefined; allowClear?: boolean | undefined; formItemProps?: {} | undefined; InputItemProps?: {} | undefined }) => {
//     let {
//         col,
//         field = '',
//         label = '',
//         placeholder = '',
//         allowClear = true,
//         formItemProps = {},
//         InputItemProps = {},
//     } = props
//     return (
//         <Form.Item label={label} name={field} {...formItemProps}>
//             <DatePicker
//                 style={{ width: '100%' }}
//                 locale='zh-cn'
//                 format='YYYY-MM'
//                 picker='month'
//                 {...InputItemProps}
//                 placeholder={placeholder}
//                 allowClear={allowClear}
//             />
//         </Form.Item>
//     )
// }

export const TEXT = (props: any) => {
    let {
        col,
        field = '',
        label = '',
        value = '',
        placeholder = '',
        allowClear = true,
        formItemProps = {},
        InputItemProps = {},
    } = props

    return (
        <Form.Item label={label} {...formItemProps}>
            <span>
                {props.initialValues
                    ? props.initialValues[field]?.toString()
                    : value || ''}
            </span>
        </Form.Item>
    )
}

// export const TIME_PICKER = (props: { col: any; field?: string | undefined; label?: string | undefined; placeholder?: string | undefined; allowClear?: boolean | undefined; formItemProps?: {} | undefined; InputItemProps?: {} | undefined }) => {
//     let {
//         col,
//         field = '',
//         label = '',
//         placeholder = '',
//         allowClear = true,
//         formItemProps = {},
//         InputItemProps = {},
//     } = props
//     return (
//         <Form.Item label={label} name={field} {...formItemProps}>
//             <DatePicker
//                 style={{ width: '100%' }}
//                 locale='zh-cn'
//                 format='YYYY-MM-DD'
//                 {...InputItemProps}
//                 placeholder={placeholder}
//                 allowClear={allowClear}
//             />
//         </Form.Item>
//     )
// }
