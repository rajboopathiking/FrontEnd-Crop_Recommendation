import React from 'react'
import '../Hero/Hero.css'

const Hero = () => {
  return (
    <div className=" m-10 bg-cover h-[30%] p-5 rounded-2xl blur-[.1px]  bg-center overflow-auto ">
      <div>
        <h1 className="font-bold text-[30px] text-[purple]">Agrie</h1>
        <p className="text-[10px] ml-5">powered by AI</p>
      </div>
      <div>
        <h1>
          <span className="font-bold text-[orange] lg:text-[50px] text-[20px]">Empower</span> with{' '}
          <span className="text-[Red] font-bold lg:text-[50px] text-[20px]">AI</span> &{' '}
          <span className="text-[blue] lg:text-[50px] text-[20px] font-bold">BlockChain</span>
        </h1>
      </div>
      <div className='text-[black]'>
        <br />
        <span className="text-[20px] font-bold ml-10">Agrie</span> is the product built for the improvement
        of agricultural development.{' '} An E-commerce platform to increase the purchase power of farmers, introducing {' '}
        <span className="text-[15px] font-bold">Artificial Intelligence-Based Recommendation</span> and{' '}
        <span className="text-[15px] font-bold">Security Improved by Blockchain</span>.
      </div>
      <a href="/store">
        <button className='font-bold bg-black text-white rounded-3xl mt-5 text-[10px] px-5 p-2'>Store &gt;&gt;</button>
      </a>
    </div>
  )
}

export default Hero
