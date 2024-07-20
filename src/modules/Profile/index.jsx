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
import { BsCameraFill } from "react-icons/bs";
import Signature from "./Signature";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Index = ({ setShow }) => {
  const refContainer = useRef(null);
  const { data, isLoading } = useGetProfileQuery();
  const [postUpdate, { isLoading: isLoadingUpdate, isError }] = usePostUpdateMutation();
  const [isExiting, setIsExiting] = useState(false);

  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    signatureBase64: null,
    beforeIdentificationBase64: null,
    afterIdentificationBase64: null,
    bankCode: "",
    accountNumber: "",
    accountName: "",
    fullName: "",
    phoneNumber: "",
    bod: "",
    identification: "",
    dateRange: "",
    issuedBy: "",
    permanentAddress: "",
  });

  useEffect(() => {
    console.log("🚀 ~ Index ~ formData:", formData)
    if (data) {
      setFormData({
        signatureBase64: data.response.signatureUrl || null,
        beforeIdentificationBase64: data.response.beforeIdentification || null,
        afterIdentificationBase64: data.response.afterIdentification || null,
        bankCode: data.response.bankCode || null,
        accountNumber: data.response.accountNumber || null,
        accountName: data.response.accountName || null,
        fullName: data.response.fullName || null,
        phoneNumber: data.response.phoneNumber || null,
        // bod: data.response.bod || null,
        identification: data.response.identification || null,
        dateRange: data.response.dateRange || null,
        issuedBy: data.response.issuedBy || null,
        permanentAddress: data.response.permanentAddress || null,
      });
    }
  }, [data]);



  const handleUpadte = async () => {

    try {
      const rs = await postUpdate({
        ...formData,
        signatureBase64: formData.signatureBase64?.split(",")[1],
      });
      if (rs.data.isSuccess) {
        toast.success("Cập nhập thành công!");
      }
    } catch (error) {
      toast.error("Lỗi cập nhập!");
    }
  };
  const handleFileChange = (name, file) => {
    setFormData((prevData) => ({ ...prevData, [name]: file }));
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end  profile 
         ${isExiting ? "animate-slide-out" : "animate-slide-in"}`}
    >
      <ToastContainer />
      <div
        ref={refContainer}
        className="w-[556px] h-screen flex flex-col justify-start overflow-y-auto bg-white shadow-xl scroll-hidden"
      >
        {isLoading && <LoadingSpinner isLoading={isLoading} />}
        <div className="p-6 bg-black flex justify-between items-center">
          <span className="text-lg font-medium text-white">Thông tin cá nhân</span>
          <AiTwotoneCloseSquare className="w-6 h-6 rounded-sm text-white cursor-pointer" onClick={handleClose} />
        </div>

        <div className="gap-4 w-full py-6 flex flex-col justify-center items-center bg-white">
          <div className="indicator">
            <div className="indicator-item indicator-bottom top-10 right-4">
              <div
                className="rounded-full w-10 h-10 bg-gray-200 flex justify-center items-center"
                onClick={handleUploadImg}
              >
                <BsCameraFill />
              </div>
            </div>
            <div className="w-full h-fit flex justify-center items-center flex-col gap-2">
              <img
                src={imagePreview ? imagePreview : ImgAvatar}
                alt="Avatar"
                className="w-[120px] h-[120px] rounded-[50%]   object-cover"
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
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{data?.response?.fullName}</h1>
          </div>
        </div>

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

        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Thông tin người đại diện ký hợp đồng"} />
          <InputFiel
            name={"Họ và tên"}
            label={data?.response?.fullName}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"fullName"}
          />
          <InputFiel
            name={"Số điện thoại"}
            label={data?.response?.phoneNumber}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"phoneNumber"}
          />
          <InputFiel
            name={"Căn cước công dân"}
            label={data?.response?.identification}
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
            label={data?.response?.issuedBy}
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

          <Signature
            name={"Chữ ký"}
            img={data?.response?.signatureUrl}
            onChange={(file) => handleFileChange("signatureBase64", file)}
          />
          <InputFileImg
            name={"CCCD (Mặt trước)"}
            img={data?.response?.beforeIdentification}
            onChange={(file) =>
              handleFileChange("beforeIdentificationBase64", file)
            }
          />
          <InputFileImg
            name={"CCCD (Mặt sau)"}
            img={data?.response?.afterIdentification}
            onChange={(file) =>
              handleFileChange("afterIdentificationBase64", file)
            }
          />
        </div>

        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Tài khoản ngân hàng"} />
          <InputSelect
            label={data?.response?.bankCode}
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
    </div>
  );
};

export default Index;
