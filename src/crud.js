import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import '../node_modules/amis/lib/themes/cxd.css';
// import '../node_modules/amis/lib/themes/antd.css';
import '../node_modules/amis/lib/helper.css';
import '../node_modules/amis/sdk/iconfont.css';

import {render as renderAmis, ToastComponent, AlertComponent, toast} from 'amis';
import {util} from "./util/util";
import axios from "axios";

class Crud extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            schema:{
                type:"page",
                title:"简单页面",
                body:"内容"
            }
        }
    }
    componentDidMount() {
        console.info(this);
        util.post({
            url:`/admin/page/json/${this.props.code}`,
            success:(resp)=>{
                console.info("menu",resp);
                this.setState({
                    schema:resp
                })
            }
        })
    }

    render() {
        let amisScoped;
        let theme = 'cxd';
        let locale = 'zh-CN';
        let me = this;
        return (<div>
            <ToastComponent
                theme={theme}
                key="toast"
                position={'top-right'}
                locale={locale}
            />
            <AlertComponent theme={theme} key="alert" locale={locale} />
            {renderAmis(me.state.schema,
            {
                locale: 'zh-CN' ,// 请参考「多语言」的文档
                scopeRef: (ref) => (amisScoped = ref)  // 功能和前面 SDK 的 amisScoped 一样
            },
            {
                isCancel:(value) => {
                    axios.isCancel(value)
                },
                fetcher:({
                    url,
                    method,
                    data,
                    responseType,
                    config,
                    headers
                })=>{
                    console.log("url",url);
                    url = url.startsWith("/") ? util.server+url : url;
                    config = config || {};
                    config.headers = headers || {};
                    config.withCredentials = true;
                    responseType && (config.responseType = responseType);
                    if (config.cancelExecutor) {
                        config.cancelToken = new (axios).CancelToken(
                            config.cancelExecutor
                        );
                    }
                    if (method !== 'post' && method !== 'put' && method !== 'patch') {
                        if (data) {
                            config.params = data;
                        }
                        return (axios)[method](url, config);
                    } else if (data && data instanceof FormData) {
                        config.headers = config.headers || {};
                        config.headers['Content-Type'] = 'multipart/form-data';
                    } else if (
                        data &&
                        typeof data !== 'string' &&
                        !(data instanceof Blob) &&
                        !(data instanceof ArrayBuffer)
                    ) {
                        data = JSON.stringify(data);
                        config.headers = config.headers || {};
                        config.headers['Content-Type'] = 'application/json';
                    }
                    return axios[method](url,data,config).then(resp=>{
                        console.info("amis",resp);
                        if(resp.data.status == 1){
                            util.go("/login");
                        }else{
                            util.replaceImages(resp);
                        }
                        return resp;
                    })
                },
                responseAdaptor: (api, response, query, request)=>{
                    console.info("respAdaptor",response);
                    if(response.status == 1){
                        //需要登录;
                        util.go("/login");
                    }
                    return response;
                },
                requestAdaptor:(api)=>{
                    console.info("api",api);
                    return api;
                },
                theme
            },
            )}
        </div>);
    }
}

export {Crud}