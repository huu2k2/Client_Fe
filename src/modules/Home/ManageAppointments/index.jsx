import React, { useState } from "react";
import Header from "./Header";
import Tiltle from "./Tiltle";
import BodyTable from "./BodyTable";
import SideBar from "./SideBar";
import ModalChangeRoom from "./ModalChangeRoom";
import { useSetInfo } from "../../../customHooks";
import { Helmet } from "react-helmet";

const index = () => {
  const [isShow, setIsShow] = useState(false);
  const [getInfo, _] = useSetInfo();

  return (
    <div className="gap-4 flex flex-col items-start justify-center lg:justify-start px-10 lg:px-0 w-full lg:w-[1360px]">
      <Helmet>
        <title>Danh sách đặt cọc</title>
        <meta name="description" content="Danh sách đặt cọc" />
      </Helmet>
      <Header />
      <Tiltle />
      <BodyTable setIsShow={setIsShow} isShow={isShow} />
      <SideBar />
      <ModalChangeRoom
        houseId={getInfo.houseId}
        roomCode={getInfo.roomId}
        scheduleId={getInfo.scheduleId}
      />
    </div>
  );
};

export default index;
