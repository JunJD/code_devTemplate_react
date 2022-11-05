import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'
import { Button, Card, Col, message, Row } from 'antd'
import LOTTIE_ANIM_JSON from "./../../assets/lotties/login非logo.json";
import LoginForm from './LoginForm'
import myRequest from '@src/utils/myAxios'
import { setCookie } from '@src/utils/cookie'
import { useDispatch } from "@src/redux";
import { setAuthRouter } from '@src/redux/modules/auth/reducer'
import Lottie from '../component/Lottie'
export interface IRequestLoginParams {
  name: string,
  password: string,
  remember: boolean
}

const Login: React.FC  = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const requestLogin = ({ name, password, remember }: IRequestLoginParams) => {
    console.log(name, password, remember)
    setLoading(true);
    myRequest( `${process.env.REACT_APP_loginPath}`, { name, password } ).then(
        res=>{
            if(res.success) {
            message.success('欢迎进入后台管理系统');
            dispatch(setAuthRouter(['/ceshiyemian']))
            // dispatch(setToken(token));
            // 登录成功后 判断是否选择了勾选密码
            if (remember) {
                setCookie('userName', name, 30)
                setCookie('userPwd', password, 30) // 密码未加密
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
    <div className='containerLogin' >
      <Row>   
        <Col span={17} push={1} >
          <Lottie animationData={ LOTTIE_ANIM_JSON }  />
        </Col>
        <Col span={5}>
              <LoginForm onLogin={requestLogin} loading={loading}/>
        </Col>
      </Row>
    </div>
  )
}
export default Login