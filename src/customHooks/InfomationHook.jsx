import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetInformationsQuery } from "../apis/slice/Infomation";

const Data = [
  {
    type: "HUY",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
  {
    type: "HETHAN",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
  {
    type: "COCMOI",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
  {
    type: "THUEMOI",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
  {
    type: "HUY",
    roomcode: "101",
    address: "địa chỉ",
    time: "thoi gian",
  },
];
// Tạo AuthContext
export const InfoContext = createContext();

const InfomationHook = ({ children }) => {
  // const { data, error, isLoading } = useGetInformationsQuery();
  // console.log("data", data);
  const [dataInfo, setDataInfo] = useState(Data || []);
  const [countInfo, setCountInfo] = useState(0);

  // callapi get info to time
  return (
    <InfoContext.Provider
      value={{ dataInfo, setDataInfo, countInfo, setCountInfo }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export default InfomationHook;
export const useInfoOfNotification = () => {
  const { dataInfo, setDataInfo, countInfo, setCountInfo } =
    useContext(InfoContext);
  return [dataInfo, setDataInfo, countInfo, setCountInfo];
};
