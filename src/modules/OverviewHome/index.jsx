import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
const index = () => {
  return (
    <div className="w-full h-fit bg-black">
      <Helmet>
        <title>Tổng quan nhà trọ</title>
        <meta name="description" content="Tổng quan nhà trọ" />
      </Helmet>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default index;
