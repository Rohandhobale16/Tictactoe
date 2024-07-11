import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button
      className="w-16 h-16 border border-gray-500 flex items-center justify-center text-3xl font-bold bg-white hover:bg-gray-200 rounded transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;

