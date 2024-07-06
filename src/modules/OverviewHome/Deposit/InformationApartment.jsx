import React from "react";
import InputComponent from "./InputCompoment";
import InputSelectComponent from "./InputSelectComponent";

const InformationApartment = ({ register, errors,control }) => {
  // Danh sách các trường thông tin
  const fields = [
    { title: "Địa chỉ toà nhà", type: "text", name: "houseAddress", bgColor: "bg-neutral-100" },
    { title: "Mã phòng", type: "text", name: "roomId", bgColor: "bg-neutral-100" },
    { title: "Giá cho thuê", type: "text", name: "rentalPrice", suffix: "đ" },
  ];

  const fieldsAfter = [
    { title: "Đặt cọc", type: "text", name: "deposit", bgColor: "bg-neutral-100" },
    // { title: "Hoa hồng", type: "text", name: "commission", bgColor: "bg-neutral-100", suffix: "%" },
    { title: "Ngày đặt cọc", type: "date", name: "depositDate" },
    { title: "Số tiền cọc giữ phòng", type: "text", name: "depositAmount", suffix: "đ" },
    { title: "Số tiền cọc bổ sung", type: "text", name: "additionalDepositAmount", suffix: "đ" },
    { title: "Hạn thanh toán tiền cọc", type: "date", name: "depositPaymentDeadline" },
    { title: "Ngày bắt đầu thuê", type: "date", name: "rentalStartDate" },
    { title: "Số lượng người ở", type: "text", name: "numberOfPeople" },
    { title: "Số lượng xe", type: "text", name: "numberOfVehicle" },
    { title: "Chương trình ưu đãi", type: "text", name: "chuongTrinhUuDai" },
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
              name={field.name}
              suffix={field.suffix}
              bgColor={field.bgColor}
              register={register}
              errors={errors}
            />
            {index < fields.length - 1 && (
              <div className="self-stretch h-px bg-gray-200" />
            )}
          </React.Fragment>
        ))}
        <InputSelectComponent title={'Thời hạn hợp đồng'} name="rentalTerm" control={control} errors={errors} />
        {fieldsAfter.map((field, index) => (
          <React.Fragment key={index}>
            <InputComponent
              title={field.title}
              type={field.type}
              name={field.name}
              suffix={field.suffix}
              bgColor={field.bgColor}
              register={register}
              errors={errors}
            />
            {index < fieldsAfter.length - 1 && (
              <div className="self-stretch h-px bg-gray-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default InformationApartment;
