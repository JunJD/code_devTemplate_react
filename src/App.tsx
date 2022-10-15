import React from 'react';
import '@src/App.less';
import {Button} from 'antd'
import { useEffect } from 'react';
import Login from '@src/page/Login'
function App() {
  useEffect(()=>{
    console.log(process.env)
  },[])
  return (
    <div className="App">
       <Login/>
      
     
    </div>
  );
}
export default App;
