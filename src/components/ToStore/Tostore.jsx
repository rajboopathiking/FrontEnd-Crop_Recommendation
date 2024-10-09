import React from 'react';

const Tostore = () => {
  return (
    <div className='p-[5%]  '>
      <div className='bg-gray-500 w-[90%] bg-blend-multiply flex-col rounded-xl h-[200px] flex justify-center items-center m-5 pl-5 bg-cover bg-[url("/src/assets/hero.png")]'>

        <h1 className='text-[white] text-[20px] border p-3 tracking-[10px] rounded-xl bg-transparent font-[20px] sm:hidden md:hidden  m-5'>To visit Store Click Below</h1>
        <div>
          <a href="/store">
            <button className='text-[20px] tracking-[2px] font-bold bg-black text-white  px-5 py-2 rounded-2xl blur-[0px] transition-all'>Store</button>
          </a>

        </div>
      </div>
    </div>
  );
}

export default Tostore;
