import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const RowComponent = ({
  title,
  type,
  placeholder,
  unit,
  register,
  name,
  getInfo,
  setValue
}) => {
  const isDisabled = [
    "roomId",
    "tip",
    "datcoc",
    "houseAddress",
    "rentalPrice",
  ].includes(name);

  const dynamicPlaceholder = () => {
    switch (name) {
      case "roomId":
        return `${getInfo.roomId}`;
      case "houseAddress":
        return getInfo.houseAddress;
      case "rentalPrice":
        return getInfo.rentalPrice.toLocaleString("vi-VN");
      case "datcoc":
        return 1;
      default:
        return placeholder;
    }
  };

  const priceValue = [
    "rentalPrice",
    "depositAmount",
    "additionalDepositAmount",
  ].includes(name);

  const plaValue = ["roomId", "houseAddress", "datcoc","rentalPrice"].includes(name);

  const [value, setValues] = useState("");

  useEffect(() => {
    if (priceValue && getInfo[name] !== undefined) {
      setValues(getInfo[name].toLocaleString("vi-VN"));
    }  
  }, [getInfo, name ]);
useEffect(()=>{
  if (plaValue) {
    setValues(dynamicPlaceholder());
    setValue(name,getInfo[name])
  }
},[name, plaValue, dynamicPlaceholder, getInfo, setValue])
  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    setValues(e.target.value);
    if (priceValue) {
      const numericValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setValues(Number(numericValue).toLocaleString("vi-VN"));
    } else {
      setValues(e.target.value);
    }
  };
 
  return (
    <div className="self-stretch justify-start items-center gap-4 inline-flex">
      <div className="w-[180px] text-gray-700 text-sm font-medium leading-tight font-['Inter']">
        {title}
      </div>
      <div
        className={`grow shrink basis-0 h-[38px] px-[13px] py-[9px] ${
          isDisabled ? "bg-gray-50" : "bg-white"
        } rounded-md shadow border border-gray-300 ${
          unit
            ? "justify-start items-center gap-2 flex"
            : "justify-between items-center flex"
        }`}
      >
        <input
          {... (name === 'datcoc' || name ==='tip' ?{}:register(name))}
          type={type}
          className={`w-full outline-none text-sm font-normal leading-tight  `}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={handleChangeValue}
        />
        {unit && (
          <div className="text-gray-500 text-sm font-normal leading-tight font-['Inter']">
            {unit}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default RowComponent;
