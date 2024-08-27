import React from "react";
import ImageSpeaker from "@assets/Speakerphone.svg";
import Floor from "./Floor";
import CustomLoading from "../../../components/CustomLoading";
import { format } from "date-fns";

const Body = ({ data, isLoading, dataNameHome }) => {
  return (
    <>
      <div className="w-full h-fit  relative flex flex-col justify-center items-center mt-5  ">
        <div className="w-full h-32 left-0 top-0 absolute bg-black" />
        <div className="w-full lg:w-[1360px] h-fit pb-6 top-0 absolute bg-white rounded-lg shadow flex-col justify-start items-center gap-4 inline-flex">
          <div className="self-stretch w-full h-16 bg-rose-800 flex-col justify-start items-center flex rounded-t-md">
            <div className="w-full lg:w-[1280px] py-3 justify-start items-start inline-flex">
              <div className="grow shrink basis-0 h-10 justify-start items-center flex">
                <div className="justify-start items-center gap-3 flex px-10 lg:px-0 ">
                  <div className="p-2 bg-rose-950 rounded-lg justify-center items-center flex">
                    <img src={ImageSpeaker} alt="spearker" />
                  </div>
                  <div className="text-white text-base font-medium leading-normal">
                    Chương trình sale áp dụng từ ngày {dataNameHome?.saleStartDate ? format(new Date(dataNameHome?.saleStartDate), 'dd/MM/yyyy') : "hôm nay"} - {dataNameHome?.saleEndDate && format(new Date(dataNameHome?.saleEndDate), 'dd/MM/yyyy')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-fit w-full px-8 flex-col justify-start items-center flex min-h-6 mb-20">
            {isLoading ? <CustomLoading /> : <Floor data={data} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
