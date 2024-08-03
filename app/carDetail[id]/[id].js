"use client";

import Image from 'next/image'; // Import the Image component from Next.js

const CarDetails = ({ car }) => {
  const { carName, manufacturingYear, price, imageUrl, websiteUrl, description } = car;

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
    </div>
  );
};

export default CarDetails;
