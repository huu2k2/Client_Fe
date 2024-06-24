import React, { useState } from "react";
import { BiXCircle } from "react-icons/bi";

function ShowImages() {
  const dataImages = [
    "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lo0ikzht804m51",
    "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqt11epexstzcb",
    "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm8c1okdy38f27",
    "https://down-vn.img.susercontent.com/file/sg-11134201-22100-0q508io2ruiv10",
  ];

  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrev = () => {
    setMainImageIndex(
      (prevIndex) => (prevIndex - 1 + dataImages.length) % dataImages.length
    );
  };

  const handleNext = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % dataImages.length);
  };

  return (
    <dialog
      className="bg-gray-500 bg-opacity-50  flex justify-center items-center modal modal-action "
      id="my_modal_4"
    >
      <div className="flex bg-white shadow-lg rounded-lg modal-box w-11/12 max-w-3xl relative">
        <form method="dialog" className="absolute top-2 right-1 rounded-full" >
          {/* if there is a button, it will close the modal */}
          <button className="btn bg-transparent bg-opacity-50 rounded-full">
            <BiXCircle />
          </button>
        </form>
        {/* Main Image Section */}
        <div className="p-4 image flex flex-col items-center group relative">
          <button
            onClick={handlePrev}
            className="mb-2 px-4 py-4 bg-[#3f3f3f94] group-hover:opacity-100 opacity-0 transition duration-1000 text-white rounded absolute top-[50%] left-0 translate-y-[-50%]"
          >
            {"<"}
          </button>
          <img
            src={dataImages[mainImageIndex]}
            alt="Main Image"
            className="w-96 h-96 object-cover rounded-lg"
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
          {dataImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer"
              onClick={() => setMainImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </dialog>
  );
}

export default ShowImages;
