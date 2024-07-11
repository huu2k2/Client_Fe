import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import InfoClient from "./InfoClient";
import InfoRoom from "./InfoRoom";
import Surcharges from "./surcharges"
import Furniture from "./Furniture";
import ButtonDeposit from "./ButtonDeposit";
const SideBar = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-fit overflow-y-auto custom-scrollbar">
          {/* header */}
          <div className="w-full h-[100px] p-6 bg-black flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-white text-lg font-medium leading-7">
                Lên hợp đồng cọc giữ chỗ
              </div>
              <div className="bg-zinc-600 rounded-md justify-center items-center flex">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                >
                  {" "}
                  <AiFillCloseSquare className="w-6 h-6 text-white " />
                </label>
              </div>
            </div>
            <div className="self-stretch text-zinc-400 text-sm font-normal leading-tight">
              Vui lòng nhập các thông tin dưới đây để lên hợp đồng.
            </div>
          </div>
          {/* header */}
          <InfoClient />
          <InfoRoom />
          <Surcharges/>
          <Furniture/>
          <hr className="bg-gray-700 w-full h-[1px] "/>
          <ButtonDeposit/>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
