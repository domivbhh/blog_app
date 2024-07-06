import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import { FaBars } from "react-icons/fa";
import { url } from '../constants';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/userSlice';



let user=true
const Navbar = () => {
  const [show,setShow]=useState(false)
  const navigate=useNavigate()
  const [error, setError] = useState("");
  const dispatch=useDispatch()
  const[prompt,setPrompt]=useState('')
  const userId=localStorage.getItem('userId')


    

      const handleLogout=async()=>{
       try {
     const postdata = await fetch(`${url}/auth/logout`, {
       method: "get",
      headers:{
        token:localStorage.getItem('user')
      } });
     const resp = await postdata.json();
     console.log(resp);
     localStorage.removeItem('user')
          localStorage.removeItem("userId");
          localStorage.removeItem("username");
     dispatch(removeUser())
     navigate('/')
     toast.success('Logout success')
   } catch (error) {
     console.log(error);
     setError(error.message);
   }
 };
      
 const handleSearch=()=>{
  navigate(prompt?'?search='+prompt:'/')
 }
    



  return (
    <div className="flex items-center justify-between px-0 md:px-[60px] py-4">
      <h1 className="md:text-xl text-md  font-bold">
        <Link to={"/"}>Blog Market</Link>
      </h1>
      <div className="flex justify-center items-center space-x-0 ml-4">
        <p className='cursor-pointer' onClick={handleSearch}>
          <BsSearch />
        </p>
        <input
          type="text"
          placeholder="search a post"
          className="outline-none px-3 min-h-[3vh]"
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
        />
      </div>

      <div className="flex-col gap-y-1 md:gap-y-0 md:flex-row items-center justify-center -space-x-1 md:space-x-4 hidden md:flex">
        {user && (
          <h3>
            <Link to={"/write"}>Write</Link>
          </h3>
        )}

        {user ? (
          <div className="flex space-x-3">
            <h3>
              <Link to={`/profile/${userId}`}>Profile</Link>
            </h3>

            <div>
              {localStorage.getItem('user') ? (
                <h2 onClick={handleLogout} className="cursor-pointer">
                  Logout
                </h2>
              ) : (
                <h2>
                  <Link to={"/login"}>Login</Link>
                </h2>
              )}
            </div>
          </div>
        ) : (
          <h3>
            <Link to={"/register"}>{"Register"}</Link>
          </h3>
        )}
      </div>
      <div className="md:hidden mt-0 absolute right-9">
        <FaBars className="" onClick={() => setShow(!show)} />
        {show ? (
          <div className="bg-black rounded-lg my-2 text-white flex flex-col absolute -ml-4  justify-start gap-y-4">
            {user && (
              <h3>
                <Link to={"/write"} className="px-2">
                  Write
                </Link>
              </h3>
            )}

            {user ? (
              <div className="flex gap-y-3 justify-start flex-col md:flex-row px-2">
                <h3>
                  <Link to={"/profile/:id"}>Profile</Link>
                </h3>

                <h3 className="">
                  {user ? (
                    <h3 onClick={handleLogout}>Logout</h3>
                  ) : (
                    <Link to={"/login"}>Login</Link>
                  )}
                </h3>
              </div>
            ) : (
              <h3 className="p-1">
                {user ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <Link to={"/register"}>Register</Link>
                )}
              </h3>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar
