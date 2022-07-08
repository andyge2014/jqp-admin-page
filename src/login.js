import {Button, Form, Image, Input} from "antd";
import Title from "antd/lib/typography/Title";
import {UserOutlined} from "@ant-design/icons";
import React from "react";
import {util} from "./util/util";
import './css/login.css'


class Login extends React.Component{
    getImgCode(){
        return util.server+"/captcha.png?v="+new Date().getTime()
    }
    onFinishFailed(errorInfo){
        console.log('Failed:', errorInfo);
    }
    onFinish(values)  {
        util.post({
            url:"/admin/user/postLogin",
            data:values,
            success:function(data){
                if(data == "choose"){
                    util.go("/choose")
                }else{
                    util.go("/");
                }
            }
        })
    };
    render() {
        return <div className="login-bg"><Form
            name="basic"
            className="login"
            size="large"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
        >
            <Title level={3} style={{marginBottom:30}}>jqp低代码平台</Title>
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input placeholder="请输入用户名" suffix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
                name="captcha"
                rules={[{ required: true, message: '请输入验证码' }]}
            >
                <Input placeholder="请输入验证码" suffix={<Image preview={false} onClick={(i)=>{
                    i.target.src=this.getImgCode();
                }} src={this.getImgCode()}></Image>} />
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    立即登录
                </Button>
            </Form.Item>
        </Form></div>
    }
}

export {Login}