import React, { useState } from "react";
import Header from "./Header";
import Tiltle from "./Tiltle";
import BodyTable from "./BodyTable";
import SideBar from "./SideBar";
import ModalChangeRoom from "./ModalChangeRoom";

const index = () => {
  const [isShow, setIsShow] = useState(false);
  const [getInfo, setInfo] = useState({
    roomId: 0,
    houseAddress: "",
    rentalPrice: 0,
    roomCode: "101",
    houseId: 0,
    scheduleId: 0,
    fullName: "",
    phoneNumber: "",
    id:0
  });

  return (
    <div className="gap-4 flex flex-col items-start">
      <Header />
      <Tiltle />
      <BodyTable setIsShow={setIsShow} isShow={isShow} setInfo={setInfo} />
      <SideBar getInfo={getInfo} />
      <ModalChangeRoom
        houseId={getInfo.houseId}
        roomCode={getInfo.roomId}
        scheduleId={getInfo.scheduleId}
      />
    </div>
  );
};

export default index;
