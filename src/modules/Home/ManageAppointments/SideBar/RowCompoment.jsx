import React from 'react';

const RowComponent = ({ title, type, placeholder, unit }) => {
  return (
    <div className="self-stretch justify-start items-center gap-4 inline-flex">
      <div className="w-[180px] text-gray-700 text-sm font-medium font-['Inter'] leading-tight">
        {title}
      </div>
      <div className={`grow shrink basis-0 h-[38px] px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-${unit ? 'start items-center gap-2 flex' : 'between items-center flex'}`}>
        <input
          type={type}
          className="w-full outline-none text-sm font-normal leading-tight"
          placeholder={placeholder}
        />
        {unit && <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">{unit}</div>}
      </div>
    </div>
  );
};

export default RowComponent;
