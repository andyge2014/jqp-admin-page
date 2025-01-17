import React,{Suspense} from "react";
import {DownOutlined} from '@ant-design/icons';
import {util} from "./util/util";
import {Avatar, Button, Dropdown, Input, Layout, Menu, Space, Tabs} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
window.onmessage = (e,orgin)=>{
    console.info("onmessage",e,orgin);
    if(e && e.data === "login"){
        util.go("/login")
    }
}


class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:{
                menus:[]
            },
            tabs:[],
            activeKey:"index"
        };
    }
    componentDidMount() {
        let me = this;
        util.post({
            url:"/admin/user/getUserSession",
            loading:false,
            success:(data)=>{
                console.info(data);
                me.setState({
                    user:data
                })
            }
        })
    }
    logout(){
        util.post({
            url:"/admin/user/postLogout",
            success:()=>{
                util.go("/login")
            }
        })
    }
    updatePassword(){
        this.addTab({
            menuName:"修改密码",
            id:"updatePassword",
            url:"/admin/lyear_pages_edit_pwd.html"
        })
    }
    addTab(menu){
        for(let i=0;i<this.state.tabs.length;i++){
            let tab = this.state.tabs[i];
            if(tab.id === menu.id){
                this.setState({
                    activeKey:tab.id+""
                })
                return;
            }
        }
        this.state.tabs.push({
            ...menu
        });
        this.setState({
            tabs:this.state.tabs,
            activeKey:menu.id+""
        })
    }
    tabRemove(key){
        for(let i=0;i<this.state.tabs.length;i++){
            let tab = this.state.tabs[i];
            if(tab.id+"" === key){
                this.state.tabs.splice(i,1);
                let curKey = "index";
                if(this.state.tabs.length>0){
                    i--;
                    if(i<0){
                        i=0;
                    }
                    curKey = this.state.tabs[i].id+"";
                }
                this.setState({
                    tabs:this.state.tabs,
                    activeKey:curKey
                })
                return;
            }
        }
    }
    buildMenu(menu){
        if(menu.flag === false){
            return null;
        }
        if(menu.children && menu.children.length > 0){
            return <Menu.SubMenu key={menu.id} title={menu.menuName}>
                {
                    menu.children.map((child,index)=>{
                        return this.buildMenu(child)
                    })
                }
            </Menu.SubMenu>
        }else{
            return <Menu.Item onClick={()=>{this.addTab(menu)}} key={menu.id}>{menu.menuName}</Menu.Item>
        }
    }
    filterMenu(text,menus){
        let init=false;
        if(!menus){
            menus = this.state.user.menus;
            init = true;
        }
        let flag = false;
        for(let i=0;i<menus.length;i++){
            let menu = menus[i]
            let curFlag = false;
            if(text == "" || menu.menuName.indexOf(text)>-1){
                curFlag = true;
                flag = true;
            }
            if(menu.children != null && menu.children.length>0){
                menu.flag = this.filterMenu(text,menu.children) || curFlag;
            }else{
                menu.flag = curFlag;
            }
        }
        if(init){
            this.setState({
                user:this.state.user
            })
        }
        return text == "" || flag;
    }
    render() {
        return <Layout  style={{position:"absolute",height:"100%",width:"100%"}}>
            <Sider theme={"light"} style={{height:"100%",overflowX:"hidden",borderRight:"1px slid #ddd"}}>
                <div style={{position:"fixed",width:"200px",zIndex:2,height:"89px",padding:"10px",top:0,background:"white",textAlign:"center"}}>
                    <Avatar src={util.server+this.state.user.avatar} size={"large"}></Avatar>
                    <Dropdown overlay={
                            <Menu>
                                <Menu.Item key={"updatePassword"} onClick={()=>{this.updatePassword()}}>修改密码</Menu.Item>
                                <Menu.Item key={"logout"} onClick={this.logout}>退出系统</Menu.Item>
                            </Menu>
                        }>
                        <Space>
                            <span>{this.state.user.name}</span>
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                    <Input placeholder={"关键字搜索"} onChange={(e)=>{
                        this.filterMenu(e.target.value);
                    }}/>
                </div>

                <Menu mode={"inline"} style={{border:"none",marginTop:"120px"}}>
                    {this.state.user.menus.map((menu,index)=>{
                        return this.buildMenu(menu)
                    })}
                </Menu>
            </Sider>
            <Layout style={{height:"100%",borderLeft:"1px solid #ddd"}}>
                <Content>
                    <Tabs activeKey={this.state.activeKey}
                          style={{height:"100%",width:"100%"}}
                          defaultActiveKey="index"
                          type="editable-card"
                          hideAdd={true}
                          onTabClick={(key)=>{
                              this.setState({
                                  activeKey:key
                              })
                          }}
                          onEdit={(key,action)=>{
                              this.tabRemove(key)
                          }}
                          tabBarExtraContent={<Button style={{marginRight:10}}
                          onClick={()=>{
                              this.setState({
                                  activeKey:"index",
                                  tabs:[]
                              })
                          }}>关闭全部</Button>}
                    >
                        <TabPane tab="首页" key="index" style={{height:"100%",overflow:"auto",width:"100%",background:"white"}} >
                            首页
                        </TabPane>
                        {
                            this.state.tabs.map((tab,index)=>{
                                return <TabPane
                                tab={tab.menuName} key={tab.id+""} style={{height:"100%",width:"100%"}} >
                                    {
                                        (()=>{
                                            let cmp = null;
                                            if(tab.url.startsWith("/")){
                                                cmp = <iframe
                                                    src={util.server+tab.url}
                                                    style={{height:"100%",width:"100%"}}
                                                    frameBorder={0}
                                                ></iframe>;
                                            }else if(tab.url.startsWith("http")){
                                                cmp = <iframe
                                                    src={tab.url}
                                                    style={{height:"100%",width:"100%"}}
                                                    frameBorder={0}
                                                ></iframe>;
                                            }else{
                                                const OtherComp = React.lazy(async ()=> import("./"+tab.url));
                                                cmp = <Suspense fallback={<div>Loading ....</div>}><OtherComp/></Suspense>
                                            }
                                            return cmp;
                                        })()
                                    }
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Content>
            </Layout>
        </Layout>
    }
}

export {Home}
