import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useGetCommisstionPoliciesQuery } from "@apis/slice/Houses";
import { useDayMonthofSelect, useSetInfo, useSetIsSidebarOpen } from "../../../../customHooks";

const SelectTips = ({
  setValue,
 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useSetIsSidebarOpen();
  const [getInfo, setInfo] = useSetInfo();
  const [
    getNamecommissionPolicyId,
    setNamecommissionPolicyId,
    getRentalMonth,
    setRentalMonth,
  ] = useDayMonthofSelect();
  const [value, setValues] = useState(null);
  const { data } = useGetCommisstionPoliciesQuery(getInfo.houseId || 0);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    const CovertData = data?.response?.map((i) => ({
      value: i.id,
      label: `HĐ ${i.month} Tháng - Cọc ${i.deposit} - Hoa hồng ${i.commission} %`,
    }));
    setOptions(CovertData || []);
  }, [data]);
  const handleChangeValue = (selectedOption) => {
    setValues(selectedOption);
    setValue("commissionPolicyId", selectedOption.value);
    const val = selectedOption.label?.split("-")[1].trim().split(" ")[1];

    setNamecommissionPolicyId(val);
    setRentalMonth(selectedOption.label?.split("-")[0].trim().split(" ")[1]);
  };
  useEffect(() => {
    if (!isSidebarOpen) {
      setValues(null);
    }
  }, [isSidebarOpen]);
  return (
    <div className="w-[501px] flex justify-between items-start gap-4  ">
      <div className="w-fit text-gray-700 text-sm font-medium leading-tight ">
        Hợp đồng
      </div>
      <div
        className={` w-[318px]  h-[38px]   
      bg-white
      rounded-md shadow border border-gray-300  "justify-between items-center flex"
      `}
      >
        <Select
          className="w-full outline-none text-sm font-normal leading-tight"
          value={value}
          onChange={handleChangeValue}
          options={options}
        />
      </div>
    </div>
  );
};

export default SelectTips;
