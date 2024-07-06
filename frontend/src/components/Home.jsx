import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import HomePost from './HomePost';
import FailLogin from "../pages/FailLogin";
import { useSelector } from "react-redux";
import { url } from '../constants';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { addPost } from ;



const Home = () => {
   const { user } = useSelector((state) => state.user);
   const { username, email } = user;
   const[posts,setPosts]=useState([])
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const {search}=useLocation()
   const queries=search ? search: '' 
   const[show,setShow]=useState(false)
   let a=useRef()
 


  const fetchDatas=async()=>{
    try {
        const data = await fetch(`${url}/post/${queries}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("user"),
          },
        });
        const resp = await data.json();
        setPosts(resp)
        

    } 
    catch (error) {
      console.log(error.message)
    }
  }



   useEffect(()=>{
      fetchDatas()
      a.current=setTimeout(()=>{
          setShow(!show)
      },7000)
      return ()=>{
         clearInterval(a.current)
      }
   },[queries])




  return (
    <div className="px-4 md:px-[20px]">
      <Navbar />

      {posts.length > 0 ? (
        posts && posts.map((ele) => <HomePost items={ele} />)
      ) : (
        <div>
          <h1 className="text-lg text-center font-bold mt-5">{show ?'No data Found':'Loading Results'}</h1>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home
