import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import { useGetCommisstionPoliciesQuery } from "@apis/slice/Houses";

const SelectTips = ({ getInfo, setValue, setNamecommissionPolicyId, getValues }) => {
  const commissionPolicyId = getValues('commissionPolicyId');
  const commissionPolicyLable = getValues('commissionPolicyLable');
  
  const defaultOption = useMemo(() => ({
    value: commissionPolicyId,
    label: commissionPolicyLable,
  }), [commissionPolicyId, commissionPolicyLable]);

  const [value, setValues] = useState(defaultOption);
  const { data } = useGetCommisstionPoliciesQuery(getInfo.houseId || 0);
  const [options, setOptions] = useState([defaultOption]);

  useEffect(() => {
    setValues(defaultOption);
    setOptions([defaultOption]);
  }, [defaultOption]);

  useEffect(() => {
    const CovertData = data?.response?.map((i) => ({
      value: i.id,
      label: `HĐ ${i.month} Tháng - Cọc ${i.deposit} - Hoa hồng ${i.commission} %`,
    }));

    if (CovertData && CovertData.length > 0) {
      setOptions([defaultOption, ...CovertData]);
      const selectedOption = CovertData.find(opt => opt.value === defaultOption.value) || defaultOption;
      setValues(selectedOption);
    } else {
      setOptions([defaultOption]);
    }
  }, [data, defaultOption]);

  const handleChangeValue = (selectedOption) => {
    setValues(selectedOption);
    setValue('commissionPolicyId', selectedOption.value);
    const val = selectedOption.label?.split('-')[1]?.trim().split(' ')[1] || '';
    setNamecommissionPolicyId(val);
    setValue('commissionPolicyLable', selectedOption.label);
  };

  return (
    <div className="w-[501px] flex justify-between items-center gap-4">
      <div className="w-fit text-gray-700 text-sm font-medium leading-tight">
        Hợp đồng
      </div>
      <div className="w-[318px] h-[38px] bg-white rounded-md shadow border border-gray-300 justify-between items-center flex">
        <Select
          className="w-full outline-none text-sm font-normal leading-tight"
          value={value}
          onChange={handleChangeValue}
          options={options}
          isDisabled={true}
        />
      </div>
    </div>
  );
};

export default SelectTips;
