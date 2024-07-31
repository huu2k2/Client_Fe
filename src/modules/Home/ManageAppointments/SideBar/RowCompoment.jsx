import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useGetListRoomCodeNotDepositQuery } from "@apis/slice/rooms";

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
  getRentalPrice,
  setRentalPrice,
  InfoCCCD,
}) => {
  const isDisabled = [
    "roomId",
    "commissionPolicyId",
    "datcoc",
    "houseAddress",
    "additionalDepositAmount",
    "chuongTrinhUuDai",
    "tips",
    "rentalTerm",
  ].includes(name);
  const getDataFromCMND = [
    "fullName",
    "birthOfDay",
    "identification",
    "dateRange",
    "issuedBy",
    "permanentAddress",
  ].includes(name);
  const priceValue = ["depositAmount", "additionalDepositAmount"].includes(
    name
  );
  const plaValue = [
    "roomId",
    "houseAddress",
    "datcoc",
    // "fullName",
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
    if (getDataFromCMND) {
      setValue(name, InfoCCCD[name]);
      setValues(InfoCCCD[name]);
    }
  }, [getDataFromCMND, InfoCCCD]);
  useEffect(() => {
    if (!isSidebarOpen) {
      setValues("");
      setOptions([]);
      setValuesOptions(null);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (plaValue) {
      setValues(
        value?.toLocaleString("vi-VN") ||
          (getInfo[name] && getInfo[name]?.toLocaleString("vi-VN"))
      );
      setValue(
        name,
        value?.toLocaleString("vi-VN") ||
          (getInfo[name] && getInfo[name]?.toLocaleString("vi-VN"))
      );
    }
    else if (name === "rentalPrice" && value === "") {
      setRentalPrice( Number(value).toLocaleString("vi-VN") ||
      (getRentalPrice && getRentalPrice?.toLocaleString("vi-VN")))
      setValues(
        Number(value).toLocaleString("vi-VN") ||
          (getRentalPrice && getRentalPrice?.toLocaleString("vi-VN"))
      );
      setValue(
        name,
        Number(value).toLocaleString("vi-VN") ||
          (getRentalPrice && getRentalPrice?.toLocaleString("vi-VN"))
      );
    }
  }, [getInfo]);

  useEffect(() => {
    if (showAutoPrice ) {
  
      setValue(
        "additionalDepositAmount",
        (
          (getNamecommissionPolicyId||1) * (Number(getRentalPrice))-
          Number(value.replace(/[^0-9]/g, ""))
        ).toLocaleString("vi-VN")
      );
    }
    if (name === "tips") {
      setValue(
        "tips",
        (
          (getNamecommissionPolicyId||1) *(getRentalPrice)
        ).toLocaleString("vi-VN")
      );
      setValues(
          ((getNamecommissionPolicyId) *(getRentalPrice)
        ).toLocaleString("vi-VN"));
    }

    setValue("chuongTrinhUuDai", "");
  }, [getNamecommissionPolicyId, getRentalPrice,setValue, showAutoPrice, value]);

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
      if (name === "rentalPrice" && getInfo["rentalPrice"]) {
        setValues(getInfo["rentalPrice"].toLocaleString("vi-VN"));
      }
    }
  }, [data, getInfo]);

  useEffect(() => {
    if (rentalTermMonth) {
      setValue("rentalTerm", getRentalMonth);
      setValues(getRentalMonth);
    }
  }, [rentalTermMonth, getRentalMonth]);

  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    setValues(inputValue);

    if (priceValue) {
      const numericValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setValues(Number(numericValue).toLocaleString("vi-VN"));
    } else if (name === "rentalPrice") {
      const numericValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setValues(Number(numericValue).toLocaleString("vi-VN"));
      setRentalPrice(Number(numericValue).toLocaleString("vi-VN"));
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
    setValuesOptions(selectedOption);
    setValue("roomId", selectedOption ? selectedOption.value : getInfo.id);
  };

  return (
    <div className="w-[501px] self-stretch justify-between items-start gap-4 inline-flex">
      <div className="w-fit text-gray-700 text-sm font-medium leading-tight">
        {title}
      </div>
      <div
        className={` h-[38px] py-[9px] w-[318px] ${
          isDisabled ? "bg-gray-50" : "bg-white"
        } rounded-md shadow border border-gray-300 ${
          unit
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
