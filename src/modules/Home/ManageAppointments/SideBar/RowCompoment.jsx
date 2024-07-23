import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useGetListRoomCodeNotDepositQuery } from "@apis/slice/rooms";
import {
  usePostChangeRoomMutation,
  useGetListOfAppointmentsQuery,
} from "@apis/slice/Agencies";

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
  getRentalMonth,
}) => {
  const isDisabled = [
    "roomId",
    "commissionPolicyId",
    "datcoc",
    "houseAddress",
    "rentalPrice",
    "chuongTrinhUuDai",
    "tips",
    "rentalTerm",
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
  const rentalTermMonth = ["rentalTerm"].includes(name);
  const NameValue = ["fullName", "issuedBy", "permanentAddress"].includes(name);

  const [value, setValues] = useState("");
  const [options, setOptions] = useState([]);
  const [valueOptions, setValuesOptions] = useState(null);

  const { data } = useGetListRoomCodeNotDepositQuery(getInfo.houseId);

  useEffect(() => {
    if (!isSidebarOpen) {
      setValues("");
      setOptions([]);
      setValuesOptions(null);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (plaValue) {
      setValue(name, getInfo[name] && getInfo[name]?.toLocaleString("vi-VN"));
      setValues(getInfo[name] && getInfo[name]?.toLocaleString("vi-VN"));
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

    setValue("chuongTrinhUuDai", "");
  }, [
    name,
    getInfo,
    showAutoPrice,
    getNamecommissionPolicyId,
    value,
    rentalTermMonth,
  ]);
  useEffect(() => {
    if (data && data?.response) {
      const Data = data?.response?.map((i) => ({
        value: i.roomId,
        label: "P." + i.roomCode,
      }));

      setOptions(Data || []);

      // Thiết lập giá trị mặc định cho react-select nếu có sẵn thông tin từ getInfo
      if (name === "roomId" && !valueOptions) {
        // setValuesOptions();
        setValue("roomId", getInfo.id); // Cập nhật giá trị của react-hook-form
      }
    }
  }, [data, getInfo]);
  useEffect(() => {
    if (rentalTermMonth) {
      setValue("rentalTerm", getRentalMonth);
      setValues(getRentalMonth);
    }
  }, [rentalTermMonth, setValue, getRentalMonth]);

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
  const handleChangeValueOptions = (selectedOption) => {
    console.log("options", selectedOption)
    setValuesOptions(selectedOption);
    setValue("roomId", selectedOption ? selectedOption.value : getInfo.id);
  };

  return (
    <div className="self-stretch justify-start items-center gap-4 inline-flex">
      <div className="w-[180px] text-gray-700 text-sm font-medium leading-tight">
        {title}
      </div>
      <div
        className={`grow shrink basis-0 h-[38px] py-[9px] ${isDisabled ? "bg-gray-50" : "bg-white"
          } rounded-md shadow border border-gray-300 ${unit
            ? "justify-start items-center gap-2 flex"
            : "justify-between items-center flex"
          }`}
      >
        {name !== "roomId" ? (
          <>
            <input
              {...(name === "datcoc" || name === "tip" ? {} : register(name))}
              type={type}
              className="w-full outline-none text-sm font-normal leading-tight px-[13px]"
              placeholder={placeholder}
              disabled={isDisabled}
              value={
                name === "tips"
                  ? (
                    Number(getNamecommissionPolicyId) *
                    (getInfo?.rentalPrice || 0)
                  ).toLocaleString("vi-VN")
                  : value
              }
              onChange={handleChangeValue}
            />
            {unit && (
              <div className="text-gray-500 text-sm font-normal leading-tight pr-[13px]">
                {unit}
              </div>
            )}
          </>
        ) : (
          <Select
            className="w-full outline-none text-sm font-normal leading-tight"
            value={valueOptions}
            defaultValue={valueOptions}
            onChange={handleChangeValueOptions}
            options={options}
            placeholder={"P." + getInfo.roomId}
          />
        )}
      </div>
    </div>
  );
};

export default RowComponent;
