import React from 'react'
import toast from 'react-hot-toast';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { url } from '../constants';

const Comment = (props) => {
  const{data,handleCommentEdit}=props
  const{comment}=data
  console.log(data)


      const handleCommentDelete=async()=>{
        console.log('clc')
        try {
          const datas = await fetch(`${url}/comment/${data._id}`, {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("user"),
            },
          });
          const resp = await datas.json();
          toast.success(resp.data)
        } catch (error) {
          toast.error(error.message);
        }


      }


      






  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-400">@{data.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-gray-400 text-sm">
            {data.createdAt.toString().slice(0, 10)}
          </p>
          <p className="text-sm">{data.createdAt.toString().slice(12, 19)}</p>
          {data.userId === localStorage.getItem("userId") && (
            <div className="flex items-center justify-center space-x-2">
              <p>
                <BiEdit
                  onClick={()=>handleCommentEdit(comment,data._id)}
                  className="cursor-pointer"
                />
              </p>
              <p onClick={handleCommentDelete} className="cursor-pointer">
                <MdDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      <p>{data.comment}</p>
    </div>
  );
}

export default Comment
