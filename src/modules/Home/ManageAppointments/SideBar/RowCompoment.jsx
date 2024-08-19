import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useGetListRoomCodeNotDepositQuery } from "@apis/slice/rooms";
import {
  useDayMonthofSelect,
  useDepositAmount,
  useRetalPrice,
  useSetInfo,
  useSetIsSidebarOpen,
  useSetTotalReduce,
} from "../../../../customHooks";

const RowComponent = ({
  title = null,
  type = null,
  placeholder = null,
  unit = null,
  register = null,
  name = null,
  setValue = null,
  InfoCCCD = null,
  getValues = null,
  title1 = "",
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useSetIsSidebarOpen();
  const [getInfo, setInfo] = useSetInfo();
  const [
    getNamecommissionPolicyId,
    setNamecommissionPolicyId,
    getRentalMonth,
    setRentalMonth,
  ] = useDayMonthofSelect();
  const isDisabled = [
    "fullName",
    "birthOfDay",
    "identification",
    "dateRange",
    "issuedBy",
    "permanentAddress",
    "roomId",
    "commissionPolicyId",
    "datcoc",
    "houseAddress",
    "additionalDepositAmount",
    "chuongTrinhUuDai",
    "totalDepositAmount",
    "rentalTerm",
    "totalRentalPrice",
    "totalReduce",
  ].includes(name);

  const getDataFromCMND = [
    "fullName",
    "birthOfDay",
    "identification",
    "dateRange",
    "issuedBy",
    "permanentAddress",
  ].includes(name);

  const rentalTermMonth = ["rentalTerm"].includes(name);
  const [totalReduce, setTotalReduce] = useSetTotalReduce();
  const [value, setValues] = useState("");
  const [options, setOptions] = useState([]);
  const [valueOptions, setValuesOptions] = useState(null);
  const { data } = useGetListRoomCodeNotDepositQuery(getInfo.houseId);
  // check is open sidebar
  useEffect(() => {
    if (!isSidebarOpen) {
      setValues("");
      setOptions([]);
      setValuesOptions(null);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (getDataFromCMND && InfoCCCD[name]) {
      setValue(name, InfoCCCD[name]);
      setValues(InfoCCCD[name]);
    }
  }, [getDataFromCMND, InfoCCCD, name, setValue]);

  useEffect(() => {
    if (data && data.response) {
      const Data = data.response.map((i) => ({
        value: i.roomId,
        label: "P." + i.roomCode,
      }));

      setOptions(Data || []);

      if (name === "roomId" && !valueOptions) {
        setValue("roomId", getInfo.id);
      }
    }
  }, [data, getInfo, name, setValue, valueOptions]);

  useEffect(() => {
    if (rentalTermMonth) {
      setValue("rentalTerm", getRentalMonth);
      setValues(getRentalMonth);
    }
  }, [rentalTermMonth, getRentalMonth, setValue]);

  const handleChangeValueOptions = (selectedOption) => {
    setValuesOptions(selectedOption);
    setValue("roomId", selectedOption ? selectedOption.value : getInfo.id);
  };
  // all the orther input
  // setup some input have value don't change
  const valueDonChange = ["phoneNumber", "houseAddress"].includes(name);
  const valueConfig = [
    "rentalPrice",
    "totalReduce",
    "totalDepositAmount",
    "depositAmount",
    "additionalDepositAmount",
  ].includes(name);
  const [RetalPrice, setRetalPrice] = useRetalPrice();
  const [DepositAmount,setDepositAmount] = useDepositAmount()
  useEffect(() => {
    if (valueDonChange) {
      setValues(getValues(name));
    }
    if (name === "rentalPrice") {
      setValues(getInfo.rentalPrice?.toLocaleString("vi-VN"));
      setRetalPrice(getInfo.rentalPrice)
    }
    if (name === "totalReduce") {
      setValues(getInfo.totalReduce?.toLocaleString("vi-VN"));
    }
  }, [name, isSidebarOpen, totalReduce]);
  useEffect(() => {
    if (name === "totalReduce") {
      setValues(getInfo.totalReduce?.toLocaleString("vi-VN"));
      setValue(name,getInfo.totalReduce)
    }
  }, [RetalPrice]);
  useEffect(() => {
    if (name === "totalDepositAmount" && getNamecommissionPolicyId) {
      const value = getInfo.totalReduce * getNamecommissionPolicyId
      setValues(value?.toLocaleString("vi-VN"));
      setValue(name,value)
    }
  }, [RetalPrice, totalReduce,getNamecommissionPolicyId]);

  useEffect(()=>{
    if (name === "additionalDepositAmount" ) {
      const value = getInfo.totalReduce * getNamecommissionPolicyId - DepositAmount
      console.log(value)
      setValues(value?.toLocaleString("vi-VN"));
      setValue(name,value)
    }
  },[DepositAmount,totalReduce])
  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    if (name === "rentalPrice") {
      // Extract only numeric characters
      const numericValue = inputValue.replace(/[^0-9]/g, "");

      // Convert to a number and format as a Vietnamese locale string
      const formattedValue = Number(numericValue).toLocaleString("vi-VN");
      // Update the state with the formatted value
      setValues(formattedValue);
      // Update the form value with the raw numeric value
      setValue(name, Number(numericValue));
      getInfo.rentalPrice = Number(numericValue);
      getInfo.totalReduce = Number(numericValue) + totalReduce;
      setRetalPrice(Number(numericValue));
    }
    else if(name === "depositAmount"){
      const numericValue = inputValue.replace(/[^0-9]/g, "");

      // Convert to a number and format as a Vietnamese locale string
      const formattedValue = Number(numericValue).toLocaleString("vi-VN");
      // Update the state with the formatted value
      setValues(formattedValue);
      // Update the form value with the raw numeric value
      setValue(name, Number(numericValue));
      setDepositAmount(Number(numericValue))
    }
    else {
      // If valueConfig is not set, update state with raw input value
      setValues(inputValue);
    }
  };

  return (
    <div className="w-[501px] self-stretch justify-between items-start gap-4 inline-flex">
      <div className="w-fit max-w-[160px] text-gray-700   ">
        <p className="text-sm font-medium leading-tight">{title}</p>
        <p className="text-sm font-sans text-gray-900 italic ">{title1}</p>
      </div>
      <div
        className={`h-[38px] py-[9px] w-[318px] ${
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
              {...register(name)}
              type={type}
              className="w-full outline-none text-sm font-normal leading-tight px-[13px]"
              placeholder={placeholder}
              disabled={isDisabled}
              value={value}
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
