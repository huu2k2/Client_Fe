import React, { useState } from "react";
import Header from "./Header";
import Tiltle from "./Tiltle";
import BodyTable from "./BodyTable";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const index = () => {
  const [isShow, setIsShow] = useState(false);
  const [getInfo, setInfo] = useState({
    roomId: 0,
    houseAddress: "",
    rentalPrice: 0,
    roomCode: null,
    houseId: 0,
    scheduleId: 0,
    depositId :null,
  });
 
  return (
    <div className="gap-4 flex flex-col items-start">
      <ToastContainer />
      <Header />
      <Tiltle />
      <BodyTable setIsShow={setIsShow} isShow={isShow} setInfo={setInfo} />
      <SideBar getInfo={getInfo} />
    </div>
  );
};

export default index;
