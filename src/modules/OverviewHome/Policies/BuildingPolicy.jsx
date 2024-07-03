import React from "react";

const BuildingPolicy = ({data}) => {
  return (
    <div className="self-stretch h-[507px] bg-white rounded-lg shadow flex-col justify-start items-start flex">
      <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-rose-800 text-lg font-medium leading-normal">
          Chính sách toà nhà
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch flex-col justify-center items-center flex">
        <div className="self-stretch bg-white border justify-start items-start flex flex-col">
          <div className="self-stretch flex flex-row">
            <div className="w-1/3 bg-gray-50 px-6 py-3 justify-start items-center flex">
              <div className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                Thời hạn hợp đồng
              </div>
            </div>
            <div className="w-1/3 bg-gray-50 px-6 py-3 justify-start items-center flex">
              <div className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                Đặt cọc
              </div>
            </div>
            <div className="w-1/3 bg-gray-50 px-6 py-3 justify-start items-center flex">
              <div className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                Hoa hồng
              </div>
            </div>
          </div>
          
          <div className="self-stretch h-px bg-gray-200" />
          <div className="self-stretch flex flex-row">
            <div className="w-1/3 px-6 py-4 justify-start items-center flex">
              <div className="text-gray-500 text-sm font-normal leading-tight">
                6 tháng
              </div>
            </div>
            <div className="w-1/3 px-6 py-4 justify-start items-center flex">
              <div className="text-gray-500 text-sm font-normal leading-tight">
                1 tháng
              </div>
            </div>
            <div className="w-1/3 px-6 py-4 justify-start items-center flex">
              <div className="text-gray-500 text-sm font-normal leading-tight">
                30%
              </div>
            </div>
          </div>
          
           
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-full h-5 flex justify-between items-center gap-4">
            <div className="w-1/3 text-gray-500 text-sm font-medium leading-tight">
              Số lượng người ở
            </div>
            <div className="w-2/3 text-gray-900 text-sm font-normal leading-tight">
              Không giới hạn
            </div>
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-full h-5 flex justify-between items-center gap-4">
            <div className="w-1/3 text-gray-500 text-sm font-medium leading-tight">
              Số lượng xe
            </div>
            <div className="w-2/3 text-gray-900 text-sm font-normal leading-tight">
              3
            </div>
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-full h-5 flex justify-between items-center gap-4">
            <div className="w-1/3 text-gray-500 text-sm font-medium leading-tight">
              Ghi chú
            </div>
            <div className="w-2/3 text-gray-900 text-sm font-normal leading-tight">
              -
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingPolicy;
