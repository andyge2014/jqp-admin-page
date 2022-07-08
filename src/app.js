import React, {Component} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "./login";
import {Choose} from "./choose";
import {Home} from "./home";
import {util} from "./util/util";

function App(){
    util.navigate = useNavigate()
    return <div>
        <Routes>
            <Route path="/" exact={false} element={<Home/>}></Route>
            <Route path="/login" exact={false} element={<Login/>}></Route>
            <Route path="/choose" exact={false} element={<Choose/>}></Route>
        </Routes>
    </div>
}

export default App