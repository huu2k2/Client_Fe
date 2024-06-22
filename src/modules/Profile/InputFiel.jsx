import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const InputFiel = ({ name, label, type, nameRegister, errors, isEnable = false }) => {
  const { register,setValue } = useFormContext();
  const [Val,SetVal] = useState(label)
const handleChange =(e)=>{
  SetVal(e.target.value)
// if(nameRegister==='dateRange' || nameRegister==='bod'){
//   setValue(e.target.value)
// }

}
  return (
    <div className="w-full gap-4 flex justify-start items-center">
      <span className="w-[180px] h-5 not-italic text-gray-700">{name}</span>
      <input
        {...(!isEnable && register(nameRegister))}  // Register only if isEnable is false
        type={type}
        value={Val}
        className={`w-[312px] h-[38px] px-[13px] py-[9px] border-2 rounded-md  `}
        disabled={isEnable}  // Disable input if isEnable is true
        onChange={handleChange}
      />
      
    </div>
  );
};

export default InputFiel;
