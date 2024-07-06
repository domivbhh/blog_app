import React, { useEffect, useLayoutEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { url } from '../constants';



const EditPost = () => {
  const [cat, setCat] = useState("");
  const [data, setData] = useState({});
  const [cats, setCats] = useState(data.categories);
   const { user } = useSelector((state) => state.user);
   const { username, email } = user;
    const params = useParams();
    const [titles, setTitle] = useState('');
    const [descs, setDesc] = useState('');
    const [files, setFile] = useState('');
    const navigate=useNavigate()



    const handleUpdate=async(e)=>{
      e.preventDefault()
      const datas = {
        title:titles,
        desc:descs,
        categories:cats,
        username: data.username || localStorage.getItem("username"),
        userId: data.userId || localStorage.getItem("userId"),
      };
      console.log(datas)
      try {
         const data = await fetch(`${url}/post/${params.id}`, {
           method: "put",
           headers: {
             "Content-Type": "application/json",
             token: localStorage.getItem("user"),
             
            },
            body: JSON.stringify(datas),
         });
         const resp = await data.json();
         navigate('/')
         
       } catch (error) {
         console.log(error.message);
       }

    }

    
    const addCategory = () => {
      console.log(cat)
      setCats([...cats, cat]);
      setCat("");
    };

    const deleteCategory = (ind) => {
      const updatedCats = cats.filter((ele, i) => i != ind);
      setCats(updatedCats);
    };

     const fetchDatas = async () => {
       try {
         const data = await fetch(`${url}/post/posts/${params.id}`, {
           method: "get",
           headers: {
             "Content-Type": "application/json",
             token: localStorage.getItem("user"),
           },
         });
         const resp = await data.json();
         console.log(resp.data[0])
         setTitle(resp.data[0].title);
         setDesc(resp.data[0].desc);
         setCats(resp.data[0].categories);
       } catch (error) {
         console.log(error.message);
       }
     };



     useEffect(() => {
       fetchDatas();
     }, [params.id]);




  return !localStorage.getItem("user") ? (
    <FailLogin />
  ) : (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl mt-8">Edit Post</h1>
        <form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          action=""
          onSubmit={handleUpdate}
        >
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
            value={titles}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <input type="file" className="px-4 " onChange={(e)=>setFile(e.target.files[0])} />
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
              {cats && cats?.map((ele, ind) => {
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
            value={descs}
            onChange={(e)=>setDesc(e.target.value)}
          />
          <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 text-lg  md:text-xl"> 
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditPost
