import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Profilepost from '../components/Profilepost'
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import FailLogin from './FailLogin';
import toast from 'react-hot-toast';
import { addPost } from '../store/postSlice';


const Profile = () => {
  const {user}=useSelector((state)=>state.user)
  const{username,email}=user
  const[userName,setUserName]=useState(username)
  const[userEmail,setUserEmail]=useState(email)
  const[password,setPassword]=useState('')
  const[error,setError]=useState('')
  const navigate=useNavigate()
  const data=useSelector((state)=>state.user)
  const[posts,setPosts]=useState([])
  const dispatch=useDispatch()
  const userId=localStorage.getItem('userId')



  const fetchUserPost=async()=>{
    try {
      const result= await fetch(`${url}/post/user/${userId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("user"),
        },
      });
      const resp = await result.json();
      setPosts(resp.data)
      setUserName(resp.data[0].username);
    }
    catch (error) {
      console.log(error.message);
    }

  }


  useEffect(()=>{
      fetchUserPost()
  },[])

  const handleDelete=async()=>{
    const data={username:userName,email:userEmail,password}
    console.log(user._id)
    try {
      if (data.email.trim() !== "" || data.password.trim() !== "" || data.username.trim()!=='') {
        const postdata = await fetch(`${url}/auth/${user._id}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("user"),
          },
          
        });
        const resp = await postdata.json();
        console.log(resp);
        if (resp.data!=='') {
          toast.success("user deleted successfully");
        }
        else{
          setError('fail to delete')
        }
       
      }
        
    } 
    catch (error) {
      setError(error.message)
    }
  }


  const handleUpdate=async()=>{
    const data={username:userName,email:userEmail,password}
    console.log(user._id)
    try {
      if (data.email.trim() !== "" || data.password.trim() !== "" || data.username.trim()!=='') {
        const postdata = await fetch(`${url}/auth/${user._id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("user"),
          },
          body: JSON.stringify(data),
        });
        const resp = await postdata.json();
        console.log(resp);
        if (resp.data) {
          setError(resp.data);
        }
        if (resp.data[0].username) {
          toast.success("update success");
          setError("");
        }
      } else {
        setError("please fill the details");
      }
        
    } 
    catch (error) {
      setError(error.message);
      
    }
  }




  return !localStorage.getItem("user") ? (
    <FailLogin />
  ) : (
    <div>
      <Navbar />
      <div className="px-8 w-full md:px-[200px] mt-12 flex md:flex-row flex-col-reverse">
        <div className="flex flex-col md:w-[78%] w-full">
          <h1 className="text-xl font-bold mb-4">Your Post</h1>
          {
            posts.length===0 ?
              <div>
                <h2 className='text-xl'>No Post Found on your Profile</h2>
              </div>
            
            :posts.map((data)=>
              <Profilepost data={data}/>
          )
          }
        </div>
        <div className="flex flex-col  space-y-4 md:w-[30%] w-full ml-12 mb-5 md:mb-0 md:sticky md:top-16">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input
            type="text"
            className="outline-none px-4 py-2 text-gray-500"
            placeholder="Your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="enter your email"
            className="outline-none px-4 py-2 text-gray-500"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <input
            className="outline-none px-4 py-2 text-gray-500"
            placeholder="enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center space-x-4 mt-8">
            <button
              className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              onClick={() => handleUpdate()}
            >
              Update
            </button>
            <button
              className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
          {error && <h3 className="text-red-600 text-xl">{error}</h3>}
        </div>
      </div>
      <div className='mt-44'>
      <Footer />
      </div>
    </div>
  );
}

export default Profile
