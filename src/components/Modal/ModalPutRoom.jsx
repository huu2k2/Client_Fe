import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Input from "./Input";
import TextArea from "./TextArea";
import { useGetAllDetailQuery } from "../../apis/slice/services";
import { usePostscheduleMutation } from "../../apis/slice/Agencies";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useGetRoomsNotDepositOfHouseQuery } from "../../apis/slice/rooms";
import Select from "react-select";

const validationSchema = yup.object().shape({
  customerName: yup.string().required("Tên khách hàng là bắt buộc"),
  customerPhone: yup
    .string()
    .required("SĐT khách hàng là bắt buộc")
    .matches(/^[0-9]+$/, "SĐT khách hàng chỉ chứa số")
    .min(10, "SĐT khách hàng phải có ít nhất 10 chữ số"),
  viewDate: yup
    .string()
    .required("Ngày xem phòng là bắt buộc")
    .test("is-future-date", "Ngày xem phòng phải lớn hơn hoặc bằng ngày hiện tại", (value) => {
      return new Date(value) >= new Date().setHours(0, 0, 0, 0);
    }),
  viewTime: yup.string()
    .required("Giờ xem phòng là bắt buộc"),

  note: yup.string(),
});

export const ModalPutRoom = ({ dropdownRef, setIsShowModal, roomId, setStatusCode, id }) => {
  const { data: housedata } = useGetRoomsNotDepositOfHouseQuery(id);

  const options = housedata?.response.map((i) => ({
    value: i.roomId,
    label: "P." + i.roomCode
  }));

  const [formData, setFormData] = useState({
    customerName: "",
    viewDate: "",
    viewTime: "",
    customerPhone: "",
    note: "",
  });
  const [selectedRoom, setSelectedRoom] = useState(roomId); // State for selected room
  const [postschedule, { error }] = usePostscheduleMutation();

  const { data } = useGetAllDetailQuery(roomId, {
    skip: !roomId, // Skip query if roomId is undefined
  });

  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState("");

  const SalerName = data?.response?.managers?.[0]?.managerName || "";
  const SalerPhone = data?.response?.managers?.[0]?.phoneNumber || "";
  const company = data?.response?.holder?.fullName || "";

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  ;
  const onSubmit = async (formData) => {
    console.log("🚀 ~ onSubmit ~ formData:", formData)

    // const viewTime = new Date(`${formData.viewDate}T${formData.viewTime}:00`);

    const viewTime = (`${formData.viewDate}T${formData.viewTime}:11.805Z`);

    console.log("🚀 ~ onSubmit ~ viewTime:", viewTime)
    try {
      // const viewTime = new Date(`${formData.viewDate}T${formData.viewTime}10.297Z`);
      const response = await postschedule({
        ...formData,
        dateView: viewTime,
        roomId: selectedRoom, // Use the selected room ID
        company,
        SalerName,
        SalerPhone,
      }).unwrap();
      console.log("🚀 ~ onSubmit ~ viewTime:", viewTime)
      setResponse(response);
      if (response.statusCode === 200) {
        toast.success("Đặt lịch thành công!");
        reset({
          customerName: "",
          customerPhone: "",
          viewDate: "",
          viewTime: "",
          note: "",
        });
        setIsShowModal(false);
      } else {
        setStatusCode(400);
      }
    } catch (error) {
      setStatusCode(400);
    }
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

        <form className="w-[1280px] h-fit gap-8 flex flex-col justify-start" onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-5 flex">
            <div className="w-full h-fit gap-5 flex flex-col justify-start">
              <Input
                label="Tên khách hàng"
                name="customerName"
                value={formData.customerName}
                onChange={(e) => {
                  setFormData({ ...formData, customerName: e.target.value });
                  setValue("customerName", e.target.value);
                }}
                width={"w-[400px]"}
                ref={register}
              />
              <p className="text-rose-500">{errors.customerName?.message}</p>
              <Input
                label="SĐT khách hàng"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => {
                  setFormData({ ...formData, customerPhone: e.target.value });
                  setValue("customerPhone", e.target.value);
                }}
                width={"w-[400px]"}
                ref={register}
              />
              <p className="text-rose-500">{errors.customerPhone?.message}</p>

              <div>
                <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
                <div className="flex mr-[135px] w-full mt-5">
                  <p className="flex justify-start">Chọn phòng</p>
                  <div className="flex justify-center ml-[300px]">
                    <Select
                      className="w-[370px]"
                      placeholder="Chọn phòng"
                      options={options}
                      onChange={(selectedOption) => {
                        setSelectedRoom(selectedOption.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <Input
                label="Ngày xem phòng"
                type="date"
                name="viewDate"
                value={formData.viewDate}
                onChange={(e) => {
                  setFormData({ ...formData, viewDate: e.target.value });
                  setValue("viewDate", e.target.value);
                }}
                width={"w-[400px]"}
                ref={register}
              />
              <p className="text-rose-500">{errors.viewDate?.message}</p>
              <Input
                min="06:00" max="19:00"
                label="Giờ xem phòng"
                type="time"
                name="viewTime"
                value={formData.viewTime}
                onChange={(e) => {
                  setFormData({ ...formData, viewTime: e.target.value });
                  setValue("viewTime", e.target.value);
                }}
                defaultValue={"00:00"}
                width={"w-[400px]"}
                ref={register}
              />
              <p className="text-rose-500">{errors.viewTime?.message}</p>
              <TextArea
                label="Ghi chú"
                name="note"
                value={formData.note}
                onChange={(e) => {
                  setFormData({ ...formData, note: e.target.value });
                  setValue("note", e.target.value);
                }}
                width={"w-[400px]"}
                ref={register}
              />
            </div>
          </div>

          <div className="mt-[7px]">
            <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
            <div className="flex justify-end mt-5 w-full h-[38px]">
              {error && <p className="text-rose-600 mr-10 flex items-center">{error?.data?.message}</p>}
              {response && <p className="text-green-600 mr-10 flex items-center">{response?.message}</p>}

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
