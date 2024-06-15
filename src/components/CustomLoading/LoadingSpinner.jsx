// LoadingSpinner.js
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = ({ isLoading, size = 30, color = "#123abc" }) => {
  return (
    isLoading && (
      <div className="absolute top-12 right-0 left-0 flex items-center justify-center z-50">
      <div className=" flex items-center justify-center w-20 h-20 bg-gray-400 bg-opacity-50 rounded-lg">
        <div className="  flex items-center justify-center border border-gray-600 rounded-full">
          <ClipLoader size={size} color={color} loading={isLoading} />
        </div>
      </div>
      </div>
    )
  );
};

export default LoadingSpinner;
