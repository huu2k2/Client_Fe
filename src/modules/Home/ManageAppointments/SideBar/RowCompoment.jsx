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
}) => {
  const isDisabled = [
    "roomId",
    "commissionPolicyId",
    "datcoc",
    "houseAddress",
    "rentalPrice",
    "chuongTrinhUuDai",
    "tips",
  ].includes(name);

  const priceValue = ["depositAmount", "additionalDepositAmount"].includes(
    name
  );

  const plaValue = [
    "roomId",
    "houseAddress",
    "datcoc",
    "rentalPrice",
    "fullName",
    "phoneNumber",
  ].includes(name);

  const showAutoPrice = ["depositAmount"].includes(name);

  const [value, setValues] = useState("");
 
  useEffect(() => {
    setValues("");
  }, [isSidebarOpen]);

 console.log(name,getInfo)
  useEffect(() => {
    if (plaValue) {
     
      setValue(name, getInfo[name]?.toLocaleString("vi-VN") || "");
      setValues(getInfo[name]?.toLocaleString("vi-VN") || "");
    }

    if (showAutoPrice) {
      setValue(
        "additionalDepositAmount",
        (
          Number(getNamecommissionPolicyId) * (getInfo?.rentalPrice || 0) -
          Number(value.replace(/[^0-9]/g, ""))
        ).toLocaleString("vi-VN")
      );
    }
  }, [
    name,
    plaValue,
    setValue,
    getInfo,
    showAutoPrice,
    getNamecommissionPolicyId,
    value,
    priceValue,
  ]);

  const NameValue = ["fullName", "issuedBy", "permanentAddress"].includes(name);

  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    setValues(e.target.value);
    if (priceValue) {
      const numericValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setValues(Number(numericValue).toLocaleString("vi-VN"));
    } else if (NameValue) {
      const strValue = inputValue.split(" ");
      let capitalizedStr = strValue
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setValues(capitalizedStr);
    } else {
      setValues(e.target.value);
    }
  };

  return (
    <div className="self-stretch justify-start items-center gap-4 inline-flex">
      <div className="w-[180px] text-gray-700 text-sm font-medium leading-tight">
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
          {...(name === "datcoc" || name === "tip" ? {} : register(name))}
          type={type}
          className="w-full outline-none text-sm font-normal leading-tight"
          placeholder={placeholder}
          disabled={isDisabled}
          value={
            name === "tips"
              ? (
                  Number(getNamecommissionPolicyId) * (getInfo?.rentalPrice || 0)
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
