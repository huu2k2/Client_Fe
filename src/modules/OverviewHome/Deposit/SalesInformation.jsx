import React from 'react';
import IMGQR from '../../../assets/QR.png';
import InputComponent from "./InputCompoment";
const SalesInformation = () => {
  // Array containing field definitions
  const fields = [
    { title: "Tên nhân viên sale", type: "text" },
    { title: "Số điện thoại", type: "text" },
    { title: "Tên công ty/nhóm/đơn vị", type: "text" }
  ];

  return (
    <>
      <div className="self-stretch h-px bg-rose-800 flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-gray-200" />
      </div>
      <div className="self-stretch h-[747px] flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch h-6 flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch text-rose-800 text-lg font-bold leading-normal">
            Thông tin nhân viên sale
          </div>
        </div>
        <div className="self-stretch h-[699px] flex-col justify-start items-start gap-4 flex">
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              <InputComponent
                title={field.title}
                type={field.type}
              />
              <div className="self-stretch h-px bg-gray-200" />
            </React.Fragment>
          ))}
          <div className="w-[1280px] h-[486px] relative">
            <div className="w-[411px] left-0 top-[9px] absolute text-gray-900 text-lg font-medium leading-normal">
              QR chuyển tiền
            </div>
            <img
              className="w-80 h-[486px] left-[435px] top-0 absolute"
              src={IMGQR}
              alt="QR code"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesInformation;
