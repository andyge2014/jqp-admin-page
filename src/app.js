import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import {Login} from "./login";
import {Home} from "./home";
const token = localStorage.getItem("token");
const app = token ? <Home/> :<Login/>
class App extends Component{
    render() {
        return <div>
            <Routes>
                <Route path="/" exact={false} element={app}></Route>
                <Route path="/login" exact={false} element={<Login/>}></Route>
                <Route path="/home" exact={false} element={<Home/>}></Route>
            </Routes>
        </div>
    }
}

export default App