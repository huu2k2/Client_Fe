import React from "react";
import { AiFillFileAdd, AiFillFileExcel, AiFillFileExclamation } from "react-icons/ai";

// Component chính nhận props "item"
const Index = ({ item }) => {
  switch (item.type) {
    case "HUY":
      return (
        <Item
          type={"HUY"}
          roomcode={item?.roomcode}
          address={item?.address}
          time={item?.time}
          title={"Hợp đồng cọc bị hủy"}
          ICON={AiFillFileExcel}
          color={"#E11D48"}
        />
      );

    case "HETHAN":
      return (
        <Item
          type={"HETHAN"}
          roomcode={item?.roomcode}
          address={item?.address}
          time={item?.time}
          title={"Hợp đồng thuê sắp hết hạn"}
          ICON={AiFillFileExclamation}
          color={"#d97706"}
        />
      );

    case "COCMOI":
      return (
        <Item
          type={"COCMOI"}
          roomcode={item?.roomcode}
          address={item?.address}
          time={item?.time}
          title={"Hợp đồng cọc mới"}
          ICON={AiFillFileAdd}
          color={"#E11D48"}
        />
      );

    case "THUEMOI":
      return (
        <Item
          type={"THUEMOI"}
          roomcode={item?.roomcode}
          address={item?.address}
          time={item?.time}
          title={"Hợp đồng thuê mới"}
          ICON={AiFillFileAdd}
          color={"#226932"}
        />
      );

    default:
      return (
        <Item
          type={"HUY"}
          roomcode={item?.roomcode}
          address={item?.address}
          time={item?.time}
          title={"Hợp đồng cọc bị hủy"}
          ICON={AiFillFileExcel}
          color={"#E11D48"}
        />
      );
  }
};

// Component ITEM nhận các props tương ứng
const Item = ({ roomcode, address, time, title, ICON, color }) => {
  return (
    <div className=" mt-3 card text-[20px] bg-base-200 rounded-box p-3 w-full">
      <div className="flex items-center gap-2">
        <ICON
          style={{
            color: color,
            fontSize: "35px",
          }}
        />
        <div className="w-full">
          <div className="flex gap-1">
            <p>{title}: </p>
            <p className="text-rose-600 font-bold">P.{roomcode}</p>
          </div>
          <div className="flex justify-between items-end text-[14px] text-gray-500 w-full">
            <span className="w-[50%]">ĐC: {address}</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
