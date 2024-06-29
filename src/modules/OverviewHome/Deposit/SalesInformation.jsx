import React from 'react';
import IMGQR from '../../../assets/QR.png'
const SalesInformation = () => {
  return (
    <>
      <div className="self-stretch h-px bg-rose-800 flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>
      <div className="self-stretch h-[747px] flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch h-6 flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch text-rose-800 text-lg font-medium  leading-normal">
            Thông tin nhân viên sale
          </div>
        </div>
        <div className="self-stretch h-[699px] flex-col justify-start items-start gap-4 flex">
          <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
            <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
              Tên nhân viên sale
            </div>
            <div className="h-[38px] w-80 px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
              <input
                type="text"
                className="w-full bg-transparent text-sm font-normal  leading-tight focus:outline-none"
                placeholder=""
              />
            </div>
          </div>
          <div className="self-stretch h-px bg-gray-200" />
          <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
            <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
              Số điện thoại
            </div>
            <div className="h-[38px] w-80 px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
              <input
                type="text"
                className="w-full bg-transparent text-sm font-normal  leading-tight focus:outline-none"
                placeholder=""
              />
            </div>
          </div>
          <div className="self-stretch h-px bg-gray-200" />
          <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
            <div className="w-[411px] text-gray-700 text-sm font-medium  leading-tight">
              Tên công ty/nhóm/đơn vị
            </div>
            <div className="h-[38px] w-80 px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
              <input
                type="text"
                className="w-full bg-transparent text-sm font-normal  leading-tight focus:outline-none"
                placeholder=""
              />
            </div>
          </div>
          <div className="self-stretch h-px bg-gray-200" />
          <div className="w-[1280px] h-[486px] relative">
            <div className="w-[411px] left-0 top-[9px] absolute text-gray-900 text-lg font-medium  leading-normal">
              QR chuyển tiền
            </div>
            <img
              className="w-80 h-[486px] left-[435px] top-0 absolute"
              src={IMGQR}
              alt="QR code"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesInformation;
