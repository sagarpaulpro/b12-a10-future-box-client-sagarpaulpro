import React from "react";
import Swal from "sweetalert2";

const Card = ({ food, userEmail }) => {
  const handleViewDetails = () => {
    Swal.fire({
      title: food.foodName,
      html: `
        <p><strong>Quantity:</strong> ${food.foodQuantity}</p>
        <p><strong>Pickup Location:</strong> ${food.pickupLocation}</p>
        <p><strong>Expire Date:</strong> ${food.expireDate}</p>
        ${food.additionalNotes ? `<p><strong>Notes:</strong> ${food.additionalNotes}</p>` : ""}
      `,
      imageUrl: food.foodImage || "https://via.placeholder.com/400x200",
      imageHeight: 200,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Close",
      denyButtonText: "Request Food",
      focusConfirm: false,
    }).then(async (result) => {
      if (result.isDenied) {
        // POST request to create food request
        try {
          const res = await fetch("http://localhost:3000/foodrequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              foodId: food._id,
              foodName: food.foodName,
              requesterEmail: userEmail, // যাকে request করতে চাচ্ছি
              requestedAt: new Date(),
            }),
          });

          const data = await res.json();
          if (data.success) {
            Swal.fire("Requested!", "Your request has been sent.", "success");
          } else {
            Swal.fire("Error!", "Something went wrong.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl hover:scale-105 duration-300">
      <img
        src={food.foodImage || "https://via.placeholder.com/400x200"}
        alt={food.foodName}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">{food.foodName}</h2>
        <p className="text-gray-600 mt-1"><strong>Quantity:</strong> {food.foodQuantity}</p>
        <p className="text-gray-600"><strong>Pickup:</strong> {food.pickupLocation}</p>
        <p className="text-gray-600"><strong>Expire Date:</strong> {food.expireDate}</p>

        {food.additionalNotes && (
          <p className="text-gray-500 italic mt-2">“{food.additionalNotes}”</p>
        )}

        <button
          onClick={handleViewDetails}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
