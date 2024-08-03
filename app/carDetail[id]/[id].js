'use client';

import Image from 'next/image'; // Import the Image component from Next.js
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { parseCookies } from 'nookies';

const CarDetails = ({ car }) => {
  const { carName, manufacturingYear, price, imageUrl, websiteUrl, description, _id } = car;
  const router = useRouter();

  const getCookie = (name) => {
    const cookies = parseCookies();
    return cookies[name] || null;
  };

  const handleEdit = () => {
    router.push(`/edit-car/${_id}`);
  };

  const handleDelete = async () => {
    try {
      const token = getCookie('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Car deleted successfully!');
        router.push('/dashboard');
      } else {
        throw new Error('Deletion failed');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error(`Deletion failed: ${error.response ? error.response.data.error : 'An error occurred. Please try again.'}`);
    }
  };

  return (
    <div className="border rounded-lg p-4 m-4 bg-white shadow-md flex flex-col items-center">
      <Image
        src={imageUrl}
        alt={carName}
        width={400} // Adjust width as needed
        height={300} // Adjust height as needed
        className="object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{carName}</h2>
      <p className="text-gray-700 mb-2">Year: {manufacturingYear}</p>
      <p className="text-gray-700 mb-2">Price: ${price}</p>
      <p className="text-gray-600 mb-4">{description}</p>
      <p>
        <span className="font-semibold">Website:</span> 
        <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{websiteUrl}</a>
      </p>
      <div className="mt-4 flex space-x-4">
        <button 
          onClick={handleEdit} 
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CarDetails;
