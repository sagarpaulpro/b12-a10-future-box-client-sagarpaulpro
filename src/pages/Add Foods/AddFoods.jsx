import { useState } from "react";

const AddFoods = () => {
  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expireDate,
      additionalNotes,
    };

    console.log(formData);
     fetch('http://localhost:3000/addfood',{
      method: 'POST',
      headers: {
        'content-type':'application/json'},
      body: JSON.stringify(formData)
    })
    
    // Optionally, reset form
    setFoodName("");
    setFoodImage("");
    setFoodQuantity("");
    setPickupLocation("");
    setExpireDate("");
    setAdditionalNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <div>
        <label className="block mb-1 font-medium">Food Name</label>
        <input
          type="text"
          placeholder="Enter food name"
          className="input input-bordered w-full"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Food Image</label>
        <input
          type="text"
          placeholder="Give The Photo URL Form imgbb.com"
          className="input input-bordered w-full"
          value={foodImage}
          onChange={(e) => setFoodImage(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Food Quantity</label>
        <input
          type="text"
          placeholder="e.g., Serves 2 people"
          className="input input-bordered w-full"
          value={foodQuantity}
          onChange={(e) => setFoodQuantity(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Pickup Location</label>
        <input
          type="text"
          placeholder="Enter pickup location"
          className="input input-bordered w-full"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Expire Date</label>
        <input
          type="date"
          className="input input-bordered w-full"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Additional Notes</label>
        <textarea
          placeholder="Enter any additional notes"
          className="textarea textarea-bordered w-full"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Submit
      </button>
    </form>
  );
};

export default AddFoods;
