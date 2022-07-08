import React from "react";
import ReactDOM from "react-dom";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import moment from 'moment';
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import App from "./app";

console.info("环境",process.env.REACT_APP_BASE_URL)
moment.locale('zh-cn');

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
);
