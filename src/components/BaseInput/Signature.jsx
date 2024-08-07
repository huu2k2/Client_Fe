import React, { useState, useRef, useEffect } from "react";
import AddImg from "@assets/addImg.png";
import { AiFillCloseCircle } from "react-icons/ai";
import SignatureCanvas from "react-signature-canvas";

const Signature = ({ name, img, onChange,type="show" }) => {
  const [count,setCount] = useState(0)
  const [selectedImage, setSelectedImage] = useState(img);
  const [imagePreview, setImagePreview] = useState(img);
  const inputFileRef = useRef(null);
  const sigCanvas = useRef(null);
useEffect(()=>{
if(img){
  setImagePreview(img)
  setSelectedImage(img)
}
},[img])
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
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
    onChange(null);
  };

  const handleClear = () => {
    setCount(0)
    sigCanvas.current.clear();
  };

  const handleSave = () => {
    const dataURL = sigCanvas.current.toDataURL("image/png");
    setImagePreview(dataURL);
    onChange(dataURL);
    setCount(1)
    document.getElementById("my_modal_1").close();
  };

  return (
    <div className="w-[501px] flex justify-between items-start">
      <span className="w-fit h-5 not-italic text-gray-700">{name}</span>
      <div className="flex flex-col gap-4  w-[318px]">
        {/* <div className="w-[318px] h-fit px-[26px] py-[22px] border-dashed rounded-md border-gray-300 border-2 flex flex-col gap-1 items-center justify-start">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-[260px] h-[180px] object-cover"
              />
              <AiFillCloseCircle
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white text-gray-600 cursor-pointer"
                onClick={handleRemoveImage}
              />
            </div>
          ) : (
            <>
              <img
                src={AddImg}
                alt="img add"
                onClick={handleUploadImg}
                className="cursor-pointer"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                ref={inputFileRef}
                name="inputimg"
                accept=".png, .jpg, .jpeg, .gif"
              />
              <div className="w-full h-5 flex gap-1 text-sm font-normal justify-center">
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={handleUploadImg}
                >
                  Tải tệp tin
                </span>
                <span className="text-gray-600">hoặc kéo thả</span>
              </div>
              <div className="flex justify-center items-center text-xs text-gray-500 font-normal">
                <span>PNG, JPG, GIF tới 10MB</span>
              </div>
            </>
          )}
        </div> */}
        {type==="show"?<button
          type="button"
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className={`text-white w-full ${count===0?"bg-black":"bg-rose-600 border-rose-600 hover:bg-rose-700"}  border  focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2`}
        >
         { count===0? "Chưa tạo chữ kí" :"Đã tạo chữ ký"}
        </button> :<></>}
        

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Tạo chữ ký</h3>
            <div className="py-4 border">
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 300,
                  height: 200,
                  className: "sigCanvas",
                }}
                ref={sigCanvas}
              />
            </div>
            <form method="dialog" className="modal-action">
              <button
                onClick={handleClear}
                className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 "
              >
                Xóa
              </button>
              <button
                onClick={handleSave}
                className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 "
              >
                Lưu
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Signature;
