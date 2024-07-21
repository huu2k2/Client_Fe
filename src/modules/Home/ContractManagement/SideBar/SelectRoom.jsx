import React, { useEffect, useState } from "react";
import Select from "react-select";
const SelectRoom = ({ getInfo, setValue,getValues}) => {
    const defaultOption = {
        value: getInfo.id,
        label: getInfo.roomCode,
      };
    
      const [value, setValues] = useState(defaultOption);
      
    
      const [options, setOptions] = useState([defaultOption]);
      
     
      const handleChangeValue = (selectedOption) => {
        
      };
    
  return (
<div className="self-stretch justify-start items-center gap-4 inline-flex">
      <div className="w-[180px] text-gray-700 text-sm font-medium leading-tight">
        Mã phòng
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
  )
}

export default SelectRoom