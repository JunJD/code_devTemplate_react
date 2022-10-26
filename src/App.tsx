import React, { useEffect, useState } from 'react';
import Router from "@src/routers";
import AuthRouter from '@src/routers/utils/authRouter';
import useNowSize from './hooks/useNowSize';
function App() {
  const [ nowSize ] = useNowSize()
  return (
    <div style={{width:nowSize*Number(process.env.REACT_APP_SCREENWIDTH),margin:'0 auto',position:"relative",height:"100vh"}}>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </div>
       
  );
}
export default App;
