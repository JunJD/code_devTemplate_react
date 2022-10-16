import React, { useEffect } from 'react';
import Router from "@src/routers";
import AuthRouter from '@src/routers/utils/authRouter';
function App() {
  return (
    <div style={{width:`${document.body.clientWidth}px`,margin:'0 auto',position:"relative",height:"100vh"}}>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </div>
       
  );
}
export default App;
