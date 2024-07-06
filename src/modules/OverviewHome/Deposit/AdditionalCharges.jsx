import React from "react";
import InputExpense from './InputExpense';

const AdditionalCharges = () => {
  // Danh sách các khoản phụ thu
  const expenses = [
    { title: "Phí điện", price: 3500, dvt: "kwh" },
    { title: "Phí nước", price: 100000, dvt: "m3" },
    { title: "Phí giữ xe", price: 3500, dvt: "Xe" },
    { title: "Phí quản lý", price: 3500, dvt: "Phòng" }
  ];

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
              {expenses.map((expense, index) => (
                <React.Fragment key={index}>
                  <InputExpense 
                    title={expense.title}
                    price={expense.price}
                    dvt={expense.dvt}
                  />
                  {index < expenses.length - 1 && (
                    <div className="self-stretch h-px bg-gray-200" />
                  )}
                </React.Fragment>
              ))}
              <div className="w-full flex gap-8">
                <div className="w-[411px] text-gray-700 text-sm font-medium leading-tight">
                  Ghi chú
                </div>
                <div className="h-[105px] w-[320px] bg-white rounded-md shadow border border-gray-300 flex items-start px-3 py-2">
                  <textarea
                    className="text-sm font-normal leading-tight outline-none w-full h-full"
                    placeholder="Ghi chú"
                  ></textarea>
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
