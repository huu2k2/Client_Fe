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
  setValue,
  isSidebarOpen,
  getNamecommissionPolicyId,
  getValues,
}) => {
  const isDisabled = [
    "commissionPolicyId",
    "datcoc",
    "houseAddress",
    "rentalTerm",
    "chuongTrinhUuDai",
    "totalDepositAmount",
    "roomCode"
  ].includes(name);

  const priceValue = ["depositAmount", "additionalDepositAmount","rentalPrice"].includes(
    name
  );

  const [value, setValues] = useState(getValues(name));

  const NameValue = ["fullName", "issuedBy", "permanentAddress","additionalDepositAmount"].includes(name);
useEffect(()=>{

},[])
 
  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    if (priceValue) {
      const numericValue = inputValue?.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setValues(Number(numericValue)?.toLocaleString("vi-VN"));
      setValue(inputValue)
    } else if (NameValue) {
      const strValue = inputValue.split(" ");
      let capitalizedStr = strValue
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setValues(capitalizedStr);
      setValue(capitalizedStr)
    } else {
      setValues(inputValue);
      setValue(inputValue)
    }
  };

  return (
    <div className="w-[501px] self-stretch justify-between items-center gap-4 inline-flex">
      <div className="w-fit text-gray-700 text-sm font-medium leading-tight">
        {title}
      </div>
      <div
        className={`w-[318px] h-[38px] px-[13px] py-[9px] ${
          isDisabled ? "bg-gray-50" : "bg-white"
        } rounded-md shadow border border-gray-300 ${
          unit
            ? "justify-start items-center gap-2 flex"
            : "justify-between items-center flex"
        }`}
      >
        <input
          {...(name === "datcoc" || name === "tip" ? {} : register(name))}
          type={type}
          className="w-full outline-none text-sm font-normal leading-tight"
          placeholder={placeholder}
          disabled={getInfo.status==="3"?true:isDisabled}
          value={
            name === "totalDepositAmount"
              ? (
                  Number(getNamecommissionPolicyId) * getInfo.rentalPrice
                ).toLocaleString("vi-VN")
              : value
          }
          onChange={handleChangeValue}
        />
        {unit && (
          <div className="text-gray-500 text-sm font-normal leading-tight">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
};

export default RowComponent;
