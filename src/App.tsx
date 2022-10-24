import React, { useEffect, useState } from 'react';
import Router from "@src/routers";
import AuthRouter from '@src/routers/utils/authRouter';
import { useRef } from 'react';
function App() {

  const [screenWidth, setscreenWidth] = useState(document.body.clientWidth)

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			console.log('resize')
			return (() => {
				setscreenWidth(document.body.clientWidth);
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
	}, []);

  return (
    <div style={{width:screenWidth,margin:'0 auto',position:"relative",height:"100vh"}}>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </div>
       
  );
}
export default App;
