import React, { useState, useRef } from 'react';
import AddImg from '@assets/addImg.png';
import { AiFillCloseCircle } from "react-icons/ai";
import { useFormContext } from 'react-hook-form';

const InputFileImg = ({ name,img,nameRegister}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(img);
  const inputFileRef = useRef(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleUploadImg = () => {
    inputFileRef.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const { register } = useFormContext();

  return (
    <div className="w-full gap-4 flex justify-start items-center">
      <span className="w-[180px] h-5 not-italic text-gray-700">{name}</span>
      <div className="w-[312px] h-fit px-[26px] py-[22px] border-dashed rounded-md border-gray-300 border-2 flex flex-col gap-1 items-center justify-start">
        {imagePreview ? (
          <div className='relative'>
            <img src={imagePreview} alt="Preview" className="w-[260px] h-[180px] object-cover" />
            <AiFillCloseCircle className='absolute top-2 right-2 cursor-pointer' onClick={handleRemoveImage} />
          </div>
        ) : (
          <>
            <img src={AddImg} alt="img add" />
            <input type="file"   {...register(nameRegister)} onChange={handleImageChange} className="hidden" ref={inputFileRef} name="inputimg" accept=".png, .jpg, .jpeg, .gif"/>
            <div className="w-full h-5 flex gap-1 text-sm font-normal justify-center">
              <span className="text-red-600 cursor-pointer" onClick={handleUploadImg}>
                Tải tệp tin
              </span>
              <span className="text-gray-600">hoặc kéo thả</span>
            </div>
            <div className="flex justify-center items-center text-xs text-gray-500 font-normal">
              <span>PNG, JPG, GIF tới 10MB</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InputFileImg;
