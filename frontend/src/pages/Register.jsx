import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { url } from '../constants';


const Register = () => {
    const[username,setUserName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const navigate=useNavigate()


    const handleSubmit=async()=>{
      const data={username,email,password}
      try
       {
        if(username.trim()!=='' && email.trim()!=="" && password.trim()!=='')
         {
          const postdata=await fetch(`${url}/auth/signup`,{
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
          })
          const resp=await postdata.json()
          if (resp.data[0].username) {
            localStorage.setItem("user", resp.token);
            navigate("/login");
            toast.success("Register success");
            setError("");
          }
        }
          else{
            setError('please fill the details')
          }
          
       
      } 
      catch (error) {
        console.log(error)
        setError(error.message)
        
      }
    }
     

  return (
    <div>
      <div className='flex justify-around'>
        <h1 className="md:text-xl text-lg font-bold">
          <Link to={"/"}>Blog Market</Link>
        </h1>
        <h3>
          <Link to={"/login"}>Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Register Your Account</h1>
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder="Enter your username"
          />
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your Email"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
          />
          <button className="w-full px-4 py-4 text-lg font-bold bg-black rounded-lg text-white hover:bg-gray-400 hover:text-black"
          onClick={handleSubmit}>
            Register
          </button>
          {error && <h2 className='text-red-500 font-md'>{error}</h2>}
          <div className="flex justify-center items-center space-x-4">
            <p>Already have an account?</p>
            <p className="text-gray-400 hover:text-black">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register
