import React from 'react'

const InputExpense = ({title,price,dvt}) => {
  return (
    <div className="pr-[525px] justify-start items-center gap-8 inline-flex">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  {title}
                </div>
                <div className="h-[38px] bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
                  <input
                    type="text"
                    defaultValue={new Intl.NumberFormat("vi-VN").format(price)}
                    className="w-56 h-[38px] pl-[13px] pr-3 py-[9px] justify-start items-center gap-2 text-sm font-normal leading-tight"
                  />
                  <div className="w-[88px] pl-[15px] pr-[17px] py-[9px] bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 justify-center items-center gap-2 flex">
                    <div className="text-gray-500 text-sm font-normal leading-tight">
                      {dvt}
                    </div>
                    <div className="w-5 h-5 relative" />
                  </div>
                </div>
              </div>
  )
}

export default InputExpense