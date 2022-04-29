import {Button, Form, Image, Input} from "antd";
import Title from "antd/lib/typography/Title";
import {UserOutlined} from "@ant-design/icons";
import React from "react";
import {util} from "./util/util";
import './css/login.css'
const getImgCode = ()=>{
    return util.server+"captcha.png?v="+new Date().getTime()
}

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Login(){
    return <div className="login-bg"><Form
        name="basic"
        className="login"
        size="large"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
            name="imgCode"
            rules={[{ required: true, message: '请输入验证码' }]}
        >
            <Input placeholder="请输入验证码" suffix={<Image preview={false} onClick={(i)=>{
                i.target.src=getImgCode();
            }} src={getImgCode()}></Image>} />
        </Form.Item>

        <Form.Item>
            <Button block type="primary" htmlType="submit">
                立即登录
            </Button>
        </Form.Item>
    </Form></div>
}

export {Login}