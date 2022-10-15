import React from 'react';
import ReactDOM from 'react-dom/client';
import '@src/index.less';
import Router from "@src/routers";
import {BrowserRouter} from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
      <Router/>
  </BrowserRouter>
  
);
