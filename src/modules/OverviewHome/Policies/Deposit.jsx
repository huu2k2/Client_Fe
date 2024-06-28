import React from "react";

const Deposit = () => {
  return (
    <div className="self-stretch h-[186px] bg-white rounded-lg shadow flex-col justify-start items-start flex">
      <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-rose-800 text-lg font-medium font-['Inter'] leading-normal">
          Đặt cọc
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch h-[121px] flex-col justify-center items-center flex">
        <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-[1264px] h-5 justify-center items-start gap-4 inline-flex">
            <div className="w-[410px] text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Cọc ký quỹ
            </div>
            <div className="w-[838px] text-gray-900 text-sm font-normal font-['Inter'] leading-tight">
              1 tháng
            </div>
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-[1264px] h-5 justify-center items-start gap-4 inline-flex">
            <div className="w-[410px] text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Giữ phòng tối đa
            </div>
            <div className="w-[838px] text-gray-900 text-sm font-normal font-['Inter'] leading-tight">
              7 ngày
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
