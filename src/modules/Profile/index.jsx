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
import { usePostCCCDMutation } from "../../apis/slice/ImageOfRoom";
import { parse, format } from "date-fns";

const Index = ({ setShow }) => {
  const refContainer = useRef(null);
  const { data, isLoading, isSuccess } = useGetProfileQuery();
  const [postUpdate, { isLoading: isLoadingUpdate, isError }] = usePostUpdateMutation();
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

  const handleCancel = () => {
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
    signatureBase64: null,
    beforeIdentificationBase64: null,
    afterIdentificationBase64: null,
    bankCode: "",
    accountNumber: "",
    accountName: "",
    fullName: "",
    phoneNumber: "",
    BOD: "",
    identification: "",
    dateRange: "",
    issuedBy: "",
    permanentAddress: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    identification: "",
    dateRange: "",
    issuedBy: "",
    permanentAddress: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
  });
  useEffect(() => {
    if (data) {
      setFormData({
        AgencyAccountId: data.response.agencyAccountId || null,
        signatureBase64: null,
        beforeIdentificationBase64: data.response.beforeIdentification ? data.response.beforeIdentification.split(",")[1] : null,
        afterIdentificationBase64: data.response.afterIdentification ? data.response.afterIdentification.split(",")[1] : null,
        bankCode: data.response.bankCode || null,
        accountNumber: data.response.accountNumber || null,
        accountName: data.response.accountName || null,
        fullName: data.response.fullName || null,
        phoneNumber: data.response.phoneNumber || null,
        identification: data.response.identification || null,
        dateRange: data.response.dateRange || null,
        issuedBy: data.response.issuedBy || null,
        permanentAddress: data.response.permanentAddress || null,
      });
    }
  }, [data]);

  const validate = () => {
    let tempErrors = {};

    if (!formData.fullName) tempErrors.fullName = "Họ và tên là bắt buộc";
    if (!formData.phoneNumber) tempErrors.phoneNumber = "Số điện thoại là bắt buộc";
    if (!formData.identification) tempErrors.identification = "CMND/CCCD là bắt buộc";
    if (!formData.dateRange) tempErrors.dateRange = "Ngày cấp là bắt buộc";
    if (!formData.issuedBy) tempErrors.issuedBy = "Nơi cấp là bắt buộc";
    if (!formData.permanentAddress) tempErrors.permanentAddress = "Địa chỉ thường trú là bắt buộc";
    if (!formData.bankCode) tempErrors.bankCode = "Mã ngân hàng là bắt buộc";
    if (!formData.accountNumber) tempErrors.accountNumber = "Số tài khoản là bắt buộc";
    if (!formData.accountName) tempErrors.accountName = "Chủ tài khoản là bắt buộc";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };
