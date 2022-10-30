import React, { useEffect, useState } from 'react';
import Router from "@src/routers";
import AuthRouter from '@src/routers/utils/authRouter';


const App:React.FC = () => {
  const [ screenWidth, setScreenWidth]  = useState(document.body.clientWidth)

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				setScreenWidth(document.body.clientWidth );
			})();
		};
	};
  useEffect(()=>{
    listeningWindow()
  },[])
  return (
    <div style={ { width:screenWidth, margin:'0 auto', height:"100vh" } }>

      <AuthRouter>
        <Router />
      </AuthRouter>

    </div>
       
  );
}
export default App;
