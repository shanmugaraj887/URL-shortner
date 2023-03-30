import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Signup from './Components/Signup';
import Login from './Components/Login';
import Verification from './Components/Verification';
import { createContext, useState } from 'react';
import Forget from './Components/Forget';
import VerifyComplete from './Components/VerifyComplete';
import ShortURLS from './Components/ShortURLS';
import PasswordChange from './Components/PasswordChange';
import ListUrls from './Components/ListUrls';
function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify_link/:username/:id" element={<VerifyComplete />} />
        <Route path="/verification-link/:username/:id" element={<Verification />} />
        <Route path="/password-change/:username" element={<Protectedroute><PasswordChange /></Protectedroute>} />
        <Route path="/forgetpassword" element={<Forget />} />
        <Route path="/urlshorteners/:id" element={<Protectedroute><ShortURLS /></Protectedroute>} />
      </Routes>




    </div>
  );
}
function Protectedroute({ children }) {
  const navigate = useNavigate()
  const isAuth = localStorage.getItem('token')
  if (isAuth) {
    return (
      children
    )
  } else {
    navigate("/login")
  }

}




export default App;
