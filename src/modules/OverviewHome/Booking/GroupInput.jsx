import React from "react";

const GroupInput = ({ register, errors }) => {
  return (
    <>
      <div className="self-stretch h-[521px] flex-col justify-start items-start gap-5 flex">
        <div className="self-stretch h-px flex-col justify-start items-start flex">
          <div className="self-stretch h-px bg-gray-200" />
        </div>

        <div className="pr-[525px] flex  gap-2">
          <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
            Nhân viên sale
          </div>
          <div className={`h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border ${errors.salerName ? 'border-red-500' : 'border-gray-300'} justify-start items-center inline-flex`}>
            <input
              {...register("salerName")}
              type="text"
              className={"text-sm font-normal  leading-tight outline-none w-full"}
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
          <div className={`h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border ${errors.salerPhone ? 'border-red-500' : 'border-gray-300'} justify-start items-center inline-flex`}>
            <input
              {...register("salerPhone")}
              type="text"
              className="text-sm font-normal leading-tight outline-none w-full"
              placeholder="Số điện thoại"
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
          <div className={`h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border ${errors.company ? 'border-red-500' : 'border-gray-300'} justify-start items-center inline-flex`}>
            <input
              {...register("company")}
              type="text"
              className="text-sm font-normal leading-tight outline-none w-full"
              placeholder="Tên công ty/nhóm/đơn vị"
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
          <div className={`h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border ${errors.customerName ? 'border-red-500' : 'border-gray-300'} justify-start items-center inline-flex`}>
            <input
              {...register("customerName")}
              type="text"
              className="text-sm font-normal leading-tight outline-none w-full"
              placeholder="Tên khách hàng"
            />
          </div>
        </div>
        {/*  */}

        <div className="self-stretch h-px bg-gray-200" />
        <div className="pr-[525px] flex  gap-2">
          <div className="w-[411px]  text-gray-700 text-sm font-medium leading-tight ">
            Thời gian xem phòng
          </div>
          <div className={`h-[38px] w-[320px] px-[13px] py-[4px] bg-white rounded-md shadow border ${errors.dateView ? 'border-red-500' : 'border-gray-300'} justify-between items-center inline-flex`}>
            <input
              {...register("dateView")}
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
          <div className={`h-[105px] w-[320px] bg-white rounded-md shadow border ${errors.note ? 'border-red-500' : 'border-gray-300'} flex items-start px-3 py-2`}>
            <textarea
              {...register("note")}
              className="text-sm font-normal leading-tight outline-none w-full h-full"
              placeholder="Ghi chú"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupInput;
