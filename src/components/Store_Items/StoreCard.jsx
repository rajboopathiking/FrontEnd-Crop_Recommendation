import React, { useState } from 'react';
import search from "../../assets/search.png";
import { storeItems } from '../../constrains/constrain-2';
import { Leaf, thumb } from '../../constrains/constrain-1';

const StoreCard = () => {
    const [isitem, setIsitem] = useState("");
    const [issearch, setIssearch] = useState(true);

    const checkItems = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setIsitem(searchValue);
        setIssearch(searchValue.length === 0); // Hide search icon if input is not empty
    };

    return (
        <div className="p-8">
            <div>
                <h1 className='text-[50px] text-center m-5'>
                    <span className='text-[green]'>Agrie</span> <span className='text-[grey]'>Store</span>
                </h1>
            </div>
            {/* Search Bar */}
            <div className='relative mb-8 flex text-[purple] justify-center items-center gap-2'>
                <input
                    type='search'
                    placeholder="Search"
                    className='outline-none border-solid border-2 text-[25px] px-5 border-black rounded-2xl w-[80%] ml-[10%] h-[45px]'
                    onChange={checkItems}
                />
                {issearch && (
                    <img
                        src={search}
                        className='absolute right-10 h-[30px] w-[30px]'
                        alt="Search Icon"
                    />
                )}
            </div>

            {/* Introductory Text */}
            <div>
                <p className='text-[15px] tracking-[3px] text-center text-[purple] mb-8'>
                    Get a Life of your Land and Improve your Productivity on <span className='text-[green]'>Agriculture Farming</span>
                    <img
                        src={Leaf}
                        height="20px"
                        width="20px"
                        className='h-5 w-5 inline-block ml-2'
                        alt="Leaf Icon"
                    />
                </p>
            </div>

            {/* Store Items */}
            <div>
                {storeItems.length === 0 ? (
                    <p className="text-center text-gray-600">Loading items...</p>
                ) : (
                    storeItems.map((category, index) => {
                        // Filter the categories based on the search input
                        if (isitem && !category.name.toLowerCase().includes(isitem)) {
                            return null;
                        }

                        return (
                            <div key={index} className="mb-12">
                                {/* Category Title */}
                                <h1 className='text-2xl font-bold text-gray-700 mb-6'>{category.name}</h1>

                                {/* Map over items in the category */}
                                <div className="grid grid-cols-3 flex-wrap justify-center items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl: grid-cols-4 2xl: grid-cols-5 3xl: grid-cols-6  gap-8">
                                    {category.Item.map((item, idx) => (
                                        <div key={idx} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
                                            {/* Item Image */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-40 object-fit rounded-lg mb-4"
                                            />

                                            {/* Item Details */}
                                            <h3 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h3>

                                            <div className='flex gap-2 justify-center items-center'>
                                                <div className="text-gray-600 text-sm flex justify-center items-center gap-2 mb-2">
                                                    <img src={thumb} className='h-5' alt="" /><span className="font-semibold">{item.ratings}⭐</span>
                                                </div>

                                                <div>|</div>

                                                <div className="text-gray-600 gap-1 flex justify-center items-center text-sm">
                                                    {<img src={item.profile} className='h-5' alt="" />} <span className="font-semibold">{item.users}</span>

                                                </div>
                                            </div>

                                            <div className='flex justify-center items-center gap-2'>
                                                <div>
                                                    {item.prize}
                                                </div>
                                                <div>
                                                    |
                                                </div>
                                                <div className="text-gray-600 flex justify-center items-center gap-1 text-sm">
                                                    <span className="font-semibold">{item.Reviews}</span>
                                                    <img src={thumb} className='h-5' alt="" />
                                                </div>
                                                


                                            </div>



                                            {/* Action Button */}
                                            <button className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                                                Buy &gt;&gt;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
                {/* No results found */}
                {/* {isitem && storeItems.every(category => !category.Item.some(item => item.name.toLowerCase().includes(isitem))) && (
                    <p className="text-center text-gray-600">No items found for "{isitem}"</p>
                )} */}
            </div>
        </div>
    );
};

export default StoreCard;
