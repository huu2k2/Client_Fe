import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header";
import Profile from "../Profile/index";
import { useEffect, useState } from "react";
 

const Index = () => {
  const [isShow, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return (
    <p>
      <div className="  w-full h-fit custom-scrollbar">
        {isShow && <Profile setShow={setShow} />}
        <div className="w-full h-fit flex flex-col items-center justify-start  ">
          <Header setShow={setShow} isShow={isShow} />
          <Outlet />
         
        
        </div>
      </div>
    </p>
  );
};

export default Index;
