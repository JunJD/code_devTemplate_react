import React from 'react';
import '@src/App.less';
import {Button} from 'antd'
import { useEffect } from 'react';
import Login from '@src/page/Login'
function Home() {
  useEffect(()=>{
    console.log(process.env)
  },[])
  return (
    <div className="App">
      
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button type='primary'>L112earn Rea123ct</Button>
        </a>
      </header>
     
    </div>
  );
}
export default Home;
