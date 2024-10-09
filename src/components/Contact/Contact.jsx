import React from 'react'

function Contact() {
  return (
    <div className='flex w-[80%] justify-center items-center gap-20 p-[25px] m-5 rounded-3xl  bg-gradient-to-r from-[purple] to-[white] mt-5'>
      <div>
      <h1 id='contact' className='font-bold text-[50px] text-[lightpink]'>Contact Us!</h1>
        <form action="mailto:example@gmail.com" className='flex gap-5 mt-5 flex-col ml-5'>
          
          <input type="text" className='rounded-2xl p-2 ml-2 font-bold px-5' placeholder='username'/>
          <input type="text" className='rounded-2xl p-2 ml-2 font-bold px-5' placeholder='password'/>
          <button type='submit' className='bg-[red] w-[50%] rounded-2xl py-2 mt-5 px-5'>Mail</button>
        </form>

      </div>
      <div className='w-[300px] sm:hidden md:hidden'>
        <span className='text-[50px]'>Get Updates</span> and imformation from us. <span className='font-bold'>contact via Mail</span>
      </div>
    </div>
  )
}

export default Contact
