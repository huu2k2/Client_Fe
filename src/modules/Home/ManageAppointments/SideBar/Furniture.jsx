import React from 'react'

const Furniture = () => {
  return (
    <div className="w-[556px] h-fit px-6 py-5 flex-col justify-start items-start gap-5 inline-flex">
    <div className="text-rose-800 text-lg font-medium font-['Inter'] leading-7">Nội thất bàn giao</div>
    {/* item */}
    <div className="w-[508px] h-[202px] relative">
      <div className="left-0 top-[9px] absolute justify-start items-center gap-2 inline-flex">
 
        <input type="checkbox" className='w-4 h-4 relative rounded border border-gray-300  custom-checkbox'/>
        <div className="text-gray-700 text-sm font-medium font-['Inter'] leading-tight">Máy lạnh</div>
      </div>
      <div className="h-[205px] left-[196px] top-0 absolute flex-col justify-center items-start gap-3 inline-flex">
        <div className="self-stretch px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
          <input
          type='text'
          className="w-full outline-none text-sm font-normal leading-tight"
          
        />
          </div>
          <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">đ</div>
        </div>
        <div className="self-stretch px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex">
          <div className="h-5 justify-start items-center gap-2 flex">
            <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">Tình trạng:</div>
            <div className="text-gray-900 text-sm font-normal font-['Inter'] leading-tight">Mới</div>
          </div>
          <div className="w-5 h-5 relative" />
        </div>
        <div className="w-[312px] h-[105px] overflow-hidden  bg-white rounded-md shadow border border-gray-300 justify-end items-center inline-flex">
        <textarea
          className="w-full h-full px-[13px] py-[9px] outline-none text-sm font-normal leading-tight"
          placeholder=""
        />
        </div>
      </div>
    </div>
    {/*  */}
    <div className="justify-center items-center inline-flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
      <input type="checkbox" className='w-4 h-4 relative rounded border border-gray-300  custom-checkbox'/>
        <div className="text-gray-700 text-sm font-medium font-['Inter'] leading-tight">Tủ quần áo</div>
      </div>
    </div>
     
  </div>
  )
}

export default Furniture