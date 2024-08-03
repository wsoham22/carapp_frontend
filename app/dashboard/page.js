"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken'; // Import jwt for decoding
import CarTile from '../carTile[id]/page';
import { FaPlus } from 'react-icons/fa'; // Import FaPlus icon
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [carCount, setCarCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const [showAddCarModal, setShowAddCarModal] = useState(false); // State to handle modal visibility
  const [newCar, setNewCar] = useState({
    carName: '',
    manufacturingYear: '',
    price: '',
    imageUrl: '',
    websiteUrl: '',
    description: '',
  });
  const router = useRouter();

  const resetForm = () => {
    setNewCar({
      carName: '',
      manufacturingYear: '',
      price: '',
      imageUrl: '',
      websiteUrl: '',
      description: '',
    });
  };

  const fetchCars = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.token;

      if (!token) {
        router.push('/login');
        return;
      }

      const decoded = jwt.decode(token);
      setIsAdmin(decoded?.role === 'admin'); // Check if role is admin

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, config);

      setCars(response.data.cars);
      setCarCount(response.data.carCount);
      setLoading(false);
    } catch (error) {
      setError('Error fetching cars');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleUpdate = () => {
    fetchCars(); // Refetch the data or update the state directly
  };

  const handleDelete = () => {
    fetchCars(); // Refetch the data or update the state directly
  };

  const handleAddCar = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/cars`, newCar, config);
      setShowAddCarModal(false); // Close the modal
      resetForm();
      fetchCars(); // Refresh the car list
      toast.success('Car added successfully!'); // Show success notification
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('Error adding car. Please try again.'); // Show error notification
    }
  };

  const handleLogout = () => {
    destroyCookie(null, 'token'); // Remove the token cookie
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {isAdmin && (
            <button
              onClick={() => setShowAddCarModal(true)}
              className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            >
              <FaPlus size={20} />
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-lg mb-4">Total number of cars: {carCount}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cars.map(car => (
              <CarTile
                key={car._id}
                car={car}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                isAdmin={isAdmin} // Pass isAdmin prop
              />
            ))}
          </div>
        </>
      )}
      {/* Add Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
            <input
              type="text"
              value={newCar.carName}
              onChange={(e) => setNewCar({ ...newCar, carName: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Car Name"
            />
            <input
              type="number"
              value={newCar.manufacturingYear}
              onChange={(e) => setNewCar({ ...newCar, manufacturingYear: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Year"
            />
            <input
              type="number"
              value={newCar.price}
              onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Price"
            />
            <input
              type="text"
              value={newCar.imageUrl}
              onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Image URL"
            />
            <input
              type="text"
              value={newCar.websiteUrl}
              onChange={(e) => setNewCar({ ...newCar, websiteUrl: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Website URL"
            />
            <textarea
              value={newCar.description}
              onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Description"
            />
            <button
              onClick={handleAddCar}
              className="bg-blue-500 text-white p-2 rounded w-full mb-2"
            >
              Add Car
            </button>
            <button
              onClick={() => setShowAddCarModal(false)}
              className="bg-gray-500 text-white p-2 rounded w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
