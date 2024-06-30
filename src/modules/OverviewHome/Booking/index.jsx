import React from "react";
import GroupInput from "./GroupInput";
import { useGetInfoItem } from "@customhooks/ServicesCustomHook";

const index = () => {
  const [address, price] = useGetInfoItem();
  return (
    <>
      <div className="w-full h-[116px] py-10 shadow justify-center items-center inline-flex bg-black">
        <div className="grow shrink basis-0 h-9 px-[280px] justify-start items-start flex">
          <div className="text-white text-3xl font-bold leading-9">
            Đặt lịch dẫn khách
          </div>
        </div>
      </div>

      <div className="w-full h-[778px] flex-col justify-start items-center inline-flex">
        <div className="w-full h-[778px] relative">
          <div className="w-full h-32 left-0 top-0 absolute bg-black" />
          <div className="h-[728px] px-10 py-6 left-[280px] top-0 absolute bg-white rounded-lg shadow flex-col justify-start items-center gap-6 inline-flex">
            <div className="self-stretch h-[680px] flex-col justify-start items-start gap-8 flex">
              <div className="self-stretch h-[589px] flex-col justify-start items-start gap-10 flex">
                <div className="self-stretch h-[589px] flex-col justify-start items-start gap-5 flex">
                  <div className="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch text-gray-900 text-lg font-medium leading-normal">
                      Nhà trọ {address}
                    </div>
                    <div className="self-stretch text-gray-500 text-sm font-normal leading-tight">
                      {address}
                    </div>
                  </div>

                  <div className="self-stretch h-[521px] flex-col justify-start items-start gap-5 flex">
                    <GroupInput />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[59px] flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch h-px flex-col justify-start items-start flex">
                  <div className="self-stretch h-px bg-gray-200" />
                </div>
                <div className="self-stretch justify-end items-center gap-3 inline-flex">
                  <button className="px-[17px] py-[9px] bg-rose-600 rounded-md shadow justify-center items-center flex">
                    <div className="text-white text-sm font-medium leading-tight">
                      Đặt lịch
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
