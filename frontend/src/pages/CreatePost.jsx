import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {ImCross} from 'react-icons/im'
import FailLogin from "./FailLogin";
import { useSelector } from "react-redux";
import { imageFolder, url } from '../constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const CreatePost = () => {
    const[cat,setCat]=useState('')
    const[cats,setCats]=useState([])
    const[file,setFile]=useState(null)
    const[title,setTitle]=useState('')
    const[desc,setDesc]=useState('')
    const navigate=useNavigate()
    const userId=localStorage.getItem('userId')
    const username=localStorage.getItem('username')
    
    console.log(file)
    const handleCreate=async(e)=>{
      e.preventDefault()
      const post = {
        title,
        desc,
        userId,
        username,
        categories: cats,
        photo:
          "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2019/08/August-blog-header-Amplification-437x233.png",
      };
      if(file){
        const data=new FormData()
        const fileName=Date.now()+file.name
        data.append('img',fileName)
        data.append('file',file)
        post.photo=fileName
        try{
            const fileUpload=await fetch(`url/api/upload`,{
           method: "post",
           headers: {
             "Content-Type": "application/json",
             token: localStorage.getItem("user"),
           },
           body:JSON.stringify(data)
         })
         console.log(fileUpload)
        }
        catch(err){
            toast.error(err.data)
        }
      }
      
       try {
         const datas = await fetch(`${url}/post/create`, {
           method: "post",
           headers: {
             "Content-Type": "application/json",
             token: localStorage.getItem("user"),
           },
           body: JSON.stringify(post)
         });
         const resp = await datas.json();
         setCat('')
         setTitle('')
         setDesc('')
         setCats('')
         navigate('/')
         toast.success(resp.data);

       } catch (error) {
         toast.error(error.message);
       }

    }

        const addCategory=()=>{
                    setCats([...cats,cat])
                    setCat('')
        }

        const deleteCategory=(ind)=>{
            const updatedCats=cats.filter((ele,i)=>i!=ind)
            setCats(updatedCats)

        }
        useEffect(()=>{

        },[])



  return !localStorage.getItem("user") ? (
    <FailLogin />
  ) : (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl mt-8">Create a Post</h1>
        <form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          action=""
          onSubmit={handleCreate}
        >
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="file" className="px-4 " onChange={(e)=>setFile(e.target.files[0])}/>
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                type="text"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                placeholder="Enter post category"
                className="px-4 py-2 outline-none"
              />
              <div
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                onClick={addCategory}
              >
                Add
              </div>
            </div>

            {/* //categories */}
            <div className="flex px-4 mt-3">
              {cats.map((ele, ind) => {
                return (
                  <div
                    key={ele}
                    className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 py-1 rounded-md"
                  >
                    <p>{ele}</p>
                    <p
                      className="text-white bg-black rounded-full cursor-pointer text-sm"
                      onClick={() => deleteCategory(ind)}
                    >
                      <ImCross />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <textarea
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="enter the description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 text-lg  md:text-xl"
         >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost
