import React from 'react';
import ReactDOM from 'react-dom/client';
import '@src/index.less';
import App from './App';
import Login from '@src/page/Login'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Login/>
);
