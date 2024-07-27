import React, { useState } from 'react';

const RowSurcharges = ({ label, unit, price, onChange }) => {
  const [value, setValue] = useState(price);

  // Hàm để định dạng giá trị số thành chuỗi tiền tệ
  const formatNumber = (num) => {
    return num.toLocaleString('vi-VN');
  };

  // Hàm để chuyển đổi chuỗi tiền tệ thành số
  const parseNumber = (str) => {
    return parseFloat(str.replace(/[^0-9]/g, '')) || 0;
  };

  const handleChange = (e) => {
    // Chuyển đổi chuỗi đầu vào thành số và cập nhật state
    const numericValue = parseNumber(e.target.value);
    setValue(numericValue);
    onChange(numericValue);
  };

  return (
    <div className="w-[501px] justify-between items-start  flex">
      <div className="w-fit text-gray-700 text-sm font-medium leading-tight">
        {label}
      </div>
      <div className=" w-[318px] h-[38px] bg-white rounded-md shadow border border-gray-300 justify-start items-center flex">
        <div className="grow shrink basis-0 h-[38px] py-[9px] px-4 justify-start items-center gap-2 flex">
          <input
            type="text"
            className="w-full outline-none text-sm font-normal leading-tight"
            value={formatNumber(value)}
            onChange={handleChange}
            placeholder="Nhập số tiền"
          />
        </div>
        <div className="w-16 pl-[15px] pr-[17px] py-[9px] bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 justify-center items-center gap-2 flex">
          <div className="text-gray-500 text-sm font-normal leading-tight">
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowSurcharges;
