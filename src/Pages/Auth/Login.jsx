import React, { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { validateEmail } from './valideEmail';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { UserContext } from '../../ContextApi/User';
const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [hide, sethide] = useState(true); // State to toggle password visibility
  const navigate = useNavigate();
  const  {updateUser}  = useContext(UserContext)

    const sendData = async()=>{
      try {
        
        const result = await axios.post(
          "http://localhost:3000/api/auth/login",
          { email, password },
          { withCredentials: true } 
      );
        console.log("result", result);
        
        const User = result.data.user;
        const Token = result.data.token;
        updateUser(User, Token)
        console.log(User);
        if(User.role=="member")

          {
            navigate("/user/dashboard")
          }
          else
          {
            navigate("/admin/dashboard")
          }
        

        console.log("Authorized");
        
        

      } catch (error) {
        if (error.response) {
            console.log("Error Status:", error.response.status);  // 401
            console.log("Error Data:", error.response.data);      // Backend message
    
            // Extract and set the backend error message
            seterror(error.response.data.message || "Unauthorized Access");
        } else if (error.request) {
            console.log("No response received:", error.request);
            seterror("Server is not responding.");
        } else {
            console.log("Request error:", error.message);
            seterror("An unexpected error occurred.");
        }
    }
    
      
    }

  const handelRequest = async (e) => {
    e.preventDefault();

    if(!validateEmail(email))
    {
      seterror("Please Enter valid email")
      return;
    }
    if(!password)
      {
        seterror("Please Enter the Password")
        return;
      }
    seterror("")
    sendData()

  };

  const ToggleHide = (e) => {
    e.preventDefault(); 
    sethide((prev) => !prev);
  };

  return (
    <>
      <div className='flex flex-row font-poppins'>
        <div className='w-[60%] flex flex-col  h-screen py-10 pl-16'>
          <h1 className='font-semibold text-2xl'>Task Manager</h1>
          <div className='flex flex-col justify-center  h-full'>
            <div className='flex flex-col gap-5'>
              <div className='space-y-1'>
                <h1 className='font-semibold text-2xl'>Welcome Back</h1>
                <p className='text-xs font-semibold text-black'>Please enter your details to log in</p>
              </div>
              <form className='flex flex-col gap-2'>
                <div className='flex flex-col space-y-2'>
                  <label htmlFor='' className='font-semibold'>
                    Email
                  </label>
                  <input
                    className='w-[60%] p-2 bg-slate-100/50 focus:outline-none text-slate-700 border border-slate-200 rounded-sm placeholder:text-slate-700'
                    type='text'
                    value={email}
                    placeholder='john@gmail.com'
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div>
                  <label className='font-semibold'>Password</label>
                  <div className='relative w-[60%] flex items-center'>
                    <input
                      className='w-full p-2 pr-10 bg-slate-100/50 focus:outline-none text-slate-700 border border-slate-200 rounded-sm placeholder:text-slate-700'
                      type={hide ? 'password' : 'text'} // Toggle password visibility
                      value={password}
                      placeholder='Password'
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    <button onClick={ToggleHide} className='absolute right-2 top-1/2 -translate-y-1/2'>
                      {hide ? <EyeOff className='text-Pro5-primary' /> : <Eye className='text-Pro5-primary' />}
                    </button>
                  </div>
                </div>
                <p className='text-xs text-red-600'>{error}</p>
                <button className='w-[60%] hover:bg-blue-800 transition-all ease-in duration-150 bg-task_primary py-2 text-white uppercase tracking-wider rounded-sm font-semibold text-sm' onClick={handelRequest}>Login</button>
              </form>
              <p className='text-xs'>
                Don't have an account? <span className='underline text-task_primary' onClick={()=>navigate("/SignUp")}>SignUp</span>
              </p>
            </div>
          </div>
        </div>

        <div className='w-[40%] bg-task_primary h-screen flex items-center justify-center'>
          <div className='text-9xl text-white'>TM</div>
        </div>
      </div>
    </>
  );
};

export default Login;
