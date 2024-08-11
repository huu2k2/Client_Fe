import React from "react";
import RowSurcharges from "./RowSurcharges"; // Đảm bảo đường dẫn đúng

const Surcharges = ({ register, serviceInserts, setServiceInserts }) => {
  const handleServicePriceChange = (index, newPrice) => {
    const updatedServiceInserts = serviceInserts.map((item, i) =>
      i === index ? { ...item, servicePrice: newPrice } : item
    );
    setServiceInserts(updatedServiceInserts);
  };
  return (
    <div className="w-[501px]  h-fit pl-2 py-5 flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Các khoản phụ thu
      </div>
      {serviceInserts &&
        serviceInserts?.map((i, index) => (
          <RowSurcharges
            label={i.serviceName}
            unit={i.dvt}
            price={i.servicePrice}
            key={index}
            onChange={(newPrice) => handleServicePriceChange(index, newPrice)}
          />
        ))}

      {/* <div className="w-[501px] h-[105px]  flex justify-between items-start">
        <div className="w-fit text-gray-700 text-sm font-medium leading-tight">
          Ghi chú nội bộ
        </div>
        <textarea
          {...register("note")}
          className="w-[318px] h-full py-[9px] bg-white rounded-md shadow border border-gray-300 overflow-y-auto"
          placeholder=""
        />
      </div> */}
    </div>
  );
};

export default Surcharges;
