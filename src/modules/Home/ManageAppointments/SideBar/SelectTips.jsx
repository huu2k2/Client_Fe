import React, { useState } from "react";
import Select from "react-select";

const SelectTips = ({
  title,
  placeholder,
 
  register,
 
}) => {
  const [value, setValues] = useState(null);

  const handleChangeValue = (selectedOption) => {
    setValues(selectedOption);
  };
  const options = [
    { value: "option1", label: "12 tháng - Cọc 1,5 - Hoa hồng 30%" },
    { value: "option2", label: "12 tháng - Cọc 1,5 - Hoa hồng 30%" },
    { value: "option3", label: "12 tháng - Cọc 1,5 - Hoa hồng 30%" },
  ];
  return (
    <div className="self-stretch justify-start items-center gap-4 inline-flex">
      <div className="w-[180px] text-gray-700 text-sm font-medium leading-tight ">
       Đặt cọc
      </div>
      <div
        className={`grow shrink basis-0 h-[38px]  
        "bg-white"
      rounded-md shadow border border-gray-300  "justify-between items-center flex"
      `}
      >
        <Select
          className="w-full outline-none text-sm font-normal leading-tight"
          value={value}
          onChange={handleChangeValue}
          options={options}
          placeholder={placeholder}
        />
        
      </div>
    </div>
  );
};

export default SelectTips;
