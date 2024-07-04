import React from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'


let user=false
const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-[60px] py-4'>
      <h1 className='md:text-xl text-lg font-bold'>
        <Link to={'/'}>Blog Market</Link>
      </h1>
      <div className='flex justify-center items-center space-x-0'>
        <p><BsSearch/></p>
        <input type="text" placeholder='search a post' className='outline-none px-3 ' />

      </div>
      <div className='flex items-center justify-center space-x-2 md:space-x-4'>
        {user ? <h3><Link to={'/write'}>Write</Link></h3>
        :
        <h3><Link to={'/login'}>Login</Link></h3>
        }
        
        {
          user?<h3><Link to={'/profile'}>Profile</Link></h3>
          :<h3><Link to={'/register'}>Register</Link></h3>
        }
      </div>

      
    </div>
  )
}

export default Navbar
