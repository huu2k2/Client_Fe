import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Profile from "../Profile/index";
import { useState } from "react";
import SideBar from "./ManageAppointments/SideBar";

const Index = () => {
  const [isShow, setShow] = useState(false);

  return (
    <p>
      <div className="  w-full h-fit custom-scrollbar">
        {isShow && <Profile setShow={setShow} />}
        <div className="w-full h-fit flex flex-col items-center justify-start  ">
          <Header setShow={setShow} isShow={isShow} />
          <Outlet />
         
          <SideBar/>
        </div>
      </div>
    </p>
  );
};

export default Index;
