import React, { useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ImCross } from "react-icons/im";



const EditPost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
    
    const addCategory = () => {
      setCats([...cats, cat]);
      setCat("");
    };

    const deleteCategory = (ind) => {
      const updatedCats = cats.filter((ele, i) => i != ind);
      setCats(updatedCats);
    };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl mt-8">Edit Post</h1>
        <form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          action=""
        >
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />
          <input type="file" className="px-4 " />
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
            rows={10}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="enter the description"
          />
          <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 text-lg  md:text-xl">
            Update
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default EditPost
