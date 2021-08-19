import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ConfigProvider } from 'zarm';
import 'zarm/dist/zarm.css';
import Vant from 'vant';
import 'vant/lib/index.css';

ReactDOM.render(
  <ConfigProvider primaryColor="#007fff">
    <App />
  </ConfigProvider>,
  document.getElementById('root')

)
