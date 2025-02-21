import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Recommend() {
  const features = [
    "nitrogen",
    "phosphorus",
    "potassium",
    "temperature",
    "humidity",
    "ph",
    "rainfall",
    "state"
  ];

  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
    state: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
        state: formData.state
      };

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables.");
      }

      const response = await fetch(`${apiUrl}/predict/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setError(""); // Clear any previous errors

      // Navigate to the Store page and pass the prediction result
      navigate("/store", { state: { prediction: result } });

    } catch (error) {
      setError("An error occurred while making the prediction: " + error.message);
    }
  };

  return (
    <div className="p-8 relative">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Get AI Recommendations</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} className='p-5 border rounded-2xl'>
          <div className="grid grid-cols-2 gap-7 mt-4">
            {features.map((item, index) => (
              <div key={index} className="flex flex-col">
                <label htmlFor={item} className="mb-2 font-semibold text-gray-600">
                  {item}
                </label>
                <input
                  type="text"
                  id={item}
                  name={item.toLowerCase()}
                  placeholder={`Enter ${item}`}
                  className="p-2 border rounded-lg"
                  value={formData[item.toLowerCase()]}
                  onChange={handleInputChange}
                  autoComplete={item.toLowerCase()}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              Get Recommendation
            </button>
          </div>
        </form>
      </div>

      {error && <div className="mt-4 text-center text-red-600">{error}</div>}
      {/* Display the prediction result if needed */}
    </div>
  );
}

export default Recommend;
