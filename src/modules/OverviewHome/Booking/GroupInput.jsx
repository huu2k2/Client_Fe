import React from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "./schema";
const GroupInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)
  return (
    <>
      <div className="self-stretch h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>

      <div className="pr-[525px] flex  gap-2">
        <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
          Nhân viên sale
        </div>
        <div className="h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
          <input
            type="text"
            className="text-sm font-normal  leading-tight outline-none w-full"
            placeholder="Tên nhân viên sale"
          />
        </div>
      </div>
      {/*  */}
      <div className="self-stretch h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>

      <div className="pr-[525px] flex  gap-2">
        <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
          Số điện thoại
        </div>
        <div className="h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
          <input
            type="text"
            className="text-sm font-normal leading-tight outline-none w-full"
            placeholder="Tên nhân viên sale"
          />
        </div>
      </div>
      {/*  */}
      <div className="self-stretch h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>

      <div className="pr-[525px] flex  gap-2">
        <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
          Tên công ty/nhóm/đơn vị
        </div>
        <div className="h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
          <input
            type="text"
            className="text-sm font-normal leading-tight outline-none w-full"
            placeholder="Tên nhân viên sale"
          />
        </div>
      </div>
      {/*  */}
      <div className="self-stretch h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>

      <div className="pr-[525px] flex  gap-2">
        <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
          Tên khách hàng
        </div>
        <div className="h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
          <input
            type="text"
            className="text-sm font-normal leading-tight outline-none w-full"
            placeholder="Tên nhân viên sale"
          />
        </div>
      </div>
      {/*  */}

      <div className="self-stretch h-px bg-gray-200" />
      <div className="pr-[525px] flex  gap-2">
        <div className="w-[411px]  text-gray-700 text-sm font-medium leading-tight ">
          Thời gian xem phòng
        </div>
        <div className="h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex">
          <input
            type="date"
            className="text-gray-500 text-sm font-normal leading-tight outline-none w-full"
          />
        </div>
      </div>

      <div className="self-stretch h-px bg-gray-200" />
      <div className="w-full flex   gap-2">
        <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight  ">
          Ghi chú
        </div>
        <div className="h-[105px] w-[320px] bg-white rounded-md shadow border border-gray-300 flex items-start px-3 py-2">
          <textarea
            className="text-sm font-normal leading-tight outline-none w-full h-full"
            placeholder="Ghi chú"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default GroupInput;
