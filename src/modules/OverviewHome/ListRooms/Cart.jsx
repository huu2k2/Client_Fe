import React from 'react'

const Cart = () => {
  return (
    <div className="flex-col justify-start items-start inline-flex">
    <div className="w-[200px] px-5 py-2 bg-emerald-800 rounded-tl-lg rounded-tr-lg shadow justify-center items-center gap-2 inline-flex">
      <div className="text-center text-white text-lg font-medium font-['Inter'] leading-normal">
        A.001
      </div>
    </div>
    <img
      className="w-[200px] h-24 relative"
      src="https://via.placeholder.com/200x96"
    />
    <div className="h-9 w-full py-2 bg-gray-50 shadow   justify-center items-center gap-1 flex">
      <div className="text-emerald-800 text-sm font-normal font-['Inter'] leading-tight">
        Đang trống
      </div>
    </div>
    <div className="h-9  w-full  py-2 bg-white rounded-bl-lg rounded-br-lg shadow  justify-center items-center gap-1 flex">
      <div className="text-gray-800 text-base font-bold font-['Inter'] leading-tight">
        4,500,000 đ
      </div>
    </div>
  </div>
  )
}

export default Cart