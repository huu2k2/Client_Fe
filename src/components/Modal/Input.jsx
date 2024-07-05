import React from "react";

const Input = ({ label, name, value, onChange, type = "text", defaultValue, width }) => {
  console.log("🚀 ~ Input ~ value:", value)
  return (
    <>
      <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
      <div className="w-[755px] h-[38px] gap-6 flex items-center self-stretch justify-start">
        <span className="text-gray-700 w-[411px] text-sm font-medium  leading-5">
          {label}
        </span>
        <input
          className={`px-4 py-2 border rounded-md ${width}`}
          type={type}
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};


export default Input;
