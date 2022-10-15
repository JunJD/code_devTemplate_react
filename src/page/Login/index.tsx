import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'
import { Button, Card, message } from 'antd'
import Video from '@src/page/component/Assets/Video' // 不在assets/video文件的视频无法使用此组件
import LoginForm from './LoginForm'
import myRequest from '@src/utils/myAxios'
import { setCookie } from '@src/utils/cookie'

const Login: React.FC  = () => {
    const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const queryLogin = ({name,password,remember}: any) => {
    setLoading(true);
    myRequest('login',{name,password}).then(
        (res:any)=>{
            if(res.success) {
            message.success(res.message);
            // 登录成功后 判断是否选择了勾选密码
            if (remember) {
                setCookie('userName', name, 30)
                setCookie('userPwd', password, 30)
              }  else {
                 setCookie('userName', '', 30)
                 setCookie('userPwd', '', 30 )
              }
              setTimeout(() => {
                  navigate('/app');
              }, 1000);
            }
            setLoading(false);


        }
    )
  }
  return (
    
    <div  className="content">
    <Video ext='mp4' name='login_bg_media'/>
    <div style={{position:'absolute',bottom:'50%',marginBottom:"-248px",right:'10%',display:'flex',width:"400px",height:"500px", justifyContent: "space-around"}}>
        <LoginForm onLogin={queryLogin} loading={loading}/>
    </div>
    </div>
  )
}
export default Login