import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from 'nookies';

const EditCar = ({ params }) => {
  const [car, setCar] = useState(null);
  const [carName, setCarName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const { id } = params;

  // Function to get cookie by name
  const getCookie = (name) => {
    const cookies = parseCookies();
    return cookies[name] || null;
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = getCookie('token'); // Get token from cookies

        if (!token) {
          console.log('No token found, redirecting to login.');
          router.push('/'); // Redirect to login if no token
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCar(response.data);
        setCarName(response.data.carName);
        setPrice(response.data.price);
        setImageUrl(response.data.imageUrl);
        setWebsiteUrl(response.data.websiteUrl);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching car:', error);
        toast.error('Error fetching car details.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    };

    fetchCar(); // Ensure this function call is inside useEffect
  }, [id, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = getCookie('token'); // Get token from cookies

      if (!token) {
        console.log('No token found, redirecting to login.');
        router.push('/'); // Redirect to login if no token
        return;
      }

      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
        carName,
        price,
        imageUrl,
        websiteUrl,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Car updated successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        router.push('/dashboard');
      } else {
        console.log('Update failed with status:', response.status);
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating car:', error);
      toast.error(`Update failed: ${error.response ? error.response.data.error : 'An error occurred. Please try again.'}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Edit Car</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Website URL"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Update Car</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default EditCar;
