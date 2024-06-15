import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Profile from "../Profile";
import { useEffect, useState } from "react";
 
const index = () => {
  const [isShow, setShow] = useState(false);

  return ( 
    <div className="  w-full h-fit ">
      {isShow && <Profile setShow={setShow} /> }
      <div className="w-full h-fit flex flex-col items-center justify-start  ">
        <Header setShow={setShow} isShow={isShow} />
        <Outlet />
      </div>
    </div>
  );
};

export default index;
