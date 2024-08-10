import React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const formatDateToVietnamese = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy", { locale: vi });
};

const Cart = ({ data }) => {
  // Define the background color based on status
  const getStatusBgColor = (status) => {
    switch (status) {
      case "0":
        return "bg-emerald-800";
      case "1":
        return "bg-amber-700";
      case "2":
        return "bg-rose-800";
      default:
        return " bg-amber-100";
    }
  };

  // Define the status text based on status
  const getStatusText = (status, i) => {
    switch (status) {
      case "0":
        return "Đang trống";
      case "1":
        return `Phòng sắp trống ${formatDateToVietnamese(i)}`;
      case "2":
        return `Đã đặt cọc ${formatDateToVietnamese(i)}`;
      default:
        return "Đã cho thuê";
    }
  };
  const getText = (status) => {
    switch (status) {
      case "0":
        return "text-white";
      case "1":
        return `text-white`;
      case "2":
        return `text-white`;
      default:
        return "text-amber-700";
    }
  };

  return (
    <div className="flex-col justify-start items-start inline-flex">
      <div
        className={`w-[200px] px-5 py-2 ${getStatusBgColor(
          data?.status
        )} rounded-tl-lg rounded-tr-lg shadow flex justify-center items-center gap-2`}
      >
        <div className={`text-center ${getText(data?.status)} text-lg font-medium leading-normal`}>
          P.{data?.roomCode || "000"}
        </div>
      </div>
      <img
        className="w-[200px] h-24 object-cover"
        src={data?.image || "https://via.placeholder.com/200x96"}
        alt={`Room ${data?.roomCode}`}
      />
      <div className="h-9 w-full py-2 bg-gray-50 shadow flex justify-center items-center">
        <div
          className={`${getText(
            data?.status
          )} text-sm font-normal leading-tight`}
        >
          {getStatusText(data?.status, data?.contractEndDate)}
        </div>
      </div>
      <div className="h-9 w-full py-2 bg-white rounded-bl-lg rounded-br-lg shadow flex justify-center items-center">
        <div className="text-gray-800 text-base font-bold leading-tight">
          {new Intl.NumberFormat("vi-VN").format(data.price)} đ
        </div>
      </div>
    </div>
  );
};

export default Cart;
