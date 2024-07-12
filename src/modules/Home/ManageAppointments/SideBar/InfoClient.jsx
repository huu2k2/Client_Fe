import React from "react";
import RowComponent from "./RowCompoment";
 

const muiltyRow = [
  { id: 1, title: 'Họ và tên', type: 'text', placeholder: 'Nguyễn Văn A',name:'fullName' },
  { id: 2, title: 'Số điện thoại', type: 'text', placeholder: '' ,name:'phoneNumber'},
  { id: 3, title: 'Ngày sinh', type: 'date', placeholder: '' ,name:'birthOfDay'},
  { id: 4, title: 'CCCD/CMND', type: 'text', placeholder: '' ,name:'identification'},
  { id: 5, title: 'Ngày cấp', type: 'date', placeholder: '',name:'dateRange' },
  { id: 6, title: 'Nơi cấp', type: 'text', placeholder: '',name:'issuedBy' },
  { id: 7, title: 'Địa chỉ thường trú', type: 'text', placeholder: '' ,name:'permanentAddress'}
];

const InfoClient = ({register}) => {
  return (
    <div className="w-[556px] h-fit px-6 py-5 flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Thông tin khách hàng
      </div>
      {muiltyRow.map((row) => (
     <RowComponent register={register}    name={row.name} key={row.id} title={row.title} type={row.type} placeholder={row.placeholder} unit={row.unit} />
      ))}
    </div>
  );
};

export default InfoClient;
