import React, { useState } from "react";
import RowComponent from "./RowCompoment";
import SelectTips from "./SelectTips";
import Signature from "@components/BaseInput/Signature";
const muiltyRow = [
  {
    id: 1,
    title: "Địa chỉ toà nhà",
    type: "text",
    placeholder: "",
    name: "houseAddress",
  },
  { id: 2, title: "Mã phòng", type: "text", placeholder: "", name: "roomCode" },
  {
    id: 3,
    title: "Giá cho thuê",
    type: "text",
    placeholder: "",
    unit: "đ",
    name: "rentalPrice",
    title1:"(Chưa bao gồm nội thất)"
  },
  {
    id: 4,
    title: "Thời hạn hợp đồng",
    type: "text",
    placeholder: "",
    unit: "Tháng",
    name: "rentalTerm",
  },
  // { id: 5, title: 'Đặt cọc', type: 'text', placeholder: '' ,unit: 'Tháng' ,name:'datcoc'},
];
const muiltyRow1 = [

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
  {
    id: 14,
    title: "Chương trình ưu đãi",
    type: "text",
    placeholder: "",
    name: "chuongTrinhUuDai",
  },
];
const InfoRoom = ({ register, getInfo, setValue, isSidebarOpen ,getValues,getData}) => {
  const [getNamecommissionPolicyId,setNamecommissionPolicyId] = useState('')

  return (
    <div className="w-[501px]  h-fit pl-4 py-5 flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Thông tin căn hộ
      </div>
      {muiltyRow.map((row) => (
        <RowComponent
          getInfo={getInfo}
          setValue={setValue}
          isSidebarOpen={isSidebarOpen}
          register={register}
          name={row.name}
          key={row.id}
          title={row.title}
          type={row.type}
          placeholder={row.placeholder}
          unit={row.unit}
          getValues={getValues}
          getData={getData}
          title1={row.title1||""}
        />
      ))}
      <SelectTips getInfo={getInfo} setValue={setValue} getValues={getValues} setNamecommissionPolicyId={setNamecommissionPolicyId}/>
      {muiltyRow1.map((row) => (
        <RowComponent
          getInfo={getInfo}
          setValue={setValue}
          isSidebarOpen={isSidebarOpen}
          register={register}
          name={row.name}
          key={row.id}
          title={row.title}
          type={row.type}
          placeholder={row.placeholder}
          unit={row.unit}
          getNamecommissionPolicyId={getNamecommissionPolicyId}
          getValues={getValues}
          getData={getData}
          
        />
      ))}
     {/* <Signature
        name={"Chữ ký"}
        img={getValues('signatureUrl')}
        onChange={(file) => handleFileChange("signatureUrl", file)}
        type="hide"
      /> */}
    </div>
  );
};

export default InfoRoom;
