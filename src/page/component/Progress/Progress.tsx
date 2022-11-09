import React,{FC} from "react";
// import { ThemeProps } from "../Icon/Icon";
import './index.less'
export interface ProgressProps{
    percent?:number,
    strokeHeight?:number,
    showText?:boolean,
    styles?: React.CSSProperties;
    theme?:string
}

const Progress:FC<ProgressProps>=(props)=>{
    const {
        percent, // 进度
        strokeHeight,
        showText,
        styles,
        theme
    }=props
    return (
        <div className="newStation-progress-bar" style={styles}>
        <div className="newStation-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
          <div 
            className={`newStation-progress-bar-inner color-${theme}`}
            style={{width: `${percent}%`}}
          >
            {showText && <span className="inner-text">{`${percent||0}%`}</span>}
          </div>
        </div>
      </div>
    )
}
Progress.defaultProps={
    styles:{width:"100px",height:"10px"},
    strokeHeight: 15,
    showText: true,
    theme: 'Primary',
}
export default Progress