import React from 'react';

const Card = ({ food }) => {
    return (
        <div className="max-w-sm bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl duration-300">
            <img 
                src={food.image} 
                alt={food.name} 
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {food.name}
                </h2>

                <p className="text-gray-600 mt-1">
                    <span className="font-medium">Quantity:</span> {food.quantity}
                </p>

                <p className="text-gray-600">
                    <span className="font-medium">Pickup:</span> {food.pickupLocation}
                </p>

                <p className="text-gray-600">
                    <span className="font-medium">Expire Date:</span> {food.expireDate}
                </p>

                {food.notes && (
                    <p className="text-gray-500 italic mt-2">
                        “{food.notes}”
                    </p>
                )}

                <p className="text-gray-600 mt-2 text-sm">
                    Donor: <span className="font-medium">{food.donorEmail}</span>
                </p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 duration-200">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default Card;
