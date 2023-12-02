import React, { useContext, useState } from 'react';
import {  AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import './login.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
const Login = () => {
    const navigate  = useNavigate()
    const{token_d,login} = useContext(UserContext);
    const [showPassword,setShowpassword] =useState(false);
    const [loginFormData, setLoginFormData] = useState({
        username: '',
        password: '',
      });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = {
            username: loginFormData.username,
            password: loginFormData.password,
          };
      
          const response = await axios.post("https://stg.dhunjam.in/account/admin/login", formData);
          console.log(response.data);
          const { token } = response.data.data;
          token_d(token);
            // if (response.response === "success") {
                navigate('/dashboard')
            // }

    } catch (error) {
      console.error("Login failed:", error);

    }finally{
        setLoginFormData({ ...loginFormData, 
            username: '',
            password: '', 
        })
    }
  };
 
    const handlePasswordVisibility = () => {
        setShowpassword(!showPassword);
      }

  return (
    <div className="login-container">
      <h1>Venue Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
        <input type="text" 
        placeholder="Username" 
        name="username"
        value={loginFormData.username}
        onChange={(e) => {
          setLoginFormData({ ...loginFormData, username: e.target.value });

        }}
        required
        />

        </div>
        <div className="input">
        <input  type={showPassword ? 'text' : 'password'} 
         name="password"
         value={loginFormData.password}
         onChange={(e) => {
           setLoginFormData({ ...loginFormData, password: e.target.value });
         }}
         required
        placeholder="Password" />
        <span
                className="password-visibility"
                onClick={handlePasswordVisibility}
                >
                {showPassword ? 
                < AiFillEyeInvisible style={{fontSize:'30px',color:'#FFFFFF'}}/> :
                <AiFillEye style={{fontSize:'30px',color:'#FFFFFF'}}/>}
              </span>
                </div>
        <button type="submit">Sign in</button>
      </form>
      <Link to='/'>New Registration ?</Link>
    </div>
  );
};

export default Login;
