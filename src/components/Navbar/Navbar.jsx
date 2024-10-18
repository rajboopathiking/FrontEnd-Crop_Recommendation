import React, { useState } from 'react';
import { menuItems, Logo, profile } from '../../constrains/constrain-1';
import useAuthStore from '../AuthStore/AuthStore';

const Navbar = () => {
    const sidebar = [{
        name: "categories",
        category: [
            { name: "Home", link: "/" },
            { name: "Store", link: "/store" },
            { name: "Contact", link: "#contact" }
        ]
    }];

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const currentUser = useAuthStore((state) => state.currentUser);
    const logout = useAuthStore((state) => state.logout);
    const [isside, setIsside] = useState(false);
    const [ismenu, setIsmenu] = useState(false);
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);

    const handleProfileClick = () => {
        // Show or hide logout menu based on authentication state
        if (isAuthenticated) {
            setShowLogoutMenu(!showLogoutMenu);
        } else {
            // If the user is not authenticated, they should be redirected to the login
            window.location.href = "/login"; // Redirect to login page
        }
    };

    const handleLogout = () => {
        console.log("Logging out..."); // Debugging log
        logout(); // Call logout function from Zustand store
        setShowLogoutMenu(false); // Hide logout menu after logging out
        console.log("Logout state after logout call:", isAuthenticated); // Log authentication state
    };

    return (
        <div>
            <nav className='flex justify-between items-center m-5 bg-white p-2 rounded-2xl shadow-2xl pt-5 px-5'>
                <div className='flex flex-col p-[5px]'>
                    <img
                        src={Logo}
                        alt=""
                        height={"10px"}
                        width={"30px"}
                        onClick={() => setIsmenu(!ismenu)}
                        className='rounded-2xl h-5 w-3 p-x-2 hidden hover:cursor-pointer'
                    />
                    <span className='text-[purple]'>Agrie</span>
                    <span className='text-[6px] ml-5 font-bold'>powered by AI</span>
                </div>

                <div>
                    <ul className='flex justify-between items-center gap-10'>
                        {menuItems.map((items, index) => (
                            <li className='text-[black]' key={index}>
                                <a href={items.link}>
                                    <img src={items.image} alt={items.name} height={"10px"} width={"25px"} className='hover:flex hover:cursor-pointer' />
                                </a>
                            </li>
                        ))}
                        <li>
                            <div className='relative'>
                                <img
                                    height={"10px"}
                                    width={"25px"}
                                    className='hover:flex hover:cursor-pointer'
                                    src={profile}
                                    alt=""
                                    onClick={handleProfileClick} // Show/Hide logout menu on click
                                />
                                {isAuthenticated && showLogoutMenu && (
                                    <div className='absolute right-0 mt-2 bg-white shadow-lg rounded-md'>
                                        <ul className='p-2'>
                                            <li onClick={handleLogout} className='hover:bg-gray-200 cursor-pointer p-1'>Logout</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            {ismenu && (
                <div>
                    <div className='bg-black text-white py-5 flex flex-col hidden w-[150px] ml-5 transition delay-75 duration-75 rounded-2xl overflow-auto'>
                        <ol>
                            {sidebar[0].category.map((item, index) => (
                                <li onClick={() => { setIsside(!isside) }} key={index} className='px-[25px] py-[10px] hover:cursor-pointer'>
                                    <a href={item.link}>{item.name}</a>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
