import React, { useRef, useState } from 'react';
import './index.less';

import Lottie from "@src/page/component/Lottie";
import ANIJSON from '@src/assets/lotties/login非logo.json'
function Home() {
  return (
    <div style={{display:'flex'}} >
      <Lottie animationData={ANIJSON} />
    </div>
  );
}
export default Home;
