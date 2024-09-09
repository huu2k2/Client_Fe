import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header";
import Profile from "../Profile/index";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { useSocket } from "../../customHooks/SocketContext";
import { decodeToken } from "../../utils/GetIdAuth";
const Index = () => {
  const socket = useSocket();
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
  useEffect(()=>{
    socket.emit('register',decodeToken(sessionStorage.getItem('token')).Id)
    return ()=>{
      socket.off("register")
    }
  },[socket])
  return (
    <p>
      <div className="  w-full h-fit custom-scrollbar">
        <Helmet>
          <title>Trang chủ</title>
          <meta name="description" content="Trang chủ" />
          <meta property="og:title" content={`Trang chủ`} />
          <meta
            property="og:description"
            content="Phòng trọ giá rẻ tại Aloper"
          />
          <meta property="og:image" content={"http://aloper.fun/logo192.png"} />
          <meta property="og:url" content={`http://aloper.fun:82`} />
          <meta property="og:type" content="website" />
        </Helmet>
        {isShow && <Profile setShow={setShow} />}
        <div className="w-full h-fit flex flex-col items-center justify-start  ">
          <Header setShow={setShow} isShow={isShow} />
          <Outlet />
          <Footer />
        </div>
      </div>
    </p>
  );
};

export default Index;