console.log("formData",formData)
  const handleUpdate = async () => {
    if (!validate()) {
      toast.error("Vui lòng kiểm tra các trường bắt buộc");
      return;
    }

    try {
      const updatedFormData = {
        ...formData,
        signatureBase64: formData?.signatureBase64?.split(",")[1],
        bankCode: formData.bankCode.toString(),
        bod: "2024-07-26T14:54:51.919Z",
      };

      const rs = await postUpdate(updatedFormData);

      if (rs.data.statusCode === 200) {
        toast.success("Cập nhật thành công!");
        setShow(false);
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi cập nhật!");
    }
  };

  const handleFileChange = (name, file) => {
    setFormData((prevData) => ({ ...prevData, [name]: file }));
  };
  const [postCCCD] = usePostCCCDMutation();
const [CCCD,setCCCD] = useState({mt:'',ms:''})
const [InfoCCCD, getInfoCCCD] = useState({
  fullName: "",
  birthOfDay: "",
  identification: "",
  dateRange: "",
  issuedBy: "",
  permanentAddress: "",
});
const [isLoadings, setIsLoading] = useState(false);
const convertDate = (dateString) => {
  // Chuyển đổi từ "dd/MM/yyyy" sang đối tượng Date
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  // Định dạng lại từ đối tượng Date sang "yyyy-MM-dd"
  return format(parsedDate, "yyyy-MM-dd");
};
useEffect(()=>{
  async function GetInfoFromCCCD() {
    try {
      if (CCCD.mt !== "" && CCCD.ms !== "") {
        setIsLoading(true);
        const kq = await postCCCD({
          iD_Front: CCCD.mt,
          iD_Back: CCCD.ms,
        }).unwrap();

        getInfoCCCD({
          fullName: kq.result.name,
          birthOfDay: convertDate(kq.result.dob),
          identification: kq.result.id,
          dateRange: convertDate(kq.result.issue_date),
          issuedBy: kq.result.issue_loc,
          permanentAddress: kq?.result?.address,
        });
        
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
     
  }
  GetInfoFromCCCD();
},[CCCD])

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end profile ${isExiting ? "animate-slide-out" : "animate-slide-in"}`}
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
              {InfoCCCD.fullName || data?.response?.fullName}
            </h1>
          </div>
        </div>

        {/* User Info */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Thông tin người dùng"} />
          <InputFiel
            name={"Họ và tên"}
            label={InfoCCCD.fullName||data?.response?.fullName}
            type={"text"}
            isEnable={true}
            setFormData={setFormData}
            variable={"fullName"}
            error={errors.fullName}
          />
          <InputFiel
            disabled={'disabled'}
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
            label={InfoCCCD.fullName || data?.response?.fullName}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"fullName"}
            error={errors.fullName}
            readonly={true}
          />
          <InputFiel
            name={"Số điện thoại"}
            label={data?.response?.phoneNumber}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"phoneNumber"}
            error={errors.phoneNumber}
          />
          <InputFiel
            name={"CMND/CCCD"}
            label={InfoCCCD.identification||data?.response?.identification}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"identification"}
            error={errors.identification}
            readonly={true}
          />
          <InputFiel
            name={"Ngày cấp"}
            label={InfoCCCD.dateRange||formatDate(data?.response?.dateRange)}
            type={"date"}
            isEnable={false}
            setFormData={setFormData}
            variable={"dateRange"}
            error={errors.dateRange}
            readonly={true}
          />
          <InputFiel
            name={"Nơi cấp"}
            label={InfoCCCD.issuedBy || data?.response?.issuedBy}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"issuedBy"}
            error={errors.issuedBy}
            readonly={true}
          />
          <InputFiel
            name={"Địa chỉ thường trú"}
            label={InfoCCCD.permanentAddress || data?.response?.permanentAddress}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"permanentAddress"}
            error={errors.permanentAddress}
            readonly={true}
          />

          <Signature
            name={"Chữ ký"}
            img={data?.response?.signatureUrl}
            onChange={(file) => handleFileChange("signatureBase64", file)}
          />
          {isLoadings && <div className="w-full flex justify-center items-center"><span className="loading loading-bars loading-md"></span></div>}
          <InputFileImg
            name={"CCCD (Mặt trước)"}
            img={data?.response?.beforeIdentification}
            onChange={(file) => handleFileChange("beforeIdentificationBase64", file)}
            setCCCD={setCCCD}
          />
          <InputFileImg
            name={"CCCD (Mặt sau)"}
            img={data?.response?.afterIdentification}
            onChange={(file) => handleFileChange("afterIdentificationBase64", file)}
            setCCCD={setCCCD}
          />
        </div>

        {/* Tài khoản ngân hàng */}
        <div className="w-full gap-5 flex flex-col justify-start items-center bg-white p-5">
          <TitleContainer title={"Tài khoản ngân hàng"} />
          <InputSelect
            label={data?.response?.bankCode}
            setFormData={setFormData}
            variable={"bankCode"}
            error={errors.bankCode}
          />
          <InputFiel
            name={"Số tài khoản"}
            label={data?.response?.accountNumber}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"accountNumber"}
            error={errors.accountNumber}
          />
          <InputFiel
            name={"Chủ tài khoản"}
            label={data?.response?.accountName}
            type={"text"}
            isEnable={false}
            setFormData={setFormData}
            variable={"accountName"}
            error={errors.accountName}
          />
        </div>

        {/* Fixed button */}
        <div className="w-[556px] h-[79px] border-t-2 z-50 bg-white flex justify-end items-center gap-4 px-6 py-5 mb-10">
          <button
            className="flex w-fit py-[9px] px-[17px] justify-center items-center rounded-[6px] border border-gray-300 bg-white shadow-sm"
            onClick={handleCancel}
          >
            Hủy
          </button>
          <button
            onClick={handleUpdate}
            className="flex w-fit py-[9px] px-[17px] justify-center items-center rounded-[6px] border border-gray-300 bg-rose-600 text-white shadow-sm"
          >
            {isLoadings && (<span className="loading loading-spinner text-neutral"></span> )}
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
