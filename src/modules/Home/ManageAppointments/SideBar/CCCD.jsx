import React, { useRef, useState } from "react";
import AddImg from "@assets/addImg.png";
import { AiFillCloseCircle } from "react-icons/ai";
import SignatureCanvas from "react-signature-canvas";

const CCCD = ({ title, title2,id ,setCCCD}) => {
  const [count,setCount] = useState(0)
  const [imagePreview, setImagePreview] = useState(null);
  const [imgSelect,setImgSelect] = useState("")
  const inputFileRef = useRef(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgSelect(reader.result.split(',')[1])
    
      setImagePreview(reader.result);
    };
    setCount(1)
    reader.readAsDataURL(imageFile);
  };

  const handleUploadImg = () => {
    inputFileRef.current.click();
  };

  const handleRemoveImage = () => {
    setCCCD((prev) => {
      if (id === 1) {
        return { ...prev, mt: "" };
      } else {
        return { ...prev, ms: "" };
      }
    });
    setImgSelect("")
    setCount(0)
    inputFileRef.current=null
    setImagePreview(null);
    
  };

  const handleClear = () => {
    setCCCD((prev) => {
      if (id === 1) {
        return { ...prev, mt: "" };
      } else {
        return { ...prev, ms: "" };
      }
    });
    setImgSelect("")
    setCount(0)
    inputFileRef.current=null
    setImagePreview(null);
    document.getElementById(`modal_${title2}`).close();
  };

  const handleSave = () => {
    setCCCD((prev) => {
      if (id === 1) {
        return { ...prev, mt: imgSelect };
      } else {
        return { ...prev, ms: imgSelect };
      }
    });
    document.getElementById(`modal_${title2}`).close();
  };

  return (
    <div className="w-[501px] flex justify-between items-start">
      <div className="flex flex-col gap-2">
        <p className="w-fit h-5 not-italic text-gray-700">{title}</p>
        <span className="w-fit h-5 not-italic text-gray-700">{title2}</span>
      </div>
      <div className="flex flex-col gap-4 w-[318px]">
        <button
          type="button"
          onClick={() => document.getElementById(`modal_${title2}`).showModal()}
          className={`text-white w-full border ${count ===1? " bg-rose-600  border-rose-600":"bg-black border-black"}  focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2`}
        >
          {count===1 ?"Đã tải" :"Tải hình ảnh"}
        </button>

        <dialog id={`modal_${title2}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Tải hình ảnh</h3>
            <div className="py-4 border">
              <div className="relative flex flex-col justify-center items-center">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-[260px] h-[180px] object-cover"
                    />
                    <AiFillCloseCircle
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white text-gray-600 cursor-pointer"
                      onClick={handleRemoveImage}
                    />
                  </>
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
              </div>
            </div>
            <form method="dialog" className="modal-action">
              <button
                onClick={handleClear}
                type="button"
                className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
              >
                Xóa
              </button>
              <button
                onClick={handleSave}
                type="button"
                className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
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

export default CCCD;
