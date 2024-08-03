"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from 'nookies';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, { username, password });

      // Store the token in cookies
      const token = response.data.token;
      setCookie(null, 'token', token, { path: '/' });

      toast.success('Login successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      router.push('/dashboard');
    } catch (error) {
      toast.error(`Login failed: ${error.response ? error.response.data.error : 'Please check your credentials.'}`, {
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full bg-gray-100 py-4 fixed top-0 left-0 right-0">
  <h1 className="text-3xl font-bold mb-6 text-center">Assignment for Quadiro Technologies</h1>
</div>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80 relative">
        <h1 className="text-2xl mb-4 text-black text-center pb-3">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 mb-4 w-full text-black"
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 mb-4 w-full text-black"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} className='mb-4' />}
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
        <p className="mt-4 text-center">
          New User?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Click here</a>
        </p>
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

export default Login;
