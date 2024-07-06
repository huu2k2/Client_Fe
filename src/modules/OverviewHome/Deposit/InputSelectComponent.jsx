import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

const InputSelectComponent = ({ title, name, control, errors }) => {
  const durationOptions = [
    { value: '1', label: '1 tháng' },
    { value: '2', label: '2 tháng' },
    { value: '3', label: '3 tháng' },
    { value: '6', label: '6 tháng' },
    { value: '12', label: '12 tháng' },
  ];

  return (
    <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
      <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
        {title}
      </div>
      <div className={`self-stretch bg-white rounded-md shadow border ${errors[name] ? 'border-red-600 border-2' : 'border-gray-300'} justify-between items-center inline-flex w-80`}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              value={durationOptions.find(option => option.value === String(value))}
              onChange={selectedOption => onChange(selectedOption ? parseInt(selectedOption.value, 10) : null)}
              options={durationOptions}
              className="w-full"
              classNamePrefix="select"
              placeholder="Chọn thời hạn hợp đồng"
            />
          )}
        />
      </div>
      {errors[name] && (
        <div className="text-red-600 text-sm">
          {errors[name].message || "Trường này là bắt buộc"}
        </div>
      )}
    </div>
  );
};

export default InputSelectComponent;
