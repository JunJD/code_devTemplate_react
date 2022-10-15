/**
 * 弹窗表单组件
 */
import { Col, Form ,Row, Select } from 'antd';
import { FormProps } from 'antd';
 import React, { HTMLAttributes, ReactNode } from 'react'; // Fragment
 import * as FormItems from './modalFormItem';
 import './layout.module.less';
 const Option = Select.Option
 
 declare type StoreValue = any;
 interface Store {
     [name: string]: StoreValue;
 }
 interface IBaseProps extends HTMLAttributes<any> {
     form:any;
     children?: ReactNode;
     initialValues?: Store;
     formItemOptions?: FormItem[];
     inModal?: boolean;
     onFieldsChange?:any
 }
 
 
 type IProps  =  Partial<IBaseProps & FormProps> 
 
 interface SelectOption {
     text: String;
     value: any;
 }
 
 interface ItemType {
     type:
     | 'COMMON_INPUT_TEXT'
     | 'COMMON_INPUT'
     | 'COMMON_INPUT_NUMBER'
     | 'COMMON_SELECT'
     | 'RANGE_PICKER'
     | 'MOUNTH_PICKER'
     | 'TEXT';
 }
 interface RangeValue {
     rangeValue: [string, string];
 }
 interface RangeSettleMent {
     rangeValue?: RangeValue | string[];
     item?: string;
 }
 
 export interface FormItem {
     label: string;
     field: string;
     span?: number;
     type?: any /* ItemType */;
     placeholder?: string;
     allowClear?: boolean;
     options?: [SelectOption];
     list?: any[] | (() => any[]);
     rangePcikerSettle?: {
         rangeValue: RangeValue;
     };
     col?: number;
     selectNodeOption?: {
         value: string;
         name: string;
     };
     formItemProps?: any;
     InputItemProps?: any;
     render?: any;
     rangeValue?: RangeValue | string[];
 }
 const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 18 },
 }
 
 const ModalForm = (props: IProps) => {
 
     const { form:mform, children, initialValues, formItemOptions: formList, inModal, ...resetProps } = props
 
     const initForm = () => {
         const formRows: JSX.Element[] = []
         if (formList && formList.length > 0) {
             formList.forEach((item, i) => {
                 let {
                     col,
                     field = '',
                     label = '',
                     formItemProps = {},
                     InputItemProps = {},
                 } = item
                     const { type = 'TEXT' } = item
                     const Tel = FormItems[type]

                     let FormControlTemplate = (
                        <Col
                        span={col ? col : inModal ? 24 : 12}
                        style={{ textAlign: 'left' }}
                        key={field}
                    >
                         <Tel
                             key={item.field}
                             {...item}
                             inModal={inModal}
                             initialValues={initialValues}
                         />
                    </Col>
                     )
                 formRows.push(FormControlTemplate)
             })
         }
         return formRows
     }
 
     return (
         <div className={['easy-form-layout', props.className].join(' ')}>
             <Form
                 {...formItemLayout}
                 form={mform}
                 initialValues={initialValues || {}}
                 onFieldsChange={props?.onFieldsChange}
                 {...resetProps}
             >
                <Row gutter={12}>
                {initForm()}
                </Row>
             </Form>
         </div>
     )
 }
 
 export default ModalForm
 