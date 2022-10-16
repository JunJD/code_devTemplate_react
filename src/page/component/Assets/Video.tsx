import React, { useEffect, VideoHTMLAttributes } from 'react'
import classNames from "classnames"
import isMousewheel from '@src/utils/isMousewheel'
import './index.less'
interface IBaseVideoProps {
    ext?: 
    | 'mp4'
    | 'webm'
    | 'ogg',
    name: string
}

// video的属性和自定义类型的交叉类型
export type IVideoProps = IBaseVideoProps & VideoHTMLAttributes<HTMLElement> 

const Video: React.FC<IVideoProps>  = ( props ) => {
    const { name, ext, className, ...restProps } = props
    const classes = classNames( "videoElement", className )
    useEffect(()=>{
      // chrome
      isMousewheel('ban')
      return ()=>{
        isMousewheel('allow')
      }
    },[])
  return (
    <video {...restProps} className={ classes } src={require(`./../../../assets/videos/${name}.${ext}`)}> 
        <source  type={`video/${ext}`} />
    </video>
  )
}

//Default Video status
Video.defaultProps={ ext:'mp4', autoPlay:true, muted:true, playsInline:true, loop:true }

export default Video