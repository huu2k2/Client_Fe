import React, { useEffect, useState } from "react";
import RowComponent from "./RowCompoment";
import SelectTips from "./SelectTips";
import Signature from "@components/BaseInput/Signature";
import {useSetInfo, useSetIsSidebarOpen } from "../../../../customHooks";

const muiltyRow = [
  {
    id: 1,
    title: "Địa chỉ toà nhà",
    type: "text",
    placeholder: "",
    name: "houseAddress",
  },
  { id: 2, title: "Mã phòng", type: "text", placeholder: "", name: "roomId" },
  {
    id: 3,
    title: "Giá cho thuê",
    title1: "(Chưa bao gồm nội thất)",
    type: "text",
    placeholder: "",
    unit: "đ",
    name: "rentalPrice",
  },
  // {
  //   id: 4,
  //   title: "Giá cho thuê",
  //   title1: "(Bao gồm nội thất)",
  //   type: "text",
  //   placeholder: "",
  //   unit: "đ",
  //   name: "totalReduce",
  // },
  // { id: 5, title: 'Đặt cọc', type: 'text', placeholder: '' ,unit: 'Tháng' ,name:'datcoc'},
];
const muiltyRow1 = [
  {
    id: 5,
    title: "Thời hạn hợp đồng",
    type: "text",
    placeholder: "",
    unit: "Tháng",
    name: "rentalTerm",
  },
  {
    id: 7,
    title: "Ngày đặt cọc",
    type: "date",
    placeholder: "",
    name: "depositDate",
  },
  {
    id: 6,
    title: "Số tiền cọc giữ phòng",
    type: "text",
    placeholder: "",
    unit: "%",
    name: "totalDepositAmount",
  },

  {
    id: 8,
    title: "Số tiền cọc trước",
    type: "text",
    placeholder: "",
    unit: "đ",
    name: "depositAmount",
  },
  {
    id: 9,
    title: "Số tiền cọc bổ sung",
    type: "text",
    placeholder: "",
    unit: "đ",
    name: "additionalDepositAmount",
  },
  {
    id: 10,
    title: "Hạn thanh toán tiền cọc",
    type: "date",
    placeholder: "",
    name: "depositPaymentDeadline",
  },
  {
    id: 11,
    title: "Ngày bắt đầu thuê",
    type: "date",
    placeholder: "",
    name: "rentalStartDate",
  },
  {
    id: 12,
    title: "Số lượng người ở",
    type: "text",
    placeholder: "",
    name: "numberOfPeople",
  },
  {
    id: 13,
    title: "Số lượng xe",
    type: "text",
    placeholder: "",
    name: "numberOfVehicle",
  },
  // {
  //   id: 14,
  //   title: "Chương trình ưu đãi",
  //   type: "text",
  //   placeholder: "",
  //   name: "chuongTrinhUuDai",
  // },
];
const InfoRoom = ({ register, setValue, getValues }) => {
  const [getInfo, setInfo] =useSetInfo()
 
  const [isSidebarOpen, _] = useSetIsSidebarOpen();
  const handleFileChange = (name, file) => {
    setValue(name, file.split(",")[1]);
  };
  useEffect(() => {
    if (!isSidebarOpen) {
      setValue("signature", "");
    }
  }, [isSidebarOpen]);

  return (
    <div className="w-[501px]  h-fit pl-2 py-5 flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Thông tin căn hộ
      </div>

      {muiltyRow.map((row) => (
        <RowComponent
          setValue={setValue}
          register={register}
          name={row.name}
          key={row.id}
          title={row.title}
          type={row.type}
          placeholder={row.placeholder}
          unit={row.unit}
          getValues={getValues}
          title1={row.title1}
          
           
        />
      ))}
      <SelectTips setValue={setValue} />
      {muiltyRow1.map((row) => (
        <RowComponent
          setValue={setValue}
          register={register}
          name={row.name}
          key={row.id}
          title={row.title}
          type={row.type}
          placeholder={row.placeholder}
          unit={row.unit}
          getValues={getValues}
         
           
        />
      ))}
      <Signature
        name={"Chữ ký"}
        img={null}
        onChange={(file) => handleFileChange("signature", file)}
      />
    </div>
  );
};

export default InfoRoom;
