import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header";
import Profile from "../Profile/index";
import { useEffect, useState } from "react";
import Footer from '../../components/Footer'
const Index = () => {
  if (
    !sessionStorage.getItem("token") ||
    sessionStorage.getItem("token")?.split(".").length !== 3
  ) {
    window.location.href = "/login";
  }
  const [isShow, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <p>
      <div className="  w-full h-fit custom-scrollbar">
        {isShow && <Profile setShow={setShow} />}
        <div className="w-full h-fit flex flex-col items-center justify-start  ">
          <Header setShow={setShow} isShow={isShow} />
          <Outlet/>
          <Footer/>
        </div>
      </div>
    </p>
  );
};

export default Index;
