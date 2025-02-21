import React, { useState } from 'react';
import RetailStore from '../RetailStore/RetailStore';
import CryptoJS from 'crypto-js';
import { ethers } from 'ethers';
import { jsPDF } from 'jspdf';  // Import jsPDF library

const Checkout = () => {
  const [cartItems, setCartItems] = useState(RetailStore((state) => state.cartItems));
  const [totalPrice, setTotalPrice] = useState(RetailStore((state) => state.totalPrice));
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    location: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const secretKey = import.meta.env.VITE_SECRET_KEY || 'default_secret_key';

  const userDetails = [
    { id: 1, name: "Name", placeholder: "Enter your name", key: 'name' },
    { id: 2, name: "Occupation", placeholder: "Enter your occupation", key: 'occupation' },
    { id: 3, name: "Location", placeholder: "Enter your location", key: 'location' },
    { id: 4, name: "State", placeholder: "Enter your state", key: 'state' },
    { id: 5, name: "PinCode", placeholder: "Enter your pincode", key: 'pincode' },
  ];

  const paymentDetails = [
    { id: 1, name: "Card Number", placeholder: "Enter your card number", key: 'cardNumber' },
    { id: 2, name: "Expiry Date", placeholder: "MM/YY", key: 'expiryDate' },
    { id: 3, name: "CVV", placeholder: "Enter CVV", key: 'cvv' },
    { id: 4, name: "Cardholder Name", placeholder: "Enter name on card", key: 'cardholderName' },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  // Function to generate the PDF
  const generatePDF = (userAddress, transactionHash) => {
    const doc = new jsPDF();

    doc.text('Transaction Receipt', 10, 10);
    doc.text(`Name: ${formData.name}`, 10, 20);
    doc.text(`Address: ${formData.location}, ${formData.state}, ${formData.pincode}`, 10, 30);
    doc.text(`Transaction Hash: ${transactionHash}`, 10, 40);

    cartItems.forEach((item, index) => {
      doc.text(`Product ${index + 1}: ${item.name} - $${item.price}`, 10, 50 + index * 10);
    });

    doc.text(`Total Price: $${totalPrice}`, 10, 70);
    doc.text(`Customer Ethereum Address: ${userAddress}`, 10, 80);

    // Save the PDF
    doc.save('transaction-receipt.pdf');
  };

  const storeDataOnBlockchain = async (encryptedData, productNames, price) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();  // Get user's Ethereum address

        const contractAddress = '0x713761495B3e5560E13C766B9D7A16D434614E72'; 
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_occupation",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_location",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_state",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_pincode",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_cardNumber",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_expiryDate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_cvv",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_cardholderName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_productName",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
              }
            ],
            "name": "storePurchase",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
              }
            ],
            "name": "getPurchase",
            "outputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "occupation",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "state",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "pincode",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cardNumber",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "expiryDate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cvv",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cardholderName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "productName",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              }
            ],
            "name": "getPurchaseCount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "purchases",
            "outputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "occupation",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "state",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "pincode",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cardNumber",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "expiryDate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cvv",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cardholderName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "productName",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]; 

        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const priceInWei = ethers.parseUnits(price.toString(), "ether");

        // Sending the transaction to the blockchain
        const transaction = await contract.storePurchase(
          encryptedData.name,
          encryptedData.occupation,
          encryptedData.location,
          encryptedData.state,
          encryptedData.pincode,
          encryptedData.cardNumber,
          encryptedData.expiryDate,
          encryptedData.cvv,
          encryptedData.cardholderName,
          productNames,  // Pass all product names as a concatenated string
          priceInWei 
        );

        // Wait for the transaction to be mined
        const receipt = await transaction.wait();
        // console.log(receipt)
        const transactionHash = receipt.hash;  // Get transaction hash

        alert("Payment details stored on the blockchain!");

        // Generate the PDF after the transaction is successful
        generatePDF(userAddress, transactionHash);

      } catch (error) {
        console.error("Error storing data on the blockchain:", error);
      }
    } else {
      alert("Ethereum provider (MetaMask) is not detected!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const encryptedData = {
      name: encryptData(formData.name),
      occupation: encryptData(formData.occupation),
      location: encryptData(formData.location),
      state: encryptData(formData.state),
      pincode: encryptData(formData.pincode),
      cardNumber: encryptData(formData.cardNumber),
      expiryDate: encryptData(formData.expiryDate),
      cvv: encryptData(formData.cvv),
      cardholderName: encryptData(formData.cardholderName),
    };

    // Get product names dynamically from cartItems
    const productNames = cartItems.map(item => item.name).join(', ');  // Concatenate product names

    await storeDataOnBlockchain(encryptedData, productNames, totalPrice);
  };

  return (
    <div className='relative'>
      <h1 className='m-[10px] p-[5px] text-center font-bold text-[20px] bg-black text-white'>
        <span className='font-bold text-[30px] text-red-600'>Payment </span>
        <span className='text-[30px] text-green-600'>Details</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className='p-4'>
          <h2 className='text-[20px] underline font-bold text-center'>User Details</h2>
          <div className='grid grid-cols-2 items-center gap-4 p-4 sm:grid-cols-1 md:grid-cols-1'>
            {userDetails.map((item) => (
              <div key={item.id} className='ml-10'>
                <label htmlFor={`user-input-${item.id}`} className='block font-bold text-[20px]'>
                  {item.name}:
                </label>
                <input
                  className='border border-black w-[80%] font-bold p-2 mt-1'
                  type="text"
                  id={`user-input-${item.id}`}
                  name={item.key}
                  placeholder={item.placeholder}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className='p-4'>
          <h2 className='font-bold text-[20px] text-center'>Payment Details</h2>
          <div className='grid grid-cols-2 items-center gap-4 p-4 sm:grid-cols-1 md:grid-cols-1'>
            {paymentDetails.map((item) => (
              <div key={item.id} className='ml-10'>
                <label htmlFor={`payment-input-${item.id}`} className='block font-bold text-[20px]'>
                  {item.name}:
                </label>
                <input
                  className='border border-black w-[80%] font-bold p-2 mt-1'
                  type="text"
                  id={`payment-input-${item.id}`}
                  name={item.key}
                  placeholder={item.placeholder}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className='p-4'>
          <h2 className='font-bold text-[20px] text-center'>Your Cart</h2>
          <div className='p-4'>
            <ul className="list-disc list-style-none sm:hidden md:hidden list-inside">
              {cartItems.map((item, index) => (
                <li key={index} className='text-lg'>
                  {item.name} - {item.price}
                </li>
              ))}
            </ul>
            <h3 className='text-right font-bold mt-4 text-lg'>
              Total Price: {totalPrice}
            </h3>
          </div>
        </div>

        <div className='text-center p-4'>
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
            Complete Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
