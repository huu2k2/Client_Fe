import React from 'react';
import RowSurcharges from './RowSurcharges'; // Đảm bảo đường dẫn đúng

const Surcharges = ({register,serviceInserts,setServiceInserts}) => {
  const handleServicePriceChange = (index, newPrice) => {
    const updatedServiceInserts = serviceInserts.map((item, i) =>
      i === index ? { ...item, servicePrice: newPrice } : item
    );
    setServiceInserts(updatedServiceInserts);
  };
  return (
    <div className="w-[556px] h-[425px] px-6 py-5 flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium font-['Inter'] leading-7">
        Các khoản phụ thu
      </div>
      {serviceInserts && serviceInserts?.map((i,index)=>(
        <RowSurcharges label={i.serviceName} unit={i.dvt} price={i.servicePrice} key={index} onChange={(newPrice) => handleServicePriceChange(index, newPrice)}

/>
      ))}
     
      <div className="w-[508px] h-[105px] relative">
        <div className="w-[180px] left-0 top-[9px] absolute text-gray-700 text-sm font-medium font-['Inter'] leading-tight">
          Ghi chú nội bộ
        </div>
        <textarea
        {...register("note")}
          className="w-[312px] h-full pl-[15px] pr-[17px] py-[9px] left-[196px] top-0 absolute bg-white rounded-md shadow border border-gray-300 overflow-y-auto"
          placeholder=""
        />
      </div>
    </div>
  );
};

export default Surcharges;
