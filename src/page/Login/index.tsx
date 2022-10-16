import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'
import { Button, Card, message } from 'antd'
import Video from '@src/page/component/Assets/Video' // 不在assets/video文件的视频无法使用此组件
import LoginForm from './LoginForm'
import myRequest from '@src/utils/myAxios'
import { setCookie } from '@src/utils/cookie'
export interface IRequestLoginParams {
  name: string,
  password: string,
  remember: boolean
}

const Login: React.FC  = () => {
    const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const requestLogin = ({ name, password, remember }: IRequestLoginParams) => {
    setLoading(true);
    myRequest( `${process.env.REACT_APP_loginPath}`, { name, password } ).then(
        res=>{
            if(res.success) {
            message.success('欢迎进入后台管理系统');
            // 登录成功后 判断是否选择了勾选密码
            if (remember) {
                setCookie('userName', name, 30)
                setCookie('userPwd', password, 30) // 未加密
              }  else {
                 setCookie('userName', '', 30)
                 setCookie('userPwd', '', 30 )
              }
              setTimeout(() => {
                  navigate(`/${process.env.REACT_APP_homePath}`);
              }, 500);
            }
            setLoading(false);


        }
    )
  }
  return (
    
    <div  className="content">
      
    <Video ext='mp4' name='login_bg_media'/>

    <div style={{width:"25%",position:"absolute",left:"50%",top:"50%",marginTop:"-220px",marginLeft:"220px"}}>
        <LoginForm onLogin={requestLogin} loading={loading}/>
    </div>
    </div>
  )
}
export default Login