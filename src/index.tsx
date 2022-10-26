import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import '@src/index.less';
import { Provider } from "react-redux";
import App from '@src/App';
import { persistor, store } from '@src/redux';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  
);
