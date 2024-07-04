import React from 'react'

const Profilepost = () => {
  return (
    <div className='md:w-[520px]'>
      <div className="w-full flex flex-row justify-between mt-5 p-5 space-x-4">
        {/* //left */}
        <div className="w-[30%] h-[200px] mt-5 flex justify-center items-center">
          <img
            src="https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=GkAOxzduJbUKpS2-LX_l6jSKtyhdKlnPMo2ito4xpR4="
            className="md:-mt-2 mt-72 w-[100%] md:w-full h-full object-cover "
            alt=""
          />
        </div>

        {/* //right */}
        <div className="flex flex-col w-[55%] ml-10">
          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            10 uses of ai
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>@userwhite</p>
            <div className="flex md:flex-row md:space-x-2 m-5 flex-col">
              <p>16-6-2023</p>
              <p>16:42</p>
            </div>
          </div>
          <p className="text-sm md:text-lg w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, fugiat.
            Odit tenetur quis similique beatae, accusamus nemo accusantium sequi
            molestias provident asperiores ipsam et obcaecati quod blanditiis
            consequuntur maiores quidem corporis tempora autem necessitatibus.
            Neque odit dolore ad aliquid possimus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profilepost
