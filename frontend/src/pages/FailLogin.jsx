import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const FailLogin = () => {
  return (
    <div>
      <Navbar/>
    <div className="text-center">
      <h2 className=" text-2xl my-24">
        Please Login <Link to={"/login"}>click here</Link>
      </h2>
    </div>
    <div className='mt-2'>
    </div>
    </div>
  )
}

export default FailLogin
