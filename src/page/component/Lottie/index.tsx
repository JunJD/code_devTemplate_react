import React, { FC } from 'react';
import './index.less';
import { useLottie } from "lottie-react"; // 接受json格式文件 转成动画
import classNames from 'classnames';

type ISize = 'large' | 'middle' | 'small' | 'mini'

interface ILottie {
    animationData: Object,
    size?: ISize,
    isShow?: boolean | undefined
}

const Lottie:FC<ILottie> = (props) => {
  const { animationData, size, isShow = true  } = props

  const classs = classNames( 'lottieCon' , {
   'isShow': isShow,
    [`lottie_${size}`]: size
  })

  const style = {
    width:'100%',
  };
  
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };
  
  const { View } = useLottie( options, style );

  return (
    <div className={ classs } >
      { View }
    </div>
  )
}
export default Lottie;
