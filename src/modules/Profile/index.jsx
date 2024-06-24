import React, { useEffect, useRef, useState } from "react";
import { AiTwotoneCloseSquare } from "react-icons/ai";
import ImgAvatar from "@assets/Profile.png";
import InputFiel from "./InputFiel";
import TitleContainer from "./TitleContainer";
import InputSelect from "./InputSelect";
import InputFileImg from "./InputFileImg";
import { useGetProfileQuery, usePostUpdateMutation } from "@apis/slice/profile";
import LoadingSpinner from "@components/CustomLoading/LoadingSpinner";
import { formatDate } from "@utils";

const Index = ({ setShow }) => {
  const refContainer = useRef(null);
  const { data, isLoading } = useGetProfileQuery();
  const [postUpdate, { isLoading: isLoadingUpdate, isError, isSuccess }] =
    usePostUpdateMutation();

  const [isExiting, setIsExiting] = useState(false);

  // handle get avatar
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // hanlde close
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShow(false);
      setIsExiting(false);
    }, 1000); // Duration of the slide-out animation
  };
  // handle change image
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
  const hanldeCancle = () => {
    handleClose();
  };

  //   handle ref for click close
  const handleClickOutside = (event) => {
    if (refContainer.current && !refContainer.current.contains(event.target)) {
      handleClose();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle data for update
  // select all data for update
  const [formData, setFormData] = useState({
    telegramId: "",
    identification: "",
    issuedBy: "",
    dateRange: "",
    signature: "",
    accountNumber: "",
    fullName: "",
    bankCode: "",
    bod: "",
    permanentAddress: "",
    position: "",
    ownerId: "",
    role: "",
    accountName: "",
    id: "",
    phoneNumber: "",
    userName: "",
  });
  useEffect(() => {
    if (data) {
      setFormData({
        telegramId: data.response.telegramId || "",
        identification: data.response.identification || "",
        issuedBy: data.response.issuedBy || "",
        dateRange: data.response.dateRange || "",
        signature: data.response.signatureUrl || "",
        accountNumber: data.response.accountNumber || "",
        fullName: data.response.fullName || "",
        bankCode: data.response.bankCode || "",
        bod: data.response.bod || "",
        permanentAddress: data.response.permanentAddress || "",
        position: data.response.position || "",
        ownerId: data.response.ownerId || "",
        role: data.response.role || "",
        accountName: data.response.accountName || "",
        id: data.response.id || "",
        phoneNumber: data.response.phoneNumber || "",
        userName: data.response.userName || "",
      });
    }
  }, [data]);
  const handleUpadte = async() => {
   const rs = await postUpdate(formData)
   console.log(rs)
  };
   return (
    <div
      className={`fixed inset-0 z-50 flex justify-end   ${
        isExiting ? "animate-slide-out" : "animate-slide-in"
      }`}
    >
      <div
        ref={refContainer}
        className="w-[556px] h-screen flex flex-col justify-start overflow-y-auto bg-white shadow-xl scroll-hidden"
      >
        {/* Header */}
        {isLoading && <LoadingSpinner isLoading={isLoading} />}
        <div className="p-6 bg-black flex justify-between items-center">
          <span className="text-lg font-medium text-white">
            Thông tin cá nhân
          </span>
          <AiTwotoneCloseSquare
            className="w-6 h-6 rounded-sm text-white cursor-pointer"
            onClick={handleClose}
          />
        </div>

        {/* Info */}
        <div className="gap-4 w-full py-6 flex flex-col justify-center items-center bg-white">
          <div className="w-full h-fit flex justify-center items-center flex-col gap-2">
            <img
              src={imagePreview ? imagePreview : ImgAvatar}
              alt="Avatar"
              className="w-[120px] h-[120px] rounded-[50%]   object-cover"
              onClick={handleUploadImg}
            />
            <input
              type="file"
              name="imgProfile"
              ref={inputFileRef}
              className="hidden"
              onChange={handleImageChange}
              accept=".png, .jpg, .jpeg, .gif"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {data?.response?.fullName}
            </h1>
          </div>
        </div>

        {/* User Info */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Thông tin người dùng"} />
          <InputFiel
            name={"Họ và tên"}
            label={data?.response?.fullName}
            type={"text"}
            isEnable={true}
            setFormData={setFormData}
            variable={"fullName"}
          />
          <InputFiel
            name={"Tên đăng nhập"}
            label={data?.response?.userName}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"userName"}
          />
        </div>

        {/* Contract Representative Info */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Thông tin người đại diện ký hợp đồng"} />
          <InputFiel
            name={"Họ và tên"}
            label={data?.response?.fullName || "Trần Thị Thu Sương"}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"fullName"}
          />
          <InputFiel
            name={"Số điện thoại"}
            label={data?.response?.phoneNumber || "0987654321"}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"phoneNumber"}
          />
          <InputFiel
            name={"Ngày sinh"}
            label={formatDate(data?.response?.bod)}
            type={"date"}
            isEnable={false}
            setFormData={setFormData}
            variable={"bod"}
          />
          <InputFiel
            name={"Căn cước công dân"}
            label={data?.response?.identification || "12237468745698"}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"identification"}
          />
          <InputFiel
            name={"Ngày cấp"}
            label={formatDate(data?.response?.dateRange)}
            type={"date"}
            isEnable={false}
            setFormData={setFormData}
            variable={"dateRange"}
          />
          <InputFiel
            name={"Nơi cấp"}
            label={data?.response?.issuedBy || "Công an tỉnh Quảng Trị"}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"issuedBy"}
          />
          <InputFiel
            name={"Địa chỉ thường trú"}
            label={data?.response?.permanentAddress}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"permanentAddress"}
          />
          <InputFileImg
            name={"Chữ ký"}
            img={data?.response?.signatureUrl}
             
          />
          <InputFileImg
            name={"CCCd (Mặt trước)"}
            img={data?.response?.beforeIdentification}
             
          />
          <InputFileImg
            name={"CCCd (Mặt sau)"}
            img={data?.response?.afterIdentification}
             
          />
        </div>

        {/* Tài khoản ngân hàng */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Tài khoản ngân hàng"} />
          <InputSelect
            label={data?.response?.bankCode || "bank"}
            setFormData={setFormData}
            variable={"bankCode"}
          />
          <InputFiel
            name={"Số tài khoản"}
            label={data?.response?.accountNumber}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"accountNumber"}
          />
          <InputFiel
            name={"Chủ tài khoản"}
            label={data?.response?.accountName}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"accountName"}
          />
        </div>

        {/* Fixed button */}
        <div className="w-[556px] h-[79px] border-t-2 z-50 bg-white flex justify-end items-center gap-4 px-6 py-5">
          <button
            className="flex w-fit py-[9px] px-[17px] justify-center items-center rounded-[6px] border border-gray-300 bg-white shadow-sm"
            onClick={hanldeCancle}
          >
            Hủy
          </button>
          <button
            onClick={handleUpadte}
            className="flex w-fit py-[9px] px-[17px] justify-center items-center rounded-[6px] border border-gray-300 bg-red-700 text-white shadow-sm"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
