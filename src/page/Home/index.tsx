import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import Progress from '@src/page/component/Progress/Progress'
import { useSelector } from 'react-redux';
import authRouter from '@src/routers/utils/authRouter';
import { RootState } from '@src/redux';
function Home() {
  const [percent] = useState(10)
	const { token } = useSelector((state: RootState) => state.global);
  return (
    <div className='layout' >
      <Progress percent={percent}  />
      <div className='aside'>

      </div>
      <div className='main' >
        <button className='button ceshi'>{token}</button>
      </div>
    </div>
  );
}
export default Home;
