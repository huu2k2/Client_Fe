import React, { useState } from "react";
import Header from "./Header";
import Tiltle from "./Tiltle";
import BodyTable from "./BodyTable";
import SideBar from "./SideBar";
import { Helmet } from "react-helmet";

const index = () => {
  const [isShow, setIsShow] = useState(false);
  const [getInfo, setInfo] = useState({
    roomId: 0,
    houseAddress: "",
    rentalPrice: 0,
    roomCode: null,
    houseId: 0,
    scheduleId: 0,
    depositId: null,
    status: "2",
  });

  return (
    <div className="gap-4 flex flex-col items-start justify-center lg:justify-start px-10 lg:px-0 w-full lg:w-[1360px]">
      <Helmet>
        <title>Danh sách hợp đồng</title>
        <meta name="description" content="Danh sách hợp đồng" />
      </Helmet>
      <Header />
      <Tiltle />
      <BodyTable setIsShow={setIsShow} isShow={isShow} setInfo={setInfo} />
      <SideBar getInfo={getInfo} />
    </div>
  );
};

export default index;
