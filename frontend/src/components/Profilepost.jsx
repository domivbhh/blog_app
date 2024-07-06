import React from 'react'
import { useSelector } from "react-redux";

const Profilepost = ({data}) => {
  
   const { user } = useSelector((state) => state.user);
   const { username, email } = user;
  return !localStorage.getItem("user") ? (
    <FailLogin />
  ) : (  
       <div className="md:w-[660px]">
      <div className="w-full flex flex-row justify-between mt-5 p-5 space-x-4">
        {/* //left */}
        <div className="w-[30%] h-[200px] mt-5 flex justify-center items-center">
          <img
            src={data.photo}
            className="md:-mt-2 mt-72 w-[100%] md:w-full h-full object-cover "
            alt=""
          />
        </div>

        {/* //right */}
        <div className="flex flex-col w-[55%] ml-10">
          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            {data.title}
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>{data.username}</p>
            <div className="flex md:flex-row md:space-x-2 m-5 flex-col">
              <p>{data.createdAt}</p>
              
            </div>
          </div>
          <p className="text-sm md:text-lg w-full">
            {data.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profilepost
