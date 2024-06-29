import React from 'react'

const BasicInterior = () => {
  return (
   
    <div className="self-stretch h-[430px] bg-white rounded-lg shadow flex-col justify-start items-start flex">
    <div className="self-stretch h-16 px-6 py-5 bg-neutral-100 flex-col justify-start items-start gap-1 flex">
      <div className="self-stretch text-rose-800 text-lg font-medium leading-normal">
        Nội thất cơ bản
      </div>
    </div>
    <div className="self-stretch h-px bg-gray-200" />
    <div className="self-stretch h-[365px] flex-col justify-center items-center flex">
      <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
        <div className="w-5 h-5 relative" />
        <div className="grow shrink basis-0 text-gray-500 text-sm font-medium leading-tight">
          Máy lạnh
        </div>
        <div className="w-[843px] text-gray-900 text-sm font-normal leading-tight">
          -
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
        <div className="w-5 h-5 relative" />
        <div className="grow shrink basis-0 text-gray-500 text-sm font-medium leading-tight">
          Tủ lạnh
        </div>
        <div className="w-[843px] text-gray-900 text-sm font-normal leading-tight">
          300,000 đ/tháng
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
        <div className="w-5 h-5 relative" />
        <div className="grow shrink basis-0 text-gray-500 text-sm font-medium leading-tight">
          Máy giặt
        </div>
        <div className="w-[843px] text-gray-900 text-sm font-normal leading-tight">
          300,000 đ/tháng
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
        <div className="w-5 h-5 relative" />
        <div className="grow shrink basis-0 text-gray-500 text-sm font-medium leading-tight">
          Tủ quần áo
        </div>
        <div className="w-[843px] text-gray-900 text-sm font-normal leading-tight">
          Trang bị sẵn
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
        <div className="w-5 h-5 relative" />
        <div className="grow shrink basis-0 text-gray-500 text-sm font-medium leading-tight">
          Kệ bếp
        </div>
        <div className="w-[843px] text-gray-900 text-sm font-normal leading-tight">
          Trang bị sẵn
        </div>
      </div>
      <div className="self-stretch h-px bg-gray-200" />
      <div className="self-stretch px-6 py-5 justify-start items-center gap-2 inline-flex">
        <div className="w-5 h-5 relative" />
        <div className="grow shrink basis-0 text-gray-500 text-sm font-medium leading-tight">
          Máy nóng lạnh
        </div>
        <div className="w-[843px] text-gray-900 text-sm font-normal leading-tight">
          Trang bị sẵn
        </div>
      </div>
    </div>
  </div>
  )
}

export default BasicInterior