import React from 'react';

const InfoAccount = () => {
  return (
    <div className="self-stretch h-[512px] flex-col justify-start items-start gap-6 flex">
      <div className="self-stretch h-6 flex-col justify-start items-start flex">
        <div className="self-stretch text-rose-800 text-lg font-medium  leading-normal">
          Thông tin khách hàng
        </div>
      </div>
      <div className="self-stretch h-[464px] flex-col justify-start items-start gap-4 flex">
        <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
          <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
            Tên khách hàng
          </div>
          <div className="h-[38px] px-[13px] py-[1px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
            <input
              type="text"
              className="w-full text-sm font-normal  leading-tight outline-none"
              placeholder="Nhập tên khách hàng"
            />
          </div>
        </div>
        <div className="self-stretch h-px flex-col justify-start items-start flex">
          <div className="self-stretch h-px bg-gray-200" />
        </div>
        <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
          <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
            Số điện thoại
          </div>
          <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
            <input
              type="text"
              className="w-full text-sm font-normal  leading-tight outline-none"
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
          <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
            Ngày sinh
          </div>
          <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
            <input
              type="date"
              className="w-full text-sm font-normal text-gray-500 leading-tight outline-none"
              placeholder="dd/mm/yyyy"
            />
           
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
          <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
            CCCD/CMND
          </div>
          <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
            <input
              type="text"
              className="w-full text-sm font-normal  leading-tight outline-none"
              placeholder="Nhập CCCD/CMND"
            />
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
          <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
            Ngày cấp
          </div>
          <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
            <input
              type="date"
              className="w-full text-sm font-normal text-gray-500 leading-tight outline-none"
              placeholder="dd/mm/yyyy"
            />
           
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
          <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
            Nơi cấp
          </div>
          <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
            <input
              type="text"
              className="w-full text-sm font-normal  leading-tight outline-none"
              placeholder="Nhập nơi cấp"
            />
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
          <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
            Địa chỉ thường trú
          </div>
          <div className="h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex w-80">
            <input
              type="text"
              className="w-full text-sm font-normal  leading-tight outline-none"
              placeholder="Nhập địa chỉ thường trú"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAccount;
