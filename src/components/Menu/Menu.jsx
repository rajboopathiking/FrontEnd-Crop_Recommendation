import React, { useState } from 'react';
import { cancel } from "../../constrains/constrain-1";

const Menu = () => {
    const menulist = ["Home", "Cart"];
    const [Isclose, setIsclose] = useState(true); // Manages the close state of the menu

    const closeMenu = () => {
        setIsclose(!Isclose);
    };

    return (
        <div className='flex justify-end my-[p]'>
            <div className={`flex justify-end gap-20 bg-black text-white h-[100vh] w-[25%] p-3 ${Isclose ? 'hidden' : 'block'}`}>
                <ul className='flex flex-col items-start p-5 relative'>
                    Cancel button
                    <img 
                        src={cancel} 
                        alt="Close" 
                        onClick={closeMenu} 
                        className='size-7 absolute left-5 hover:cursor-pointer' 
                    />

                    {/* Menu Items */}
                    <div className='absolute top-20 gap-20 right-1'>
                        {menulist.map((item, index) => (
                            <li 
                                className='text-center hover:cursor-pointer gap-10 my-5' 
                                key={index}>
                                {item}
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Menu;
