import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import '../node_modules/amis/lib/themes/cxd.css';
import '../node_modules/amis/lib/themes/antd.css';
import '../node_modules/amis/lib/helper.css';
import '../node_modules/amis/sdk/iconfont.css';


import {render as renderAmis, ToastComponent, AlertComponent} from 'amis';

// ========================================

ReactDOM.render(
    <div>{
        renderAmis({
            // 这里是 amis 的 Json 配置。
            type: 'page',
            title: '简单页面',
            body: '内容'
        },{

        },{
            theme: 'antd' // cxd 或 antd
        })
    }</div>,
  document.getElementById('root')
);
