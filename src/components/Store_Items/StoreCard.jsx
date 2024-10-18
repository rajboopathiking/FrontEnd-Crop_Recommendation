import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import search from "../../assets/search.png";
import { storeItems } from '../../constrains/constrain-2';
import { Leaf, thumb } from '../../constrains/constrain-1';
import RetailStore from '../RetailStore/RetailStore';

const StoreCard = ({ prediction }) => {
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Initialize isitem to display all items if prediction is not available
    const initialSearchValue = prediction && prediction.prediction ? prediction.prediction.toLowerCase() : "";
    const [isitem, setIsitem] = useState(initialSearchValue);
    const [issearch, setIssearch] = useState(true);

    const [totalPrice, setTotalPrice] = useState(0); // State to track total price

    const items = RetailStore((state) => state.cardItems);
    const price = RetailStore((state) => state.price);
    const addItem = RetailStore((state) => state.addItem); // Access the addItem function from the store

    const checkItems = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setIsitem(searchValue);
        setIssearch(searchValue.length === 0); // Hide search icon if input is not empty
    };

    const handleAddToCart = (itemName, itemPrice) => {
        // Ensure itemPrice is a string and remove any non-numeric characters
        const parsedPrice = parseFloat(itemPrice.replace(/[^0-9.-]+/g, '')); // Remove any non-numeric characters
        if (!isNaN(parsedPrice)) { // Check if parsedPrice is a valid number
            addItem(itemName, parsedPrice); // Add the item to the store
            setTotalPrice((prevPrice) => prevPrice + parsedPrice); // Update the total price
            navigate('/store/card'); // Redirect to the checkout page
        } else {
            console.error(`Invalid price for ${itemName}: ${itemPrice}`);
        }
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
                    value={isitem} // Bind search input to the filtered prediction
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
                        // Filter the categories based on the search input or prediction
                        if (isitem && !category.name.toLowerCase().includes(isitem)) {
                            return null; // Don't render if the item doesn't match the search
                        }

                        return (
                            <div key={index} className="mb-12">
                                {/* Category Title */}
                                <h1 className='text-2xl font-bold text-gray-700 mb-6'>{category.name}</h1>

                                {/* Map over items in the category */}
                                <div className="grid grid-cols-3 flex-wrap justify-center items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
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
                                                    <img src={thumb} height="20px" width="20px" alt="thumb" />
                                                    <p className='text-[15px]'>Rating {item.ratings}</p>
                                                </div>
                                            </div>

                                            <p className="text-lg font-semibold text-gray-700">${item.prize}</p>

                                            <button
                                                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition"
                                                onClick={() => handleAddToCart(item.name, item.prize)} // Trigger add to cart and update price
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Total Price Section */}
            <div className="mt-8 p-4 bg-gray-100 text-center">
                <h2 className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
            </div>
        </div>
    );
};

export default StoreCard;
