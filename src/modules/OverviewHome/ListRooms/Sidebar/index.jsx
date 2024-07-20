import React from "react";
import ItemHome from "./ItemHome";
import { useGetAllHousesQuery } from "@apis/slice/Houses";
 

const Sidebar = ({idHolder}) => {
  const {data:dataListHome} = useGetAllHousesQuery(idHolder)
 
  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-Overview"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-Overview"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="  min-h-screen h-fit bg-white   px-[13px] py-[9px]">
          <div className="w-full h-[100px] p-6 bg-black flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-white text-xl font-medium leading-7">
                Danh Sách Tòa Nhà Của {dataListHome?.response?.fullName} 
              </div>
             
              <div className="bg-zinc-600 rounded-md justify-center items-center flex">
                <label
                  htmlFor="my-drawer-5"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
              </div>
            </div>
             
          </div>

          <div className="divider mt-1"></div>
          {dataListHome?.response?.listHouses?.map((i,index)=>(

          <ItemHome key={index} item={i}/>
          ))}
           
          <div className="w-[556px] h-[78px] px-6 py-5 flex flex-col justify-start items-start">
 
            <label
              htmlFor="my-drawer-Overview"
              aria-label="close sidebar"
              className="drawer-overlay text-gray-700 text-sm font-medium  leading-tight  cursor-pointer
          h-[38px] px-[17px] py-[9px] bg-white rounded-md shadow border border-gray-300 "
            >
              Hủy
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
