import React from "react";

const ButtonDeposit = ({ getInfo,isSubmit }) => {

  return (
    <div className="w-[501px] h-[78px] pl-4 py-5 justify-end items-center gap-4 inline-flex">
      <div className="h-[38px] px-[17px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-center items-center flex">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay text-gray-700 text-sm font-medium  leading-tight"
        >
          Hủy
        </label>
      </div>
      {getInfo.status !== "3" && (
        <div className=" px-[17px] py-[9px] bg-rose-600 rounded-md shadow justify-center items-center flex">
          <button
            className="text-white text-sm font-medium  leading-tight flex justify-center items-center gap-2"
            type="submit"
          
          >
           {isSubmit && <span className="loading loading-spinner text-neutral"></span>} 
            Cập nhập
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonDeposit;
