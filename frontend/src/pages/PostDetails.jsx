import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Comment from '../components/Comment'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../constants'
import toast from 'react-hot-toast'
import FailLogin from './FailLogin'


const PostDetails = () => {
  const params=useParams()
  const [comments,setComments]=useState([])
  const[comment,setComment]=useState('')
  const[data,setData]=useState([])
  const navigate=useNavigate()
  const[edit,setEdit]=useState(false)
  const[id,setId]=useState('')


  const fetchDatas=async()=>{
    try {
        const data = await fetch(`${url}/post/posts/${params.id}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("user"),
          },
        });
        const resp = await data.json();
        setData(resp.data[0])
        

    } 
    catch (error) {
      console.log(error.message)
    }
  }


  const fetchComments=async()=>{
    try {
      const res=await fetch(`${url}/comment/post/${params.id}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("user"),
          },
        })
        const resp=await res.json()
        setComments(resp.data)
    } catch (error) {
         toast.error(error.message);
      
    }
  }
  



  useEffect(()=>{
    fetchDatas()
    fetchComments()
  },[params.id])


  const handleEdit=()=>{
         navigate(`/edit/${params.id}`);
  }

  const handleAddComment=async()=>{
    const post={
      comment,
      userId:localStorage.getItem('userId'),
      postId:params.id,
      author:localStorage.getItem('username')
    }
    try{
     const datas = await fetch(`${url}/comment/create`, {
           method: "post",
           headers: {
             "Content-Type": "application/json",
             token: localStorage.getItem("user"),
           },
           body: JSON.stringify(post)
         });
         const resp = await datas.json();
         setComment('')
         console.log(resp)
       } catch (error) {
         toast.error(error.message);
       }

    }
    const handleCommentEdit = async (comm,id) => {
      setEdit(true)
      setComment(comm)
      setId(id)
   
     
    }
    const handlecommentEdit=async()=>{
         const datas = {
           comment,
           postId: params.id,
           userId: localStorage.getItem('userId'),
           author: localStorage.getItem('username'),
         };
      try {
        const fileUpload = await fetch(`${url}/comment/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("user"),
          },
          body: JSON.stringify(datas),
        });
        setComment('')
        toast.success('edited sucess')
      } catch (err) {
        console.log(err.message);
      }
    }

  

  const handleDelete=async()=>{
    try {
      const data = await fetch(`${url}/post/${params.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("user"),
        },
      });
      const resp = await data.json();
      toast.success('post deleted')
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }


  }

  return !localStorage.getItem("user") ? (
    <FailLogin />
  ) : ( data && data.title ?
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            {data.title}
          </h1>
          { data.userId===localStorage.getItem('userId') &&
          <div className="flex items-center justify-center space-x-2">
            <p onClick={handleEdit}>
              <BiEdit />
            </p>
            <p onClick={handleDelete} className='cursor-pointer'>
              <MdDelete />
            </p>
          </div>
          }
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{data.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(data.createdAt).toString().slice(0, 15)}</p>
            <p>{new Date(data.createdAt).toString().slice(15, 21)}</p>
          </div>
        </div>

        <img src={data.photo} className="w-full mx-auto mt-8" alt="" />
        <p className="mx-auto mt-8">{data.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories</p>
          {data && data.categories && data.categories.map((ele,ind) => (
            <div key={ind} className="flex justify-center items-center space-x-2">

              
              <div className="bg-gray-300 rounded-lg px-3 py-1">{ele}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">
            {/* comments */}
            Comments:
          </h3>
          {
            comments.map((ele)=><Comment key={ele._id} data={ele} handleCommentEdit={handleCommentEdit}/>)
          }

          {/* write a comment */}
          <div className="flex flex-col mt-4 md:flex-row">
            <input
              type="text"
              placeholder="write a comment"
              className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
            />
            <button className="bg-black text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0" onClick={edit ?handlecommentEdit:handleAddComment}>
              {edit ?'Edit comment': 'Add comment'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>:
    <div>
      <h1 className='text-2xl text-center'>Loading results....</h1>
    </div>
  );
}

export default PostDetails
