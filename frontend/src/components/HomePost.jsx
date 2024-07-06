import React from 'react'
import { useSelector } from "react-redux";
import FailLogin from '../pages/FailLogin';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';



const HomePost = ({items}) => {
const navigate=useNavigate()
  return !localStorage.getItem("user") ? (
    <FailLogin />
  ) : items.title ? (
    <div className='cursor-pointer' onClick={()=>navigate(`/posts/post/${items._id}`)}>
      <div className="w-full flex flex-row justify-evenly mt-5 p-5 space-x-4">
        {/* //left */}
        <div className="w-[30%] h-[200px] mt-5 flex justify-center items-center">
          <img src={items.photo} />
        </div>

        {/* //right */}
        <div className="flex flex-col w-[55%] ml-10">
          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            {items.title}
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>@{items.username}</p>
            <div className="flex md:flex-row md:space-x-2 m-5 flex-col">
              <p>{new Date(items.createdAt).toString().slice(0, 15)}</p>
            </div>
          </div>
          <p className="text-sm md:text-lg w-full">{items.desc}</p>
        </div>
      </div>
    </div>
  ) : "";
}

export default HomePost

 
    