import React from 'react'
import { socialMedia } from '../../constrains/constrain-1'

const About = () => {
  return (
    <div className='bg-black  border border-black shadow-[200px] text-white h-[200px] flex rounded-t-3xl justify-center items-center relative'>
      {/* Left Section */}
      <div className='w-[50%] ml-[100px]  sm:hidden md:hidden'>
        <span className='text-[50px] font-bold text-[purple] '>Agrie</span>
        <div className='flex gap-2 ml-[75px]'>
          <p className='text-[10px] '>powered by </p> 
          <span className='text-[blue] text-[10px]'>AI</span>{' '}
          <span className='text-[red] text-[10px]'>Blockchain</span>
        </div>
        <p className='text-[10px] pl-5'>Agrie is an E-commerce Store for Agri products</p>
      </div>

      {/* Right Section with Social Media Links */}
      <div>
        <ol className='w-[50%] px-[50px] flex flex-col sm:justify-center sm:items-center md:justify-center md:items-center md:absolute md:top-3 md:left-10'>
          {socialMedia.map((item, index) => (
            <li className='flex justify-center items-center ml-10 gap-2' key={index}>
              <img width={"150px"} src={item.image} alt={item.name} />
              <a href={`https://${item.name}`} target="_blank" rel="noopener noreferrer">
                <p className='text-[10px] hover:cursor-pointer'>{item.name}</p>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default About;
