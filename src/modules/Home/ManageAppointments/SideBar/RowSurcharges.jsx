import React from 'react';

const RowSurcharges = ({ label, unit }) => {
  return (
    <div className="self-stretch justify-start items-center gap-4 inline-flex">
      <div className="w-[180px] text-gray-700 text-sm font-medium font-['Inter'] leading-tight">
        {label}
      </div>
      <div className="grow shrink basis-0 h-[38px] bg-white rounded-md shadow border border-gray-300 justify-start items-center flex">
        <div className="grow shrink basis-0 h-[38px] pl-[13px] pr-3 py-[9px] justify-start items-center gap-2 flex">
          <input type="text" className="w-full outline-none text-sm font-normal leading-tight" />
        </div>
        <div className="w-16 pl-[15px] pr-[17px] py-[9px] bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 justify-center items-center gap-2 flex">
          <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowSurcharges;
