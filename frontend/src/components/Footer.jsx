import React from 'react'

const Footer = () => {
  return (
    <div className="md:ml-0 ml-12 md:w-full bg-black">
      <section className="mt-8 px-10 md:px-[190px] ml-16 md:ml-0 flex md:flex-row flex-col items-start space-y-3 md:space-y-4 md:justify-between text-sm md:text-md py-8">
        <div className="flex flex-col text-white mt-5">
          <p>Featured blogs</p>
          <p>Most viewed</p>
          <p>Readers choice</p>
        </div>
        <div className="flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div className="flex flex-col text-white">
          <p>Privacy Policy</p>
          <p>About us</p>
          <p>Terms and conditions</p>
        </div>
      </section>
      <p className="text-white text-center py-2 pb-2">All rights reserved @BlogMarket 2024</p>
    </div>
  );
}

export default Footer
