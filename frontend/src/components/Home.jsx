import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import HomePost from './HomePost';

const Home = () => {
  return (
    <div className="px-4 md:px-[20px]">
      <Navbar />
      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
      <Footer/>
    </div>
  );
}

export default Home
