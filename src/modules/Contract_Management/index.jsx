import React, { useState } from "react";

function index() {
    const dataImages = [
        "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lo0ikzht804m51",
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqt11epexstzcb",
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm8c1okdy38f27",
        "https://down-vn.img.susercontent.com/file/sg-11134201-22100-0q508io2ruiv10"
    ];

    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handlePrev = () => {
        setMainImageIndex((prevIndex) => (prevIndex - 1 + dataImages.length) % dataImages.length);
    };

    const handleNext = () => {
        setMainImageIndex((prevIndex) => (prevIndex + 1) % dataImages.length);
    };

    return (
        <div className=" flex justify-center items-center min-h-screen">
            <div className=" bg-white shadow-lg rounded-lg ">
                {/* Main Image Section */}
                <div className="p-4 image flex flex-col items-center group relative">
                    <button onClick={handlePrev} className="mb-2 px-4 py-4 bg-[#3f3f3f94] group-hover:opacity-100 opacity-0 transition duration-1000 text-white rounded absolute top-[50%] left-0 translate-y-[-50%]">{"<"}</button>
                    <img src={dataImages[mainImageIndex]} alt="Main Image" className="w-[557px] h-[313px] object-cover rounded-lg" />
                    <button onClick={handleNext} className="mt-2 px-4 py-4 bg-[#3f3f3f94] group-hover:opacity-100 opacity-0 transition duration-1000
                     text-white rounded absolute top-[50%] right-0 translate-y-[-50%]">{">"}</button>
                </div>
                {/* Sidebar */}
                <div className="p-4 list-img flex gap-1 w-full">
                    {dataImages.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-1/3 h-20 object-cover rounded-lg cursor-pointer"
                            onClick={() => setMainImageIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default index;
