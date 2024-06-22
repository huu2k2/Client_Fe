import React from 'react'

const InputFiel = ({name, label ,type, value}) => {
  return (
    <div className="w-full gap-4 flex justify-start items-center">
    <span className="w-[180px] h-5 not-italic text-gray-700">{name}</span>
    <input type={type} placeholder={label && label} value={value && value}   className="w-[312px] h-[38px] px-[13px] py-[9px] border-2 rounded-md "/>
</div>
  )
}

export default InputFiel