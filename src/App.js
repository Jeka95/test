import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";


import './App.css';

import Login from "./Login";
import Register from "./Register";
import Timer from "./Timer";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} ></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/timer" exact component={Timer}></Route>
      </Router>
    </div>
  );
}

export default App;
