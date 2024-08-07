import React from "react";
import InputComponent from "./InputCompoment"; // Đảm bảo tên component chính xác

const InfoAccount = ({register,errors}) => {
  // Danh sách các trường thông tin
  const fields = [
    { title: "Tên khách hàng", type: "text", name: "fullName" },
    { title: "Số điện thoại", type: "text", name: "phoneNumber" },
    { title: "Ngày sinh", type: "date", name: "birthOfDay" },
    { title: "CCCD/CMND", type: "text", name: "identification" },
    { title: "Ngày cấp", type: "date", name: "dateRange" },
    { title: "Nơi cấp", type: "text", name: "issuedBy" },
    { title: "Địa chỉ thường trú", type: "text", name: "permanentAddress" }
  ];


  return (
    <div className="self-stretch h-[512px] flex-col justify-start items-start gap-6 flex">
      <div className="self-stretch h-6 flex-col justify-start items-start flex">
        <div className="self-stretch text-rose-800 text-lg font-bold leading-normal">
          Thông tin khách hàng
        </div>
      </div>
      <div className="self-stretch h-[464px] flex-col justify-start items-start gap-4 flex">
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <InputComponent title={field.title} type={field.type} name={field.name} register={register} errors={errors}/>
            {index < fields.length - 1 && (
              <div className="self-stretch h-px bg-gray-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default InfoAccount;
