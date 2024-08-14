import React from "react";

const capitalizeAfterSpace = (value) => {
  return value.replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

const Input = ({ label, name, value, onChange, type = "text", defaultValue, width }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    const capitalizedValue = capitalizeAfterSpace(value);
    e.target.value = capitalizedValue;
    onChange(e);
  };

  return (
    <>
      <hr className="w-full text-gray-200 h-[1px] self-stretch bg-gray-200" />
      <div className="w-full lg:w-[755px] h-fit lg:h-[38px] gap-6 flex flex-col lg:flex-row items-center self-stretch justify-start">
        <span className="text-gray-700 w-full md:w-[411px] text-sm font-medium leading-5">
          {label}
        </span>
        <input
          className={`px-4 py-2 border rounded-md w-full md:${width}   outline-none `}
          type={type}
          name={name}
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

export default Input;
