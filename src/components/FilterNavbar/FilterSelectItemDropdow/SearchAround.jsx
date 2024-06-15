import React from 'react'

const SearchAround = () => {
  return (
    <div
        className={`absolute z-10 top-12 left-0 w-[360px] h-fit p-4 flex flex-col justify-start gap-6 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${
          isOpen ? "animate__fadeInDown" : "animate__fadeOutUp hidden"
        }`}
      >
        {/* search  */}
        <div className="h-[78px] w-full gap-4 flex flex-col items-start self-stretch">
          <div className="w-full h-6 gap-2 flex items-center ">
            <AiOutlineEnvironment className="w-5 h-5 text-[#888888]" />
            <span className="text-Black text-base font-medium leading-6">
              Tìm kiếm quanh bạn
            </span>
          </div>
          {/* input search */}
          <div className="w-full h-[38px] flex px-[13px] py-[9px] justify-between items-center self-stretch rounded-md border border-gray-300 bg-white shadow-sm text-gray-500 font-normal leading-5">
            <input
              type="text"
              placeholder="Nhập vị trí và khoảng cách tìm kiếm"
              className="w-[236px] outline-none text-sm"
            />
            <AiFillCaretRight  />
          </div>
        </div>

        
 
      </div>
  )
}

export default SearchAround