import React from "react";

const Input = ({label ,type = 'text'}) => {
  return (
    <>
      <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
      <div className="w-[755px] h-[38px] gap-6 flex items-center self-stretch justify-start">
        <span className="text-gray-700 w-[411px] text-sm font-medium  leading-5">
         {label}
        </span>
        <input
          type={type}
          className="w-[320px] h-full  px-[13px] py-[9px] rounded-lg border border-gray-300 bg-white shadow-sm "
        />
      </div>
    </>
  );
};

export default Input;
