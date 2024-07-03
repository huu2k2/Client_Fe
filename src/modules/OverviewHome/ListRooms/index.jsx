import React, { useEffect, useState } from "react";
import Body from "./Body";
import GroupCheckbox from "./GroupCheckbox";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetHolder } from "../../../customHooks/ServicesCustomHook";
import { useGetRoomsFilterMutation } from "@apis/slice/rooms";
import { useParams } from "react-router-dom";
import { useGetAllDetailQuery } from "@apis/slice/services";
const index = () => {
  const {idHome} =useParams()
  const [holder,rooms] = useGetHolder()
 const [query,setQuery] = useState(null)
 const { data:dataRoom } = useGetAllDetailQuery(localStorage.getItem('idroom'));
 const [getRoomsFilter, { data,isLoading }] = useGetRoomsFilterMutation();
 useEffect(()=>{
    async function rs(){
        await getRoomsFilter({houseId:idHome,status:query?.length>0?query:null})
    }
    rs()
 },[query,idHome])

  return (
    <div className="w-full h-fit bg-black flex-col justify-center items-center  flex  ">
      <div className="h-px flex-col justify-start items-start flex">
        <div className="self-stretch h-px bg-zinc-700" />
      </div>

      <div className="self-stretch w-ful h-40 py-10 shadow flex-col justify-center items-start gap-6 flex">
        <div className="self-stretch w-full px-[280px] justify-between items-center  flex">
          <div className="flex flex-col gap-6 w-full  ">
            <div className="text-white text-3xl font-bold  leading-9">
              Danh sách phòng trống
            </div>
            <GroupCheckbox setQuery={setQuery} query={query} rooms={dataRoom?.response}/>
          </div>

          <div className="w-80 h-fit px-4 py-3 bg-neutral-50 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
            <div className="  justify-between items-center w-full flex">
              <div className="justify-center items-start gap-2 inline-flex">
                <img
                  className="w-11 h-11 rounded-full"
                  src="https://via.placeholder.com/44x44"
                />
                <div className="flex-col justify-start items-start gap-1 inline-flex">
                  <div className="text-black text-base font-medium  leading-normal">
                    {dataRoom?.response?.holder?.fullName}
                  </div>
                  <div className="text-zinc-500 text-xs font-normal  leading-none ">
                    Chủ nhà
                  </div>
                </div>
              </div>
              <div className="w-6 h-6 relative">
                <div className="w-6 h-6 left-0 top-0 absolute bg-rose-600 rounded-full flex justify-center items-center">
                  <AiOutlineArrowRight className="text-white"/>
                </div>
                <div className="w-4 h-4 left-[4px] top-[4px] absolute justify-center items-center inline-flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
              </div>
            </div>

            <div className="justify-center items-center gap-2 inline-flex">
              <div className="px-2 flex-col justify-start items-start inline-flex">
                <div className="w-[120px] text-zinc-500 text-xs font-normal  leading-none">
                  Phòng sắp trống
                </div>
                <div className="text-black text-base font-medium  leading-normal">
                {dataRoom?.response?.roomToBeEmpty}
                </div>
              </div>
              <div className="px-2 flex-col justify-start items-start inline-flex">
                <div className="w-[120px] text-zinc-500 text-xs font-normal  leading-none">
                  Phòng trống
                </div>
                <div className="text-black text-base font-medium  leading-normal">
                 {dataRoom?.response?.emptyRoom}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <Body data={data} isLoading={isLoading} />
    </div>
  );
};

export default index;
