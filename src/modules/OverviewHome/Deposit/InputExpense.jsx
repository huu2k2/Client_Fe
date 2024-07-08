import React, { useState } from "react";

const InputExpense = ({ id, title, price, dvt, onPriceChange }) => {
  const [currentPrice, setCurrentPrice] = useState(price);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // Remove non-numeric characters
    const formattedValue = newValue.replace(/[^0-9]/g, "");
    setCurrentPrice(formattedValue);
    onPriceChange(id, formattedValue);
  };

  return (
    <div className="pr-[525px] justify-start items-center gap-8 inline-flex">
      <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
        {title}
      </div>
      <div className="h-[38px] overflow-hidden bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
        <input
          type="text"
          value={new Intl.NumberFormat("vi-VN").format(currentPrice)}
          onChange={handleInputChange}
          className="w-56 h-[38px] pl-[13px] pr-3 outline-none justify-start items-center gap-2 text-sm font-normal leading-tight"
        />
        <div className="w-[88px] pl-[15px] pr-[17px] py-[9px] bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 justify-center items-center gap-2 flex">
          <div className="text-gray-500 text-sm font-normal leading-tight">
            {dvt}
          </div>
          <div className="w-5 h-5 relative" />
        </div>
      </div>
    </div>
  );
};

export default InputExpense;
