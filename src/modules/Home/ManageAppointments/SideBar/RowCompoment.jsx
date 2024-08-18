import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useGetListRoomCodeNotDepositQuery } from "@apis/slice/rooms";
import {
  useDayMonthofSelect,
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
  const valueRentalPrice = ["rentalPrice"].includes(name);
  const valueTotalReduce = ["totalReduce"].includes(name);
  const valueTotalDepositAmount = ["totalDepositAmount"].includes(name);
  const valuedepositAmount = ["depositAmount"].includes(name);

  //  create state dependices , check totalReduce from rentalPrice , totalReduce
  const [valuerentalPrice, setValuerentalPrice] = useState(0);
  useEffect(() => {
    if (valueDonChange) {
      setValues(getValues(name));
    }
    if (valueRentalPrice) {
      const value = Number(getValues(name));
      setValues(value?.toLocaleString("vi-VN"));
      setValue("totalReduce", value + Number(totalReduce));
      setValuerentalPrice(value + Number(totalReduce));
    }
    // if (valueTotalReduce) {
    //   const value = Number( getValues("rentalPrice")) + Number(totalReduce);
    //   console.log(value)
    //   setValues(value?.toLocaleString("vi-VN"));
    // }
  }, [name, setValues, getValues, isSidebarOpen, totalReduce]);
 useEffect(()=>{

 },[])
  //
  // useEffect(() => {
  //   if (valueTotalDepositAmount) {
  //     const value =
  //       (Number(getValues("rentalPrice")) + totalReduce) *
  //       getNamecommissionPolicyId;
  //     setValues(value?.toLocaleString("vi-VN"));
  //     setValue(name, value);
  //   }
  // }, [name, setValues, getValues, isSidebarOpen, totalReduce]);
  //
  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    if (valueRentalPrice) {
      const value = inputValue?.replace(/[^0-9]/g, "");
      setValues(Number(value)?.toLocaleString("vi-VN"));
      setValue(name, Number(value));


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
