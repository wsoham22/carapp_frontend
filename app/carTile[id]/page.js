"use client";
import { useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

const CarTile = ({ car, onUpdate, onDelete, isAdmin }) => {
  const { _id, carName, manufacturingYear, price, imageUrl, websiteUrl, description } = car;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCar, setUpdatedCar] = useState({
    carName,
    manufacturingYear,
    price,
    imageUrl,
    websiteUrl,
    description,
  });
  const [showDeleteSnackbar, setShowDeleteSnackbar] = useState(false); // State for the snackbar

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/cars/${_id}`, updatedCar, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onUpdate(); // Refresh the car list
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/cars/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onDelete(); // Refresh the car list
      setShowDeleteSnackbar(false); // Close the snackbar
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteSnackbar(true); // Show the confirmation snackbar
  };

  return (
    <div className="border rounded-lg p-4 m-4 bg-white shadow-md flex flex-col items-center">
      {isEditing ? (
        <div className="w-full">
          <input
            type="text"
            value={updatedCar.carName}
            onChange={(e) => setUpdatedCar({ ...updatedCar, carName: e.target.value })}
            className="border p-2 mb-2 w-full"
            placeholder="Car Name"
          />
          <input
            type="number"
            value={updatedCar.manufacturingYear}
            onChange={(e) => setUpdatedCar({ ...updatedCar, manufacturingYear: e.target.value })}
            className="border p-2 mb-2 w-full"
            placeholder="Year"
          />
          <input
            type="number"
            value={updatedCar.price}
            onChange={(e) => setUpdatedCar({ ...updatedCar, price: e.target.value })}
            className="border p-2 mb-2 w-full"
            placeholder="Price"
          />
          <input
            type="text"
            value={updatedCar.imageUrl}
            onChange={(e) => setUpdatedCar({ ...updatedCar, imageUrl: e.target.value })}
            className="border p-2 mb-2 w-full"
            placeholder="Image URL"
          />
          <input
            type="text"
            value={updatedCar.websiteUrl}
            onChange={(e) => setUpdatedCar({ ...updatedCar, websiteUrl: e.target.value })}
            className="border p-2 mb-2 w-full"
            placeholder="Website URL"
          />
          <textarea
            value={updatedCar.description}
            onChange={(e) => setUpdatedCar({ ...updatedCar, description: e.target.value })}
            className="border p-2 mb-2 w-full"
            placeholder="Description"
          />
          <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded w-full mb-2">
            Update
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded w-full">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <Image
            src={imageUrl}
            alt={carName}
            width={128} // Set appropriate width
            height={128} // Set appropriate height
            className="object-cover mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{carName}</h2>
          <p className="text-gray-700 mb-2">Year: {manufacturingYear}</p>
          <p className="text-gray-700 mb-2">Price: ${price}</p>
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mb-2">
            More Details
          </a>
          <p className="text-gray-600 mb-4">{description}</p>
          {isAdmin && (
            <div className="flex space-x-4">
              <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700">
                <FaEdit size={20} />
              </button>
              <button onClick={handleDeleteClick} className="text-red-500 hover:text-red-700">
                <FaTrash size={20} />
              </button>
            </div>
          )}
        </>
      )}
      {/* Snackbar for delete confirmation */}
      {showDeleteSnackbar && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <p className="text-lg mb-4">Are you sure you want to delete this car item?</p>
            <div className="flex space-x-4">
              <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded w-full">
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteSnackbar(false)}
                className="bg-gray-500 text-white p-2 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarTile;
