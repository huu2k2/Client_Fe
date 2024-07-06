import React, { useState, useEffect } from "react";
import InputExpense from "./InputExpense";

const AdditionalCharges = ({ serviceInserts, setPickServiceInserts, register, errors }) => {
  const [serviceData, setServiceData] = useState(serviceInserts || []);

  useEffect(() => {
    // Update serviceData when serviceInserts changes
    setServiceData(serviceInserts || []);
  }, [serviceInserts]);

  useEffect(() => {
    // Notify parent component of changes in serviceData
    setPickServiceInserts(serviceData);
  }, [serviceData, setPickServiceInserts]);

  const handlePriceChange = (id, value) => {
    // Remove non-numeric characters
    const formattedValue = value.replace(/[^0-9]/g, "");
    setServiceData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, servicePrice: parseInt(formattedValue, 10) || 0 } : item
      )
    );
  };

  return (
    <>
      <div className="self-stretch h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>
      <div className="self-stretch h-[437px] flex-col justify-start items-start gap-10 flex">
        <div className="self-stretch h-[437px] flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch h-[437px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch h-6 flex-col justify-start items-start flex">
              <div className="self-stretch text-rose-800 text-lg font-bold leading-normal">
                Các khoản phụ thu
              </div>
            </div>
            <div className="self-stretch h-[389px] flex-col justify-start items-start gap-4 flex">
              {serviceData.map((expense, index) => (
                <React.Fragment key={index}>
                  <InputExpense
                    id={expense.id}
                    title={expense.serviceName}
                    price={expense.servicePrice}
                    dvt={expense.dvt}
                    onPriceChange={handlePriceChange}
                  />
                  <div className="self-stretch h-px bg-gray-200" />
                </React.Fragment>
              ))}
              <div className="w-full flex gap-8">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Ghi chú
                </div>
                <div className="h-[105px] w-[320px] bg-white rounded-md shadow border border-gray-300 flex items-start px-3 py-2">
                  <textarea
                    {...register("note")} // Register the textarea field
                    className="text-sm font-normal leading-tight outline-none w-full h-full"
                    placeholder="Ghi chú"
                  ></textarea>
                  {errors.note && (
                    <span className="text-red-500 text-sm">{errors.note.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalCharges;
