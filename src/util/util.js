import axios from "axios";
import { Modal,Spin,message} from 'antd';
import ReactDOM from 'react-dom';
import qs from 'qs';
const globalConfig = {
    server:process.env.REACT_APP_BASE_URL
};
const util = {};
util.navigate = null;
util.server = globalConfig.server;
util.app = null;
util.go = function(path){
    util.navigate(path);
}
util.contentType = {
    json:"application/json",
    form:"application/x-www-form-urlencoded"
};
util.post =function({
     url,
     method="post",
     loading=true,
     data={},
     responseType="json",
     success=(data)=>{},
     fail=(err)=>{},
     contentType=util.contentType.json
}){
    console.info("post:",arguments[0]);
    loading && showLoading();
    axios({
        url:globalConfig.server + url,
        method:method,
        responseType:responseType,
        data:util.contentType.form === contentType ? qs.stringify(data) : data,
        headers: {
            'content-type': contentType
        },
        withCredentials: true//携带cookie
    }).then(function(resp){
        hideLoading();
        console.info("resp:",resp);
        let data = resp.data;
        if(data.status == 1){
            //登录失效
            util.go("login");
        }else if(data.status != 0){
            // Modal.error({
            //     title:"提示信息",
            //     content:<div dangerouslySetInnerHTML={{__html:`<div>${data.msg}</div>`}}></div>
            // });
            //允许显示html信息
            message.error(<span dangerouslySetInnerHTML={{__html:`${data.msg}`}}></span>);
        }else{
            success && success(resp.data.data);
        }
    }).catch(function (err){
        loading && hideLoading();
        hideLoading();
        console.info("err:",err);
        fail && fail(err);
    })
}
let requestCount = 0
// 显示loading
function showLoading () {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)
    }
    requestCount++
}

// 隐藏loading
function hideLoading () {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}

export { util };