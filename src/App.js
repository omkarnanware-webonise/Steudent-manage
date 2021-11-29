// import logo from './logo.svg';
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import Home from "./pages/Home";
import Login from "./Login";
import studentInfo from "./pages/studentInfo";
import RegisterUser from "./pages/RegisterUser";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/studentInfo" component={studentInfo} />
        <Route exact path="/registerUser" component={RegisterUser} />
      </Switch>
    </div>
  );
}

export default App;
