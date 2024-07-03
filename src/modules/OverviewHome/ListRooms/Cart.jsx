import React from 'react';

const Cart = ({ data }) => {
  // Define the background color based on status
  const getStatusBgColor = (status) => {
    switch (status) {
      case '0':
        return 'bg-emerald-800';
      case '1':
        return 'bg-amber-700';
      default:
        return 'bg-rose-800';
    }
  };

  // Define the status text based on status
  const getStatusText = (status) => {
    switch (status) {
      case '0':
        return 'Đang trống';
      case '1':
        return 'Đã cho thuê';
      default:
        return 'Đã đặt cọc';
    }
  };

  return (
    <div className="flex-col justify-start items-start inline-flex">
      <div
        className={`w-[200px] px-5 py-2 ${getStatusBgColor(data?.status)} rounded-tl-lg rounded-tr-lg shadow flex justify-center items-center gap-2`}
      >
        <div className="text-center text-white text-lg font-medium leading-normal">
          A.{data?.roomCode || '000'}
        </div>
      </div>
      <img
        className="w-[200px] h-24 object-cover"
        src={data?.image || "https://via.placeholder.com/200x96"}
        alt={`Room ${data?.roomCode}`}
      />
      <div className="h-9 w-full py-2 bg-gray-50 shadow flex justify-center items-center">
        <div className="text-emerald-800 text-sm font-normal leading-tight">
          {getStatusText(data?.status)}
        </div>
      </div>
      <div className="h-9 w-full py-2 bg-white rounded-bl-lg rounded-br-lg shadow flex justify-center items-center">
        <div className="text-gray-800 text-base font-bold leading-tight">
          {new Intl.NumberFormat("vi-VN").format(data.rentPrice)} đ
        </div>
      </div>
    </div>
  );
};

export default Cart;
