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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signature from "@components/BaseInput/Signature";
const Index = ({ setShow }) => {
  const refContainer = useRef(null);
  const { data, isLoading, isSuccess } = useGetProfileQuery();
  const [postUpdate, { isLoading: isLoadingUpdate, isError }] =
    usePostUpdateMutation();

  const [isExiting, setIsExiting] = useState(false);

  // handle get avatar
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // handle close
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

  // handle ref for click close
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
  const [formData, setFormData] = useState({
    AgencyAccountId: "",
    signatureUrl: null,
    beforeIdentificationBase64: null,
    afterIdentificationBase64: null,
    BankCode: "",
    AccountNumber: "",
    AccountName: "",
    FullName: "",
    PhoneNumber: "",
    BOD: "",
    Identification: "",
    DateRange: "",
    IssuedBy: "",
    PermanentAddress: "",
  });

  const [errors, setErrors] = useState({
    FullName: "",
    PhoneNumber: "",
    Identification: "",
    DateRange: "",
    IssuedBy: "",
    PermanentAddress: "",
    BankCode: "",
    AccountNumber: "",
    AccountName: "",
  });

  useEffect(() => {
    if (data?.response) {
      setFormData({
        AgencyAccountId: data.response.telegramId ,
        signatureUrl: data.response.signatureUrl,
        beforeIdentificationBase64:
          data.response.beforeIdentificationBase64,
        afterIdentificationBase64:
          data.response.afterIdentificationBase64,
        BankCode: data.response.bankCode,
        AccountNumber: data.response.accountNumber,
        AccountName: data.response.accountName,
        FullName: data.response.fullName,
        PhoneNumber: data.response.phoneNumber,
        Identification: data.response.identification,
        DateRange: data.response.dateRange,
        IssuedBy: data.response.issuedBy,
        PermanentAddress: data.response.permanentAddress,
      });
    }
  }, [data]);

  const validate = () => {
    let tempErrors = {};

    if (!formData.FullName) tempErrors.FullName = "Họ và tên là bắt buộc";
    if (!formData.PhoneNumber)
      tempErrors.PhoneNumber = "Số điện thoại là bắt buộc";
    if (!formData.Identification)
      tempErrors.Identification = "CMND/CCCD là bắt buộc";
    if (!formData.DateRange) tempErrors.DateRange = "Ngày cấp là bắt buộc";
    if (!formData.IssuedBy) tempErrors.IssuedBy = "Nơi cấp là bắt buộc";
    if (!formData.PermanentAddress)
      tempErrors.PermanentAddress = "Địa chỉ thường trú là bắt buộc";
    if (!formData.BankCode) tempErrors.BankCode = "Mã ngân hàng là bắt buộc";
    if (!formData.AccountNumber)
      tempErrors.AccountNumber = "Số tài khoản là bắt buộc";
    if (!formData.AccountName)
      tempErrors.AccountName = "Chủ tài khoản là bắt buộc";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) {
      toast.error("Vui lòng kiểm tra các trường bắt buộc");
      return;
    }

    try {
      const updatedFormData = {
        ...formData,
        signatureUrl: formData.signatureUrl?.split(",")[1],
        BankCode: formData.BankCode.toString(),
      };

      const rs = await postUpdate(updatedFormData);

      if (rs.data.statusCode === 200) {
        toast.success("Cập nhập thành công!");
        setShow(false);
      } else {
        toast.error("Cập nhập thất bại!");
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
      className={`fixed inset-0 z-50 flex justify-end profile ${
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
                className="w-[120px] h-[120px] rounded-[50%] object-cover"
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
            <h1 className="text-2xl font-bold text-gray-900">
              {formData.FullName}
            </h1>
          </div>
        </div>

        {/* User Info */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Thông tin người dùng"} />
          <InputFiel
            name={"Họ và tên"}
            label={formData.FullName}
            type={"text"}
            isEnable={true}
            setFormData={setFormData}
            variable={"FullName"}
            error={errors.FullName}
          />
          <InputFiel
            disabled={"disabled"}
            name={"Tên đăng nhập"}
            label={data?.response?.userName}
            type={"text"}
            isEnable={true}
            setFormData={setFormData}
            variable={"userName"}
          />
        </div>

        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Thông tin người đại diện ký hợp đồng"} />
          <InputFiel
            name={"Họ và tên"}
            label={formData.FullName}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"FullName"}
            error={errors.FullName}
          />
          <InputFiel
            name={"Số điện thoại"}
            label={formData.PhoneNumber}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"PhoneNumber"}
            error={errors.PhoneNumber}
          />
          <InputFiel
            name={"CMND/CCCD"}
            label={formData.Identification}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"Identification"}
            error={errors.Identification}
          />
          <InputFiel
            name={"Ngày cấp"}
            label={formatDate(formData.DateRange)}
            type={"date"}
            isEnable={false}
            setFormData={setFormData}
            variable={"DateRange"}
            error={errors.DateRange}
          />
          <InputFiel
            name={"Nơi cấp"}
            label={formData.IssuedBy}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"IssuedBy"}
            error={errors.IssuedBy}
          />
          <InputFiel
            name={"Địa chỉ thường trú"}
            label={formData.PermanentAddress}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"PermanentAddress"}
            error={errors.PermanentAddress}
          />

          <Signature
            name={"Chữ ký"}
            img={data?.response?.signatureUrl}
            onChange={(file) => handleFileChange("signatureUrl", file)}
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

        {/* Tài khoản ngân hàng */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Tài khoản ngân hàng"} />
          <InputSelect
            label={data?.response?.bankCode}
            setFormData={setFormData}
            variable={"BankCode"}
            error={errors.BankCode}
          />
          <InputFiel
            name={"Số tài khoản"}
            label={data?.response?.accountNumber}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"AccountNumber"}
            error={errors.AccountNumber}
          />
          <InputFiel
            name={"Chủ tài khoản"}
            label={data?.response?.accountName}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"AccountName"}
            error={errors.AccountName}
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
            onClick={handleUpdate}
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
