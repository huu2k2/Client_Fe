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
  getData,
  isSidebarOpen
}) => {
  const isDisabled = [
    "commissionPolicyId",
    "datcoc",
    "houseAddress",
    "rentalTerm",
    "chuongTrinhUuDai",
    "totalDepositAmount",
    "roomCode",
    "additionalDepositAmount",
  ].includes(name);

  const priceValue = ["additionalDepositAmount", "totalDepositAmount"].includes(
    name
  );

  const [value, setValues] = useState(getData[name]);
  useEffect(() => {
    const initialValue = getData[name];
    if (priceValue && initialValue) {
      setValues(Number(initialValue).toLocaleString("vi-VN"));
      setValue(name, getData[name]);
    } else {
      setValues(initialValue);
      setValue(name, getData[name]);
    }
  }, [getData, name,isSidebarOpen]);

  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    if (name === "rentalPrice") {
      setValue("rentalPrice", numericValue);
      setValues(Number(numericValue).toLocaleString("vi-VN"));

      const totalDepositAmount =
        numericValue * Number(getData["commissionPolicyMonth"]);

      setValue(
        "totalDepositAmount",
        totalDepositAmount.toLocaleString("vi-VN")
      );
      setValue(
        "additionalDepositAmount",
        (
          totalDepositAmount -
          Number(getData["depositAmount"].replace(/[^0-9]/g, ""))
        ).toLocaleString("vi-VN")
      );
    } else if (name === "depositAmount") {
      setValue(name, numericValue);
      setValues(Number(numericValue).toLocaleString("vi-VN"));
      const additionalDepositAmount =
        getData["totalDepositAmount"].replace(/[^0-9]/g, "") - numericValue;
      setValue(
        "additionalDepositAmount",
        additionalDepositAmount.toLocaleString("vi-VN")
      );
    } else if (priceValue) {
      setValues(Number(numericValue).toLocaleString("vi-VN"));
      setValue(name, numericValue);
    } else {
      setValues(inputValue);
      setValue(name, inputValue);
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
          {...register(name)}
          type={type}
          className="w-full outline-none text-sm font-normal leading-tight"
          placeholder={placeholder}
          disabled={getInfo.status === "3" ? true : isDisabled}
          value={value}
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
