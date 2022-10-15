import {FormItem} from '@src/page/components/modalForm';
export default [
    {
        type: "COMMON_INPUT",
        label: "登录账号",
        field: "configName",
        allowClear: false,
        Width: 300,
        formItemProps: {
            rules: [{ required: true, message: '登录账号' }]
        }
    },
    {
        type: "COMMON_INPUT",
        label: "登录密码",
        htmlType:"Password",
        field: "password",
        allowClear: false,
        formItemProps:{
            rules:[{required:true,message:'请填写登录密码'}]
        }
    }
] as unknown as FormItem[]