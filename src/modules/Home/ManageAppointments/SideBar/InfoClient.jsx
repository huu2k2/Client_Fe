import React, { useEffect, useState } from "react";
import RowComponent from "./RowCompoment";
import CCCD from "./CCCD";
import { usePostCCCDMutation } from "../../../../apis/slice/ImageOfRoom";
 

const muiltyRow = [
  {
    id: 1,
    title: "Họ và tên",
    type: "text",
    placeholder: "Nguyễn Văn A",
    name: "fullName",
  },
  {
    id: 2,
    title: "Số điện thoại",
    type: "text",
    placeholder: "",
    name: "phoneNumber",
  },
  {
    id: 3,
    title: "Ngày sinh",
    type: "date",
    placeholder: "",
    name: "birthOfDay",
  },
  {
    id: 4,
    title: "CCCD/CMND",
    type: "text",
    placeholder: "",
    name: "identification",
  },
  {
    id: 5,
    title: "Ngày cấp",
    type: "date",
    placeholder: "",
    name: "dateRange",
  },
  { id: 6, title: "Nơi cấp", type: "text", placeholder: "", name: "issuedBy" },
  {
    id: 7,
    title: "Địa chỉ thường trú",
    type: "text",
    placeholder: "",
    name: "permanentAddress",
  },
];
const muiltyRowCCCD = [
  { id: 1, title: "CCCD/CMND ", title2: "(Mặt trước)", name: "CCCDBefore" },
  { id: 2, title: "CCCD/CMND ", title2: "(Mặt sau)", name: "CCCDAfter" },
];
const InfoClient = ({ register, getInfo, setValue, isSidebarOpen }) => {
  const [getCCCD, setCCCD] = useState({ mt: "", ms: "" });
  const [postCCCD] = usePostCCCDMutation();
  useEffect(() => {
    async function GetInfoFromCCCD() {
      try {
        if (getCCCD.mt !== "" && getCCCD.ms !== "") {
          const kq = await postCCCD({iD_Front:getCCCD.mt,iD_Back:getCCCD.ms}).unwrap()
          console.log("kq.....",kq)
        }
      } catch (error) {
        console.log(error)
      }
      
    }
    GetInfoFromCCCD()
  }, [getCCCD]);
  return (
    <div className="w-fit h-fit  flex-col justify-start items-start gap-5 inline-flex  pl-2 py-5">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Thông tin khách hàng
      </div>
      {muiltyRow.map((row) => (
        <RowComponent
          register={register}
          getInfo={getInfo}
          isSidebarOpen={isSidebarOpen}
          setValue={setValue}
          name={row.name}
          key={row.id}
          title={row.title}
          type={row.type}
          placeholder={row.placeholder}
          unit={row.unit}
        />
      ))}
      {muiltyRowCCCD.map((i, index) => (
        <CCCD
          title={i.title}
          title2={i.title2}
          key={index}
          id={i.id}
          setCCCD={setCCCD}
        />
      ))}
    </div>
  );
};

export default InfoClient;
