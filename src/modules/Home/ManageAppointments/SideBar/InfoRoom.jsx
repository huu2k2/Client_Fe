import React from "react";
import RowComponent from "./RowCompoment";
 

const muiltyRow = [
  { id: 1, title: 'Địa chỉ toà nhà', type: 'text', placeholder: '' },
  { id: 2, title: 'Mã phòng', type: 'text', placeholder: '' },
  { id: 3, title: 'Giá cho thuê', type: 'text', placeholder: '', unit: 'đ' },
  { id: 4, title: 'Thời hạn thuê', type: 'text', placeholder: '', unit: 'Tháng' },
  { id: 5, title: 'Ngày đặt cọc', type: 'date', placeholder: '' },
  { id: 6, title: 'Số tiền cọc giữ phòng', type: 'text', placeholder: '', unit: 'đ' },
  { id: 7, title: 'Số tiền cọc bổ sung', type: 'text', placeholder: '', unit: 'đ' },
  { id: 8, title: 'Hạn thanh toán tiền cọc', type: 'date', placeholder: '' },
  { id: 9, title: 'Ngày bắt đầu thuê', type: 'date', placeholder: '' },
  { id: 10, title: 'Số lượng người ở', type: 'text', placeholder: '' },
  { id: 11, title: 'Số lượng xe', type: 'text', placeholder: '' },
  { id: 12, title: 'Chương trình ưu đãi', type: 'text', placeholder: '' }
];

const InfoRoom = () => {
  return (
    <div className="w-[556px] h-fit px-6 py-5 flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium font-['Inter'] leading-7">
        Thông tin căn hộ
      </div>
      {muiltyRow.map(row => (
        <RowComponent key={row.id} title={row.title} type={row.type} placeholder={row.placeholder} unit={row.unit} />
      ))}
    </div>
  );
};

export default InfoRoom;
