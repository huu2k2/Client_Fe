import React, { useEffect, useState } from "react";
import RowComponent from "./RowCompoment";
import CCCD from "./CCCD";
import { usePostCCCDMutation } from "../../../../apis/slice/ImageOfRoom";
import { parse, format } from "date-fns";
import { useIsLoading } from "@customhooks";
import { useSetInfo, useSetIsSidebarOpen } from "../../../../customHooks";
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
const convertDate = (dateString) => {
  // Chuyển đổi từ "dd/MM/yyyy" sang đối tượng Date
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  // Định dạng lại từ đối tượng Date sang "yyyy-MM-dd"
  return format(parsedDate, "yyyy-MM-dd");
};
const InfoClient = ({ register, setValue ,getValues}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useSetIsSidebarOpen();
  const [getInfo, setInfo]= useSetInfo()
  const [_, setIsLoading] = useIsLoading()
  const [getCCCD, setCCCD] = useState({ mt: "", ms: "" });
  const [postCCCD] = usePostCCCDMutation();
  const [InfoCCCD, getInfoCCCD] = useState({
    fullName: "",
    birthOfDay: "",
    identification: "",
    dateRange: "",
    issuedBy: "",
    permanentAddress: "",
  });
  useEffect(() => {
    async function GetInfoFromCCCD() {
      try {
        if (getCCCD.mt !== "" && getCCCD.ms !== "") {
          setIsLoading(true);
          const kq = await postCCCD({
            iD_Front: getCCCD.mt,
            iD_Back: getCCCD.ms,
          }).unwrap();

          getInfoCCCD({
            fullName: kq.result.name,
            birthOfDay: convertDate(kq.result.dob),
            identification: kq.result.id,
            dateRange: convertDate(kq.result.issue_date),
            issuedBy: kq.result.issue_loc,
            permanentAddress: kq?.result?.address,
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
       
    }
    GetInfoFromCCCD();
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
          InfoCCCD={InfoCCCD}
          getValues={getValues}
        />
      ))}
      {muiltyRowCCCD.map((i, index) => (
        <CCCD
          title={i.title}
          title2={i.title2}
          key={index}
          id={i.id}
          setCCCD={setCCCD}
          setValue={setValue}
        />
      ))}
    </div>
  );
};

export default InfoClient;
