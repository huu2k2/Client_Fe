import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useGetListRoomCodeNotDepositQuery } from "@apis/slice/rooms";
import { useDayMonthofSelect, useRetalPrice, useSetTotalReduce } from "../../../../customHooks";
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
  isSidebarOpen,
  title1 = "",
  getValues
}) => {
  const isDisabled = [
    "fullName",
    "phoneNumber",
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
    "depositDate",
    "depositAmount",
    "rentalStartDate",
    "numberOfPeople",
    "numberOfVehicle",
  ].includes(name);

  const priceValue = ["additionalDepositAmount", "totalDepositAmount"].includes(
    name
  );

  const [value, setValues] = useState(getData[name]);
  const [options, setOptions] = useState([]);
  const [valueOptions, setValuesOptions] = useState(null);
  const [RetalPrice,setRetalPrice]= useRetalPrice()
  const [totalReduce, setTotalReduce] = useSetTotalReduce();
  const  [getNamecommissionPolicyId, , , ]= useDayMonthofSelect()
  // 
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
    const initialValue = getData[name];
    if (priceValue && initialValue) {
      setValues(initialValue.toLocaleString("vi-VN"));
      setValue(name, getData[name]);
    }
 
    else {
      setValues(initialValue);
      setValue(name, getData[name]);
    }
  }, [getData, name, isSidebarOpen, priceValue]);

useEffect(()=>{
  setValue("totalDepositAmount", (((RetalPrice+totalReduce)*getNamecommissionPolicyId))?.toLocaleString("vi-VN"));
  const value = ((RetalPrice+totalReduce)*(getNamecommissionPolicyId)-Number(getValues("depositAmount")?.replace(/[^0-9]/g, "")))?.toLocaleString("vi-VN")
  setValue("additionalDepositAmount", value);
},[RetalPrice,totalReduce])

  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    if (name === "rentalPrice") {
      setValue("rentalPrice", numericValue);
      setValues(Number(numericValue).toLocaleString("vi-VN"));
      setRetalPrice(Number(numericValue))
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
  const handleChangeValueOptions = (selectedOption) => {
    setValuesOptions(selectedOption);
    setValue("roomId", selectedOption ? selectedOption.value : getInfo.id);
    setValue("roomCode",selectedOption && selectedOption.label.slpit('.')[1])
  };
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

  return (
    <div className="w-[501px] self-stretch justify-between items-center gap-4 inline-flex">
      <div className="w-fit max-w-[160px] text-gray-700 text-sm font-medium leading-tight">
        <p>{title}</p>
        <p className="text-sm font-sans text-gray-900 italic ">{title1}</p>
      </div>
      <div
        className={`w-[318px] h-[38px] ${
          name === "roomCode" ? "px-0" : "px-[13px] "
        }py-[9px] ${
          isDisabled || getInfo.status === "3"|| (Number(getValues("additionalDepositAmount")) === 0 ) ? "bg-gray-50" : "bg-white"
        } rounded-md shadow border border-gray-300 ${
          unit
            ? "justify-start items-center gap-2 flex"
            : "justify-between items-center flex"
        }`}
      >
        {name !== "roomCode" ? (
          <>
            <input
              {...register(name)}
              type={type}
              className="w-full outline-none text-sm font-normal leading-tight h-full"
              placeholder={placeholder}
              disabled={(getInfo.status === "3" || (Number(getValues("additionalDepositAmount")) === 0 )) ? true : isDisabled}
              value={value}
              onChange={handleChangeValue}
            />
            {unit && (
              <div className="text-gray-500 text-sm font-normal leading-tight">
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
            isDisabled={(getInfo.status === "3" || (Number(getValues("additionalDepositAmount")) === 0 )) ? true : isDisabled}
          />
        )}
      </div>
    </div>
  );
};

export default RowComponent;
