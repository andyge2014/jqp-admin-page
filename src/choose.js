import Title from "antd/lib/typography/Title";
import React from "react";
import {Button, Form, Image, Input,List,Avatar,Card} from "antd";
import './css/login.css'
import {util} from "./util/util";

class Choose extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        };
    }
    componentDidMount(){
        let me = this;
        util.post({
            url:"/admin/user/login/getUserChooseEnterprise",
            success:function (data){
                console.log("data",data);
                me.setState({
                    items:data
                });
            }
        })
    }
    choose(id){
        util.post({
            url:"/admin/user/login/userChooseEnterprise",
            contentType:util.contentType.form,
            data:{
                enterpriseId:id
            },
            success:function(data){
                console.log(data)
                util.go("/")
            }
        })
    }
    render(){
        return <div className="login-bg"><Form
            name="basic"
            className="choose"
            size="large"
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Title level={3} style={{marginBottom:30}}>选择企业</Title>
            {
                this.state.items.map((item,index)=>{
                    return <Card
                        hoverable
                        onClick={()=>{this.choose(item.id)}}
                        key={index}
                    >
                        <Card.Meta title={item.name} avatar={<Avatar src={util.server+item.logo}></Avatar>}/>
                    </Card>
                })
            }

        </Form></div>
    }
}

export {Choose}