import React from "react";
import { BsArrowRight, BsChevronDown } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
 
import Pagination from "./Pagination";
const BodyTable = () => {
  return (
    <div className="max-w-[1360px] mx-auto flex-col justify-start items-start gap-4 inline-flex">
      <div className="flex justify-start items-start gap-4">
        <div className="pl-[17px] pr-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 flex items-center gap-2">
          <div className="text-gray-700 text-sm font-medium leading-tight">
            Hôm nay
          </div>
          <BsChevronDown className="text-gray-700 font-bold leading-tight" />
        </div>
        <div className="flex">
          <div className="h-[38px] px-4 py-[9px] bg-blue-50 rounded-tl-md rounded-bl-md flex items-center gap-3">
            <div className="w-5 h-5 relative"></div>
            <div className="text-blue-800 text-sm font-normal leading-tight">
              Tổng số lịch hẹn từ 23/04/2024 - 23/05/2024
            </div>
          </div>
          <div className="h-[38px] px-4 py-[9px] bg-blue-800 rounded-tr-md rounded-br-md flex items-center">
            <div className="text-white text-sm font-normal leading-tight">
              16
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="w-[1360px] h-[879px] flex-col justify-start items-start gap-4 inline-flex">
        <div className="w-full self-stretch h-[825px] flex-col justify-start items-start gap-4 flex">
          <div className="w-full bg-white rounded-lg shadow border border-gray-200">
            <table className="w-full table-auto min-h-[500px]">
              <thead>
                <tr className="flex items-center">
                  <th className="w-16 h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      STT
                    </span>
                  </th>
                  <th className="w-[336px] h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Khách hàng
                    </span>
                  </th>
                  <th className="w-[284px] h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Địa chỉ toà nhà
                    </span>
                  </th>
                  <th className="w-[120px] h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Mã phòng
                    </span>
                  </th>
                  <th className="w-[152px] h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Giá thuê (VNĐ)
                    </span>
                  </th>
                  <th className="w-[196px] h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Ngày giờ xem
                    </span>
                  </th>
                  <th className="w-36 h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Mã lịch hẹn
                    </span>
                  </th>
                  <th className="w-16 h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex">
                    <AiOutlineMore />
                  </th>
                </tr>
              </thead>
              <tbody  >
                <tr className="flex">
                  <td className="w-16 h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      10
                    </span>
                  </td>
                  <td className="w-[336px] h-[72px] px-6 py-4 justify-start items-center gap-4 inline-flex">
                    <img
                      className="w-10 h-10 rounded-[20px]"
                      src="https://via.placeholder.com/40x40"
                    />
                    <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                      <div className="self-stretch text-gray-900 text-sm font-medium font-['Inter'] leading-tight">
                        Jane Cooper
                      </div>
                      <div className="self-stretch text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                        0987654321
                      </div>
                    </div>
                  </td>
                  <td className="w-[284px] h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal   leading-tight">
                      123 Lê Hoàng Phái, P12, Gò Vấp
                    </span>
                  </td>

                  <td className="w-[120px] h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                      A.101
                    </span>
                  </td>
                  <td className="w-[152px] h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal leading-tight">
                      5.000.000
                    </span>
                  </td>
                  <td className="w-[196px] h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                      11:32 20/11/2024
                    </span>
                  </td>
                  <td className="w-36 h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                      123456
                    </span>
                  </td>
                  <td className="w-16 h-[72px] px-6 py-4 justify-end items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                      <AiOutlineMore />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination/>
        </div>
      </div>
      {/* end table */}
    </div>
  );
};

export default BodyTable;
