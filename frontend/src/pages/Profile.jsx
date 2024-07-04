import React from 'react'
import Navbar from '../components/Navbar'
import Profilepost from '../components/Profilepost'
import Footer from '../components/Footer';

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 w-full md:px-[200px] mt-12 flex md:flex-row flex-col-reverse">
        <div className="flex flex-col md:w-[78%] w-full">
          <h1 className="text-xl font-bold mb-4">Your Post</h1>
          <Profilepost />
          <Profilepost />
          <Profilepost />
          <Profilepost />
          <Profilepost />
        </div>
        <div className="flex flex-col  space-y-4 md:w-[30%] w-full ml-28 mb-5 md:mb-0 md:sticky md:top-16">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input
            type="text"
            className="outline-none px-4 py-2 text-gray-500"
            placeholder="Your username"
          />
          <input type="email" placeholder='enter your email' className="outline-none px-4 py-2 text-gray-500" />
          <input className="outline-none px-4 py-2 text-gray-500" placeholder='enter your password' type="password" />
          <div className='flex items-center space-x-4 mt-8'>
            <button className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'>Update</button>
            <button className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'>
                Delete
            </button>

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Profile
