import React, { useRef, useState } from "react";
import { AiTwotoneCloseSquare } from "react-icons/ai";
import ImgAvatar from "@assets/Profile.png";
import InputFiel from "./InputFiel";
import TitleContainer from "./TitleContainer";
import InputSelect from "./InputSelect";
import InputFileImg from "./InputFileImg";
import { useGetProfileQuery } from "@apis/slice/profile";
import LoadingSpinner from "@components/CustomLoading/LoadingSpinner";
const Index = ({ setShow }) => {

  const {data,isLoading} = useGetProfileQuery()
  console.log(data)
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShow(false);
      setIsExiting(false);
    }, 1000); // Duration of the slide-out animation
  };

  // handle get avatar 
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
 
  return (
    <div className={`fixed inset-0 z-50 flex justify-end ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}`}>
      <div className="w-[556px] h-screen flex flex-col justify-start overflow-y-auto bg-white shadow-xl scroll-hidden">
        {/* Header */}
        {isLoading &&  <LoadingSpinner isLoading={isLoading} />}
        <div className="p-6 bg-black flex justify-between items-center">
          <span className="text-lg font-medium text-white">Thông tin cá nhân</span>
          <AiTwotoneCloseSquare
            className="w-6 h-6 rounded-sm text-white cursor-pointer"
            onClick={handleClose}
          />
        </div>

        {/* Info */}
        <div className="gap-4 w-full py-6 flex flex-col justify-center items-center bg-white">
          <div className="w-full h-fit flex justify-center items-center flex-col gap-2">
            <img src={imagePreview ? imagePreview : ImgAvatar} alt="Avatar" className="w-[120px] h-[120px] rounded-[50%]" />
            <input type="file" name="imgProfile" ref={inputFileRef} className="hidden" onChange={handleImageChange} accept=".png, .jpg, .jpeg, .gif"/>
            <button className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium" onClick={handleUploadImg}>
              Change
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{data?.isSuccess ? data.response.fullName :"Thu Sương" }</h1>
          </div>
        </div>

        {/* User Info */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Thông tin người dùng"} />
          <InputFiel name={"Họ và tên"} label={data?.response?.fullName} type={"text"} />
          <InputFiel name={"Tên đăng nhập"} label={"Suong123"} type={"text"} />
        </div>

        {/* Contract Representative Info */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Thông tin người đại diện ký hợp đồng"} />
          <InputFiel name={"Họ và tên"} label={data?.response?.fullName || "Trần Thị Thu Sương"} type={"text"} />
          <InputFiel name={"Số điện thoại"} label={data?.response?.phoneNumber || "0987654321"} type={"text"} />
          <InputFiel name={"Ngày sinh"} label={null} type={"date"} />
          <InputFiel name={"Căn cước công dân"} label={"12237468745698"} type={"text"} />
          <InputFiel name={"Ngày cấp"} label={null} type={"date"} />
          <InputFiel name={"Nơi cấp"} label={"Công an tỉnh Quảng Trị"} type={"text"} />
          <InputFiel name={"Địa chỉ thường trú"} label={""} type={"text"} />
          <InputFileImg name={'Chữ ký'} />
          <InputFileImg name={'CCCd (Mặt trước)'} />
          <InputFileImg name={'CCCd (Mặt sau)'} />
        </div>

        {/* Tài khoản ngân hàng */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Tài khoản ngân hàng"} />
          <InputSelect />
          <InputFiel name={"Số tài khoản"} label={""} type={"text"} />
          <InputFiel name={"Chủ tài khoản"} label={""} type={"text"} />
        </div>

        {/* Fixed button */}
        <div className="w-[556px] h-[79px] border-t-2 z-50 bg-white flex justify-end items-center gap-4 px-6 py-5">
          <button className="flex w-fit py-[9px] px-[17px] justify-center items-center rounded-[6px] border border-gray-300 bg-white shadow-sm">
            Hủy
          </button>
          <button className="flex w-fit py-[9px] px-[17px] justify-center items-center rounded-[6px] border border-gray-300 bg-red-700 text-white shadow-sm">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
