import React, { useEffect, useState } from 'react'
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
   },[queries])


  return (
    <div className="px-4 md:px-[20px]">
      <Navbar />

      {posts.length>0 &&
        posts && posts.map((ele) => <HomePost items={ele} />)}
        
        <div>
          <h2 className="font-bold text-2xl text-center mt-60">
            No results found</h2>
        </div>
    
      <Footer />
    </div>
  );
}

export default Home
