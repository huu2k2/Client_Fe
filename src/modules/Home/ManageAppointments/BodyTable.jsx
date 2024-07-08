import React, { useEffect, useRef, useState } from "react";
import { BsArrowRight, BsChevronDown } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { format } from 'date-fns';
import Pagination from "./Pagination";
import SelectCompoment from "./SelectCompoment";
import DatePicker from "./DatePicker";
import { vi } from 'date-fns/locale';
const BodyTable = ({isShow,setIsShow}) => {
  const now = new Date();
  const formattedDate = format(now, 'dd/MM/yyyy', { locale: vi });
  const [date,setDate] = useState([formattedDate])
  const refOfModel = useRef(null)
  useEffect(()=>{
    const handleClickOutside = (event) => {
      if (refOfModel.current && !refOfModel.current.contains(event.target)) {
        setIsShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[])
 
  return (
    <div className="max-w-[1360px] mx-auto flex-col justify-start items-start gap-4 inline-flex">
      <div className="flex justify-start items-start gap-4 relative">
        <SelectCompoment setIsShow={setIsShow} setDate={setDate}/>
        <div className="flex">
          <div className=" w-[405px] h-[38px] px-4 py-[9px] bg-blue-50 rounded-tl-md rounded-bl-md flex items-center gap-3">
            <div className="w-5 h-5 relative"></div>
            <div className="text-blue-800 text-sm font-normal leading-tight">
              Tổng số lịch hẹn từ  {date[0] && date[0] } {date[1] && '-'}  {date[1] && date[1]}
            </div>
          </div>

          <div className="h-[38px] px-4 py-[9px] bg-blue-800 rounded-tr-md rounded-br-md flex items-center">
            <div className="text-white text-sm font-normal leading-tight">
              16
            </div>
          </div>
        </div>
        {/* date picker */}
        <div className={`${isShow ? '' :'hidden'} absolute top-10 left-0 z-100 bg-white shadow-sm border-[1px] rounded-xl w-fit h-fit`} ref={refOfModel}>
            <DatePicker setDate={setDate}/>
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
                  <th className="w-16 h-10 px-6 py-3 bg-gray-50 justify-start items-center inline-flex cursor-pointer">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="flex">
                  <td className="w-16 h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      10
                    </span>
                  </td>
                  <td className="w-[336px] h-[72px] px-6 py-4 justify-start items-center gap-4 inline-flex">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://via.placeholder.com/40x40"
                    />
                    <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                      <div className="self-stretch text-gray-900 text-sm font-medium  leading-tight">
                        Jane Cooper
                      </div>
                      <div className="self-stretch text-gray-500 text-sm font-normal  leading-tight">
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
                    <span className="text-gray-500 text-sm font-normal  leading-tight">
                      A.101
                    </span>
                  </td>
                  <td className="w-[152px] h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal leading-tight">
                      5.000.000
                    </span>
                  </td>
                  <td className="w-[196px] h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal  leading-tight">
                      11:32 20/11/2024
                    </span>
                  </td>
                  <td className="w-36 h-[72px] px-6 py-4 justify-start items-center inline-flex">
                    <span className="text-gray-500 text-sm font-normal  leading-tight">
                      123456
                    </span>
                  </td>
                  <td className="w-16 h-[72px] justify-center items-center flex  ">
                    <div className="w-full dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn m-1 bg-white hover:bg-white outline-none border-0 divide-transparent shadow-none border-transparent">
                        <AiOutlineMore />
                      </div>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-md z-[1] w-52 p-2 shadow"
                      >
                        <li>
                          <a  className="text-gray-700 text-sm font-normal  leading-tight">Đặt cọc</a>
                        </li>
                        <li>
                          <a  className="text-gray-700 text-sm font-normal  leading-tight">Xuất hợp đồng cọc</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
      {/* end table */}
    </div>
  );
};

export default BodyTable;
