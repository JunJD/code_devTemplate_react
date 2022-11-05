import React, { FC } from 'react';
import './index.less';
import { useLottie, useLottieInteractivity } from "lottie-react"; // 接受json格式文件 转成动画
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
    // initialSegment:[]
  };
  
  const lottieObj = useLottie( options, style );
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "cursor",
    actions: [
      {
        position: { x: [0, 1], y: [-1, 2] },
        type: "stop",
        frames: [0, 10000],
      },
      {
        position: { x: -1, y: -1 },
        type: "play",
        frames: [100],
      },
    ],
  });
  return (
    <div className={ classs } >
       {lottieObj.View} 
    </div>
  )
}
export default Lottie;
