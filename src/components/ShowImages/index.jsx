import React, { useState } from "react";
import { BiXCircle } from "react-icons/bi";

function ShowImages({ images }) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrev = () => {
    setMainImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + images?.response.length) % images?.response?.length
    );
  };

  const handleNext = () => {
    setMainImageIndex(
      (prevIndex) => (prevIndex + 1) % images?.response?.length
    );
  };

  return (
    <dialog
      className="bg-gray-500 bg-opacity-50 flex justify-center items-center modal modal-action "
      id="mymodalshowanh"
    >
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg  w-9/12 h-[80vh]  relative">
        <form method="dialog" className="absolute top-2 right-1 rounded-full z-50">
          {/* if there is a button, it will close the modal */}
          <button className="btn bg-transparent bg-opacity-50 rounded-full">
            <BiXCircle />
          </button>
        </form>
        {/* Main Image Section */}
        <div className="p-4 image w-full lg:w-3/5 h-auto flex flex-col items-center group relative">
          <button
            onClick={handlePrev}
            className="mb-2 px-6 py-6 bg-[#3f3f3faa] group-hover:opacity-100 opacity-0 transition duration-1000 text-white rounded absolute top-[50%] left-0 translate-y-[-50%]"
          >
            {"<"}
          </button>
          <img
            src={images?.response[mainImageIndex]?.url}
            alt="Main Image"
            className="h-[500px]  w-full lg:h-[90%] object-cover rounded-lg"
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
        <div className="p-4 list-img grid w-full lg:w-2/5 grid-cols-3 grid-rows-4 gap-2 custom-scrollbar">
          {images?.response?.map((i, index) => (
            <img
              key={index}
              src={i?.url}
              alt={`Thumbnail ${index + 1}`}
              className="   h-full lg:w-[200px] lg:h-[200px] object-cover rounded-lg cursor-pointer"
              onClick={() => setMainImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </dialog>
  );
}

export default ShowImages;
