import React from 'react'
import { Link } from "react-router-dom";


const Register = () => {

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
            placeholder="Enter your username"
          />
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your Email"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border-2 border-black outline-0"
          />
          <button className="w-full px-4 py-4 text-lg font-bold bg-black rounded-lg text-white hover:bg-gray-400 hover:text-black">
            Register
          </button>
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
