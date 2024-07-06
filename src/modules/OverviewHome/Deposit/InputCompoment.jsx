import React from 'react';

const InputCompoment = ({ title, type, suffix, bgColor }) => {
  return (
    <div className="flex items-center gap-6">
      <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
        {title}
      </div>
      <div className={`h-[38px] px-[13px] py-[9px] ${bgColor || 'bg-white'} rounded-md shadow border border-gray-300 flex items-center w-80`}>
        <input
          type={type}
          className={`w-full text-sm font-normal leading-tight outline-none ${bgColor ? 'bg-neutral-100 ' : ''}`}
          placeholder={title}
          disabled={bgColor ?true :false}
        />
        {suffix && (
          <div className="text-gray-500 text-sm font-normal leading-tight ml-2">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputCompoment;
