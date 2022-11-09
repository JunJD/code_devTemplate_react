import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import Progress from '@src/page/component/Progress/Progress'
function Home() {
  const [percent, setPercent] = useState(0)
  useEffect(()=>{
    const timer = setInterval(()=>{
      setPercent(pre=>{
        return pre+5
      })
    },300)
    return ()=>{
      clearInterval(timer)
    }
  },[])
  return (
    <div className='layout' >
      <Progress percent={percent}  />
      <div className='aside'>

      </div>
      <div className='main' >
        <button className='button ceshi'>我是测试less的按钮1</button>
      </div>
    </div>
  );
}
export default Home;
