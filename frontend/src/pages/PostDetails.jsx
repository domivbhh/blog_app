import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Comment from '../components/Comment'


const PostDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            10 uses of ai
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p>
              <BiEdit />
            </p>
            <p>
              <MdDelete />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@userwhite</p>
          <div className="flex space-x-2">
            <p>16-6-2023</p>
            <p>16:42</p>
          </div>
        </div>

        <img
          src="https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=GkAOxzduJbUKpS2-LX_l6jSKtyhdKlnPMo2ito4xpR4="
          className="w-full mx-auto mt-8"
          alt=""
        />
        <p className="mx-auto mt-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem,
          quisquam! Excepturi consectetur mollitia dolores quae repellendus ab
          maiores hic doloremque aliquam quaerat. Voluptates dignissimos quas
          nihil nam ipsum, placeat quibusdam possimus necessitatibus a!
          Explicabo, eligendi.
        </p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">AI</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">
            {/* comments */}
            Comments:
          </h3>
          <Comment/>
          <Comment/>      

          

            {/* write a comment */}
            <div className='flex flex-col mt-4 md:flex-row'>
                <input type="text" placeholder='write a comment' className='md:w-[80%] outline-none px-4 mt-4 md:mt-0' />
                <button className='bg-black text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0'>Add comment</button>

            </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostDetails
