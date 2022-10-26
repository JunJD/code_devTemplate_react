import { Input, InputNumber, Form, Select ,DatePicker } from "antd"
import React, { useMemo } from "react"

const EditableCell:React.FC<any> = ( props ) => {
    const { inputType, editing, dataIndex, title, children, ...restProps } = props


    const InputTable = useMemo(()=>{
        console.log(inputType)
            switch (inputType) {
                case "number":
                    return (
                        <InputNumber {...restProps}/>
                    )
                case "select":
                    console.log('select',111)
                    return (
                        <Select {...restProps} />
                    )
                case "timePicker":
                    return (
                        <DatePicker {...restProps} />
                    )
                default:
                    return <Input  {...restProps} />
            }
        
    },[ inputType ])

    return (
        <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {InputTable}
                </Form.Item>
            ) : (
              children
            )}
        </td>
    )
}

export default EditableCell