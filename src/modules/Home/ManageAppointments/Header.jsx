import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
const Header = () => {
  return (
    <div className="w-full lg:w-[1360px] h-11 py-3 justify-start items-center inline-flex ">
      <div className="w-full rounded-md justify-start items-center gap-4 flex flex-wrap">

        <AiFillHome className="w-5 h-5 text-gray-400"/>
        <BsChevronRight />
        <div className="justify-center items-center flex">
          <div className="text-gray-500 text-sm font-medium leading-tight">
            Quản lý lịch hẹn
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
