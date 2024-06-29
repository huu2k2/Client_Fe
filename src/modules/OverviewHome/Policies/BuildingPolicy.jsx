import React from "react";

const BuildingPolicy = () => {
  return (
    <div className="self-stretch h-[507px] bg-white rounded-lg shadow flex-col justify-start items-start flex">
      <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch text-rose-800 text-lg font-medium font-['Inter'] leading-normal">
          Chính sách toà nhà
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch h-[442px] flex-col justify-center items-center flex">
        <div className="self-stretch bg-white border justify-start items-start inline-flex">
          <div className="grow shrink basis-0 bg-white flex-col justify-start items-start inline-flex">
            <div className="self-stretch px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
              <div className="text-gray-500 text-xs font-medium font-['Inter'] uppercase leading-none tracking-wide">
                Thời hạn hợp đồng
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                6 tháng
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                12 tháng
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                1 tháng
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 bg-white flex-col justify-start items-start inline-flex">
            <div className="self-stretch px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
              <div className="text-gray-500 text-xs font-medium font-['Inter'] uppercase leading-none tracking-wide">
                Đặt cọc
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                1 tháng
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                1 tháng
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                1 tháng
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 bg-white flex-col justify-start items-start inline-flex">
            <div className="self-stretch px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
              <div className="text-gray-500 text-xs font-medium font-['Inter'] uppercase leading-none tracking-wide">
                Hoa hồng
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                30%
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                25%
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch h-[72px] px-6 py-4 justify-start items-center inline-flex">
              <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                10%
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-[1264px] h-5 justify-center items-start gap-4 inline-flex">
            <div className="w-[410px] text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Số lượng người ở
            </div>
            <div className="w-[838px] text-gray-900 text-sm font-normal font-['Inter'] leading-tight">
              Không giới hạn
            </div>
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-[1264px] h-5 justify-center items-start gap-4 inline-flex">
            <div className="w-[410px] text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Số lượng xe
            </div>
            <div className="w-[838px] text-gray-900 text-sm font-normal font-['Inter'] leading-tight">
              3
            </div>
          </div>
        </div>
        <div className="self-stretch h-px bg-gray-200" />
        <div className="self-stretch h-[60px] px-6 py-5 flex-col justify-center items-start flex">
          <div className="w-[1264px] h-5 justify-center items-start gap-4 inline-flex">
            <div className="w-[410px] text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Ghi chú
            </div>
            <div className="w-[838px] text-gray-900 text-sm font-normal font-['Inter'] leading-tight">
              -
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingPolicy;
