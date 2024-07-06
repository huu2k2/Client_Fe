import React from "react";
import InputComponent from "./InputCompoment";
import InputSelectComponent from "./InputSelectComponent";
const InformationApartment = () => {
  // Danh sách các trường thông tin
  const fields = [
    { title: "Địa chỉ toà nhà", type: "text" ,bgColor: "bg-neutral-100" },
    { title: "Mã phòng", type: "text",bgColor: "bg-neutral-100"  },
    { title: "Giá cho thuê", type: "text", suffix: "đ" },
 
  ];
  const fieldsAfter = [
    { title: "Đặt cọc", type: "text", bgColor: "bg-neutral-100" },
    { title: "Hoa hồng", type: "text", bgColor: "bg-neutral-100", suffix: "%" },
    { title: "Ngày đặt cọc", type: "date" },
    { title: "Số tiền cọc giữ phòng", type: "text", suffix: "đ" },
    { title: "Số tiền cọc bổ sung", type: "text", suffix: "đ" },
    { title: "Hạn thanh toán tiền cọc", type: "date" },
    { title: "Ngày bắt đầu thuê", type: "date" },
    { title: "Số lượng người ở", type: "text" },
    { title: "Số lượng xe", type: "text" },
    { title: "Chương trình ưu đãi", type: "text" },
  ];
  return (
    <div className="self-stretch h-fit flex-col justify-start items-start gap-10 flex">
      <div className="self-stretch h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>
      <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch h-6 flex-col justify-start items-start flex">
          <div className="self-stretch text-rose-800 text-lg font-bold leading-normal">
            Thông tin căn hộ
          </div>
        </div>
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <InputComponent
              title={field.title}
              type={field.type}
              suffix={field.suffix}
              bgColor={field.bgColor}
            />
            {index < fields.length - 1 && (
              <div className="self-stretch h-px bg-gray-200" />
            )}
          </React.Fragment>
        ))}
        <InputSelectComponent title={'Thời hạn hợp đồng'}/>
        {fieldsAfter.map((field, index) => (
          <React.Fragment key={index}>
            <InputComponent
              title={field.title}
              type={field.type}
              suffix={field.suffix}
              bgColor={field.bgColor}
            />
            {index < fields.length - 1 && (
              <div className="self-stretch h-px bg-gray-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default InformationApartment;
