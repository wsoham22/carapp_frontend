"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/register`, {
        username,
        password,
        confirmPassword,
        role
      });

      toast.success('Registration successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      router.push('/login');
    } catch (error) {
      toast.error(`Registration failed: ${error.response ? error.response.data.error : 'Please check your details.'}`, {
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

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full bg-gray-100 py-4 fixed top-0 left-0 right-0">
  <h1 className="text-3xl font-bold mb-6 text-center">Assignment for Quadiro Technologies</h1>
</div>
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md w-80 relative">
        <h1 className="text-2xl mb-4 text-black text-center pb-3">Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 mb-4 w-full text-black"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full text-black"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border p-2 w-full text-black"
          />
          <button
            type="button"
            onClick={handleToggleConfirmPassword}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <div className="mb-4">
          <label className="mr-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            /> User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            /> Admin
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mb-2">Sign Up</button>
        <p className="text-center text-gray-600">
          Already signed in? <a href="/login" className="text-blue-500 hover:underline">Click here</a>
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

export default SignUp;
