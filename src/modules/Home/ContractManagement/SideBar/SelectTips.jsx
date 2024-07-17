import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useGetCommisstionPoliciesQuery } from "@apis/slice/Houses";

const SelectTips = ({ getInfo, setValue, setNamecommissionPolicyId, getValues }) => {
  const defaultOption = {
    value: getValues('commissionPolicyId'),
    label: getValues('commissionPolicyLable'),
  };

  const [value, setValues] = useState(defaultOption);
  const { data } = useGetCommisstionPoliciesQuery(getInfo.houseId || 0);

  const [options, setOptions] = useState([defaultOption]);
  
  useEffect(() => {
    const CovertData = data?.response?.map((i) => ({
      value: i.id,
      label: `${i.month} Tháng - Cọc ${i.deposit} - Hoa hồng ${i.commission} %`,
    }));

    if (CovertData && CovertData.length > 0) {
      setOptions([defaultOption, ...CovertData]);
      const selectedOption = CovertData.find(opt => opt.value === defaultOption.value) || defaultOption;
      setValues(selectedOption);
    } else {
      setOptions([defaultOption]);
    }
  }, [data]);

  const handleChangeValue = (selectedOption) => {
    setValues(selectedOption);
    setValue('commissionPolicyId', selectedOption.value);
    const val = selectedOption.label?.split('-')[1]?.trim().split(' ')[1] || '';
    setNamecommissionPolicyId(val);
    setValue('commissionPolicyLable',selectedOption.label)
  };

  return (
    <div className="self-stretch justify-start items-center gap-4 inline-flex">
      <div className="w-[180px] text-gray-700 text-sm font-medium leading-tight">
        Đặt cọc
      </div>
      <div
        className="grow shrink basis-0 h-[38px] bg-white rounded-md shadow border border-gray-300 justify-between items-center flex"
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
