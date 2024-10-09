import React, { useState } from 'react';

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
  const [result, setResult] = useState(null); // State for holding the prediction result

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

      // Access the VITE environment variable
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables.");
      }

      const response = await fetch(`${apiUrl}/predict`, {
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
      setResult(result); // Store the result in state

    } catch (error) {
      setError("An error occurred while making the prediction: " + error.message);
      setResult(null); // Clear the previous result if there's an error
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
                  id={item} // Unique ID for autofill
                  name={item.toLowerCase()} // Unique name for autofill
                  placeholder={`Enter ${item}`}
                  className="p-2 border rounded-lg"
                  value={formData[item.toLowerCase()]} // Controlled input
                  onChange={handleInputChange} // Update state on change
                  autoComplete={item.toLowerCase()} // Optional: Use for specific autofill suggestions
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

      {/* Display the result */}
      {result && (
        <div className="mt-8 p-4 bg-green-100 flex gap-[10px] text-green-800 rounded-lg">
          <h2 className="text-2xl font-bold sm:text-xl md:text-xl">Recommendation:</h2>
          <a href="/store">
            <p className='text-2xl text-[red] font-bold sm:text-xl md:text-xl '>{result["prediction"]}</p></a> {/* Adjust this based on the structure of your result */}
        </div>
      )}

      <div>
        <p className='mt-10 font-bold text-center'>
          ** Based on the Recommendation, Purchase on Store is Recommended
        </p>
      </div>
    </div>
  );
}

export default Recommend;
