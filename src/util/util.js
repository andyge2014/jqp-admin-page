import axios from "axios";

const config = {
    server:"http://localhost:8080/"
};
const util = {};
util.server = config.server;
util.post = function(config){
    console.info("post:",config);
    axios({
        url:config.server + config.url,
        method:config.method || 'post',
        responseType:config.responseType || 'json',
        data:config.data
    }).then(function(resp){
        console.info("resp:",resp);
        config.success && config.success(resp);
    }).catch(function (err){
        console.info("err:",err);
        config.fail && config.fail(err);
    })
}

export { util };