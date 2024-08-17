import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useGetListRoomCodeNotDepositQuery } from "@apis/slice/rooms";


const RowComponent = ({
  title = null,
  type = null,
  placeholder = null,
  unit = null,
  register = null,
  name = null,
  getInfo = null,
  setValue = null,
  isSidebarOpen = null,
  getNamecommissionPolicyId = null,
  getRentalMonth = null,
  getRentalPrice = null,
  setRentalPrice = null,
  InfoCCCD = null,
  getValues = null,
  title1=""
}) => {
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
  ].includes(name);

  const getDataFromCMND = [
    "fullName",
    "birthOfDay",
    "identification",
    "dateRange",
    "issuedBy",
    "permanentAddress",
  ].includes(name);

  const plaValue = ["houseAddress", "phoneNumber"].includes(name);

  const priceValue = ["depositAmount"].includes(
    name
  );
  const rentalTermMonth = ["rentalTerm"].includes(name);
 

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
  // get all infomations dont change
  useEffect(() => {
    if (plaValue) {
      setValues(getValues(name));
    }
    //  import auto for price begin
    if (name === "rentalPrice") {
      setValues(getValues("rentalPrice") && getValues("rentalPrice")?.toLocaleString("vi-VN"));
    }
    if(name==="totalDepositAmount"){
      setValues(getValues("totalDepositAmount")?.toLocaleString("vi-VN"));
    }
    if(name==="depositAmount"){
      setValue("additionalDepositAmount",getValues("totalDepositAmount")-Number(value.toString().replace(/\./g, "")))
    }
  
  }, [name,setValue,setValues,getValues,isSidebarOpen]);
  //  auto import data from detech CCCD into input
  useEffect(() => {
    if (getDataFromCMND && InfoCCCD[name]) {
      setValue(name, InfoCCCD[name]);
      setValues(InfoCCCD[name]);
    }
  }, [getDataFromCMND, InfoCCCD, name, setValue]);


  // import price totalDepositAmount
  useEffect(()=>{
if(getRentalPrice && getNamecommissionPolicyId && name ==="totalDepositAmount"){
  setValue("totalDepositAmount",getRentalPrice*getNamecommissionPolicyId)
  setValues((getRentalPrice*getNamecommissionPolicyId)?.toLocaleString("vi-VN"))
}
  },[getNamecommissionPolicyId,getRentalPrice])
 // handle additionalDepositAmount

  //
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

  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    setValues(inputValue);

    if (priceValue) {
      const numericValue = inputValue.replace(/[^0-9]/g, "");
      setValues(Number(numericValue)?.toLocaleString("vi-VN"));
      setValue("depositAmount",numericValue)
      setValue("additionalDepositAmount",(getValues("totalDepositAmount")-numericValue)?.toLocaleString("vi-VN"))
    } else if (name === "rentalPrice") {
      const numericValue = inputValue.replace(/[^0-9]/g, "");
      setValues(Number(numericValue)?.toLocaleString("vi-VN"));
      setValue("rentalPrice",numericValue)
      setRentalPrice(Number(numericValue));
    }  else {
      setValues(e.target.value);
      setValue(name,e.target.value)
    }
  };

  const handleChangeValueOptions = (selectedOption) => {
    setValuesOptions(selectedOption);
    setValue("roomId", selectedOption ? selectedOption.value : getInfo.id);
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
