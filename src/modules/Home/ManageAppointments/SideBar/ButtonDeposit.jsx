import React from "react";

const ButtonDeposit = ({setIsSidebarOpen,isCheckSuccess}) => {
  
  const handeClick = ()=>{
    if(isCheckSuccess){
      setIsSidebarOpen(false)
    }
  }
  return (
    <div className="w-full h-[78px] pl-2  py-5 justify-end items-center gap-4 inline-flex">
      <div className="h-[38px] px-[17px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-center items-center flex">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay text-gray-700 text-sm font-medium  leading-tight"
        >
          Hủy
        </label>
      </div>
      <div className=" px-[17px] py-[9px] bg-rose-600 rounded-md shadow justify-center items-center flex">
        <button
          className="text-white text-sm font-medium  leading-tight"
          type="submit"
          onClick={handeClick}
        >
          Lên hợp đồng
        </button>
      </div>
    </div>
  );
};

export default ButtonDeposit;
