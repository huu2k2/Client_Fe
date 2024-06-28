import React from "react";

const AdditionalCharges = () => {
  return (
    <>
      <div className="self-stretch h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>
      <div className="self-stretch h-[437px] flex-col justify-start items-start gap-10 flex">
        <div className="self-stretch h-[437px] flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch h-[437px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch h-6 flex-col justify-start items-start flex">
              <div className="self-stretch text-rose-800 text-lg font-medium font-['Inter'] leading-normal">
                Các khoản phụ thu
              </div>
            </div>
            <div className="self-stretch h-[389px] flex-col justify-start items-start gap-4 flex">
              <div className="pr-[525px] justify-start items-center gap-8 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium font-['Inter'] leading-tight">
                  Phí điện
                </div>
                <div className="h-[38px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
                  <div className="w-56 h-[38px] pl-[13px] pr-3 py-[9px] justify-start items-center gap-2 flex">
                    <div className="text-sm font-normal font-['Inter'] leading-tight">
                      3,500
                    </div>
                  </div>
                  <div className="w-[88px] pl-[15px] pr-[17px] py-[9px] bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 justify-center items-center gap-2 flex">
                    <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                      kwh
                    </div>
                    <div className="w-5 h-5 relative" />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-8 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium font-['Inter'] leading-tight">
                  Phí nước
                </div>
                <div className="h-[38px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
                  <div className="w-56 h-[38px] pl-[13px] pr-3 py-[9px] justify-start items-center gap-2 flex">
                    <div className="text-sm font-normal font-['Inter'] leading-tight">
                      100,000
                    </div>
                  </div>
                  <div className=" w-[88px] pl-[15px] pr-[17px] py-[9px] bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 justify-center items-center gap-2 flex">
                    <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                      m3
                    </div>
                    <div className="w-5 h-5 relative" />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-8 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium font-['Inter'] leading-tight">
                  Phí giữ xe
                </div>
                <div className="h-[38px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
                  <div className="w-56 h-[38px] pl-[13px] pr-3 py-[9px] justify-start items-center gap-2 flex">
                    <div className="text-gray-900 text-sm font-normal font-['Inter'] leading-tight">
                      0
                    </div>
                  </div>
                  <div className="w-[88px] pl-[15px] pr-[17px] py-[9px] bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 justify-center items-center gap-2 flex">
                    <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                      Xe
                    </div>
                    <div className="w-5 h-5 relative" />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="pr-[525px] justify-start items-center gap-8 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium font-['Inter'] leading-tight">
                  Phí quản lý
                </div>
                <div className="h-[38px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
                  <div className="w-56 h-[38px] pl-[13px] pr-3 py-[9px] justify-start items-center gap-2 flex">
                    <div className="text-gray-900 text-sm font-normal font-['Inter'] leading-tight">
                      0
                    </div>
                  </div>
                  <div className="w-[88px] pl-[15px] pr-[17px] py-[9px] bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 justify-center items-center gap-2 flex">
                    <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                      Phòng
                    </div>
                    <div className="w-5 h-5 relative" />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-200" />
              <div className="w-full flex  gap-8">
                <div className="w-[411px] text-gray-700 text-sm font-medium font-['Inter'] leading-tight  ">
                  Ghi chú
                </div>
                <div className="h-[105px] w-[320px] bg-white rounded-md shadow border border-gray-300 flex items-start px-3 py-2">
                  <textarea
                    className="text-sm font-normal font-['Inter'] leading-tight outline-none w-full h-full"
                    placeholder="Ghi chú"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalCharges;
