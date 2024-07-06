import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { url } from '../constants';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';


const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const navigate=useNavigate()
      const dispatch=useDispatch()


 const handleSubmit = async () => {
   const data = { email, password };
   try {
    if(email.trim()!=="" && password.trim()!=='')
    {
     const postdata = await fetch(`${url}/auth/signin`, {
       method: "post",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(data),
     });
     const resp = await postdata.json();
     console.log(resp.data);
     if(resp.data){
      setError(resp.data)
     }
     if(resp.data[0].username){
      console.log()
     localStorage.setItem('user',resp.token)
     localStorage.setItem("userId", resp.data[0]._id);
     localStorage.setItem("username", resp.data[0].username);
     navigate('/')
     dispatch(addUser(resp.data[0]))
     toast.success('login success')
     setError('')
     }
    }
    else{
    setError("please fill the details");
    }
     
   } catch (error) {
     setError(error.message);
   }
 };



  return (
    <div>
      <div className="flex justify-around">
        <h1 className="md:text-xl text-lg font-bold">
          <Link to={"/"}>Blog Market</Link>
        </h1>
        <h3>
          <Link to={"/register"}>Register</Link>
        </h3>
      </div>

      <div className="w-full flex justify-center  items-center h-[70vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Login to Your Account</h1>
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
          <button onClick={handleSubmit} className="w-full px-4 py-4 text-lg font-bold bg-black rounded-lg text-white hover:bg-gray-400 hover:text-black">
            Login
          </button>
          {error && <h2 className='text-red-500 font-lg'>{error}</h2>}
          <div className="flex justify-center items-center space-x-4">
            <p>New here?</p>
            <p className="text-gray-400 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
