import React, { useState, useContext}from 'react';
import './App.css';
import Home from './Home';
import Employee from './Employee';
import Department from './Department';
import Login from './Login';
import { Routes, Route, Link } from "react-router-dom";
import NavBar from './NavBar';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { LoggedInContext } from './Helper/Context';
import Facebook from './Components/facebook';





function App(){
  
  const [LoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <LoggedInContext.Provider value={{LoggedIn,setLoggedIn}}>
        <div>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/Home" element={<Home />}/>
            <Route path="/Employee" element={<Employee />}/>
            <Route path="/Department" element={<Department />}/>
          </Routes>
        </div>
      </LoggedInContext.Provider>
      
    </div>
  );
};

export default App;
