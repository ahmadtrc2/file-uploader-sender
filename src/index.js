import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouteManager from './RouteManager';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HashRouter>
    <div dir='rtl'>
      <ReactNotifications />
    </div>
    <RouteManager />
  </HashRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
