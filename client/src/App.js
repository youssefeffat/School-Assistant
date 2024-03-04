import {Route, Routes} from 'react-router';
import {Navigate} from 'react-router-dom';
// import { useEffect, useState } from 'react';
import './App.css';
import MyNavbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import AdminDashboard from './Components/AdminDashboard';
import AdminLogin from './Components/AdminLogin';
import Contact from './Components/Contact';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Logout from './Components/Logout';
import LoginAdmin from './Components/LoginAdmin';


function App() {
  
  // const checkAuthenticated = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3001/Authentification/verify", {
  //       method: "POST",
  //       headers: { jwt_token: localStorage.token }
  //     });

  //     const parseRes = await res.json();

  //     parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // useEffect(() => {
  //   checkAuthenticated();
  // }, []); 

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const setAuth = boolean => {
  //   setIsAuthenticated(boolean);
  // };

  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const updateLoggedIn = () => {
  //   setLoggedIn(!isLoggedIn);
  // };
 
 // console.log("App.js",isLoggedIn);    no prb here

  return (
    <>
    <MyNavbar/>
  
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route exact path="/About" element={<About/>} />
        <Route exact path="/Contact" element={<Contact/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/LoginAdmin" element={<LoginAdmin/>}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/Logout" element={<Logout/>}/>
        <Route  path="/Dashboard" element={<Dashboard/>} />
        <Route  path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route  path="/AdminLogin" element={<AdminLogin/>} /> 
      <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    
      <Footer/>
           
    
    </>
  );

}

export default App;
