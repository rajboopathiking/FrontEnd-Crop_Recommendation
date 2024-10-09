import React, { useState } from 'react'
import { menuItems, Logo, profile, agrio } from '../../constrains/constrain-1';

const Navbar = () => {

    const sidebar = [{
        name: "categories", category: [{name:"Home",link:"/"},{name:"Store",link:"/store"},{name:"Contact",link:"#contact"}
        ]
    }]
    const [isside, setIsside] = useState(false)
    const [isprofile,setIsprofile] = useState(false)
    const [ismenu, setIsmenu] = useState(false)
    return (
        <div>
            <nav className='flex justify-between items-center m-5 bg-white p-2 rounded-2xl shadow-2xl pt-5  px-5'>


                <div className='flex flex-col p-[5px]'>
                    <img src={Logo} alt="" height={"10px"} width={"30px"} onClick={() => (setIsmenu(!ismenu))} className='rounded-2xl h-5 w-3 p-x-2 hidden hover:cursor-pointer' />
                    <span className='text-[purple]'>Agrie</span>
                    <span className='text-[6px] ml-5 font-bold '>powered by AI</span>
                </div>

                <div>
                    <ul className='flex justify-between items-center gap-10'>
                        {menuItems.map((items, index) => (
                            <li className='text-[black] ' key={index}>
                                <a href={items.link}><img src={items.image} alt={items.name} height={"10px"} width={"25px"} className='hover:flex hover:cursor-pointer' /></a>
                            </li>
                        ))}


                        <li>
                            <a href="/login"><img height={"10px"} width={"25px"} className=' hover:flex hover:cursor-pointer' src={profile} alt="" /></a>
                        </li>
                    </ul>
                </div>



            </nav>

            {
                ismenu ? (
                    <div>
                        <div className='bg-black text-white py-5 flex flex-col hidden w-[150px] ml-5 transition delay-75 duration-75 rounded-2xl overflow-auto'>
                            {/* <ul>
                                {sidebar.map((item, index) => (
                                    <li onClick={() => { setIsside(!isside) }} key={index} className='font-bold px-7 hover:cursor-pointer'>
                                        {item.name}
                                    </li>
                                ))}


                            </ul> */}
                            <ol>
                                {sidebar[0].category.map((item, index) => (
                                    <li onClick={() => { setIsside(!isside) }} key={index} className='px-[25px] py-[10px] hover:cursor-pointer'>
                                        <a href={item.link}>{item.name}</a>
                                    </li>
                                ))}

                            </ol>

                        </div>
                    </div>
                ) : null
            }




        </div>
    )
}

export default Navbar
