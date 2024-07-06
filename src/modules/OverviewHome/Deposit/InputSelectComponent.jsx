import React, { useState } from 'react';
import Select from 'react-select';

const InputSelectComponent = ({title}) => {
  // State để lưu giá trị của dropdown
  const [selectedDuration, setSelectedDuration] = useState(null);

  // Tùy chọn cho dropdown
  const durationOptions = [
    { value: '1', label: '1 tháng' },
    { value: '3', label: '3 tháng' },
    { value: '6', label: '6 tháng' },
    { value: '12', label: '12 tháng' },
  ];

  // Hàm xử lý thay đổi giá trị dropdown
  const handleDurationChange = (selectedOption) => {
    setSelectedDuration(selectedOption);
  };

  return (
    <div className="pr-[525px] justify-start items-center gap-6 inline-flex">
    <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
      {title}
    </div>
    <div className="self-stretch   bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex w-80">
    <Select
          value={selectedDuration}
          onChange={handleDurationChange}
          options={durationOptions}
          className="w-full"
          classNamePrefix="select"
          placeholder="Chọn thời hạn hợp đồng"
        />
    </div>
  </div>
  );
};

export default InputSelectComponent;
