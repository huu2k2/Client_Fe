import React, { useState } from "react";
 
const ListImg = ({ images }) => {
    const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrev = () => {
    setMainImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + images?.response.length) % images?.response?.length
    );
  };

  const handleNext = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % images?.response?.length);
  };

  return (
    <div className="flex    w-11/12 max-w-full relative">
  
    {/* Main Image Section */}
    <div className="p-4 image flex flex-col items-center group relative">
      <button
        onClick={handlePrev}
        className="mb-2 px-4 py-4 bg-[#3f3f3f94] group-hover:opacity-100 opacity-0 transition duration-1000 text-white rounded absolute top-[50%] left-0 translate-y-[-50%]"
      >
        {"<"}
      </button>
      <img
        src={images?.response[mainImageIndex]?.url}
        alt="Main Image"
        className="w-[700px] h-[400px] object-cover rounded-lg"
        loading="lazy"
      />
      <button
        onClick={handleNext}
        className="mt-2 px-4 py-4 bg-[#3f3f3f94] group-hover:opacity-100 opacity-0 transition duration-1000
                 text-white rounded absolute top-[50%] right-0 translate-y-[-50%]"
      >
        {">"}
      </button>
    </div>
    {/* Sidebar */}
    <div className="p-4 list-img grid grid-cols-3 grid-rows-5 gap-2">
      {images?.response?.map((i, index) => (
        <img
          key={index}
          src={i?.url}
          alt={`Thumbnail ${index + 1}`}
          className="w-20 h-20 object-cover rounded-lg cursor-pointer"
          onClick={() => setMainImageIndex(index)}
        />
      ))}
    </div>
  </div>
  )
}

export default ListImg