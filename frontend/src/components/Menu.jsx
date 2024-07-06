import React from 'react'

const Menu = () => {
    const user=false
  return (
    <div className='bg-black w-[200px] flex flex-col items-start absolute top-12 right-6 rounded-md p-4'>
        {!user && <h3 className='text-white text-sm hover:text-gray-500'>Login</h3>}
        {!user && <h3 className='text-white text-sm hover:text-gray-500'>Register</h3>}
      
    </div>
  )
}

export default Menu
