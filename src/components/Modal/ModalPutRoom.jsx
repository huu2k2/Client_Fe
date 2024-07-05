import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Input from "./Input";
import TextArea from "./TextArea";
import { useGetAllDetailQuery } from "../../apis/slice/services";
import { usePostscheduleMutation } from "../../apis/slice/Agencies";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const ModalPutRoom = ({ dropdownRef, setIsShowModal, roomId }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    viewDate: "",
    viewTime: "",
    customerPhone: "",
    notes: "",
  });
  const [postschedule, { error }] = usePostscheduleMutation();
  console.log("🚀 ~ ModalPutRoom ~ error:", error);
  const { data } = useGetAllDetailQuery(roomId);
  const [response, setResponse] = useState(null);

  const SalerName = data?.response?.managers[0]?.managerName;
  const SalerPhone = data?.response?.managers[0]?.phoneNumber;
  const company = data?.response?.holder?.fullName;

  useEffect(() => {
    if (data?.response?.dateView) {
      const date = new Date(data.response.dateView);
      const viewDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
      const viewTime = date.toTimeString().split(" ")[0].substring(0, 5); // HH:MM format
      setFormData((prevFormData) => ({
        ...prevFormData,
        viewDate,
        viewTime,
      }));
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const viewTime = new Date(`${formData.viewDate}T${formData.viewTime}`);
      const response = await postschedule({
        ...formData,
        viewTime: viewTime.toISOString(),
        roomId,
        company,
        SalerName,
        SalerPhone,
      }).unwrap();
      setResponse(response);
      console.log(response);
    } catch (error) {
      console.error("Failed to schedule:", error);
      setResponse(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center fixed bg-gray-500 bg-opacity-50 inset-0 z-50"
      ref={dropdownRef}
    >
      <div className="relative w-[1360px] h-fit py-6 px-10 gap-5 bg-white rounded-lg shadow-custom flex flex-col justify-start">
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsShowModal(false)}
        >
          <AiFillCloseCircle />
        </div>
        {/* title */}
        <div className="flex flex-col justify-start gap-1 self-stretch h-12">
          <span className="text-gray-900 text-lg leading-6 font-medium">
            Nhà trọ 123 Lê Hoàng Phái
          </span>
          <span className="text-gray-500 font-normal text-sm leading-5">
            123 Lê Hoàng Phái, Phường 12, Gò Vấp, Tp. Hồ Chí Minh
          </span>
        </div>
        <form
          className="w-[1280px] h-fit gap-8 flex flex-col justify-start"
          onSubmit={handleSubmit}
        >
          <div className="w-full h-fit gap-5 flex flex-col justify-start">
            <Input
              label="Tên khách hàng"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              width={"w-[400px]"}
            />
            <Input
              label="SĐT khách hàng"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              width={"w-[400px]"}
            />
            <Input
              label="Ngày xem phòng"
              type="date"
              name="viewDate"
              value={formData.viewDate}
              onChange={handleChange}
              width={"w-[400px]"}
            />
            <Input
              label="Giờ xem phòng"
              type="time"
              name="viewTime"
              value={formData.viewTime}
              onChange={handleChange}
              defaultValue={"00:00"}
              width={"w-[400px]"}
            />
            <TextArea
              label="Ghi chú"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              width={"w-[400px]"}
            />
          </div>

          <div className="mt-[7px]">
            <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
            <div className="flex justify-end mt-5 w-full h-[38px]">
              {error && (
                <p className="text-rose-600 mr-10 flex items-center">
                  {error?.data?.mesagee}{" "}
                </p>
              )}
              {response && (
                <p className="text-green-600 mr-10 flex items-center">
                  {response?.mesagee}{" "}
                </p>
              )}

              <button
                type="submit"
                className="flex justify-center items-center px-4 py-2 rounded-md bg-red-600 shadow-sm text-white text-sm font-medium leading-5"
              >
                Đặt lịch
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
