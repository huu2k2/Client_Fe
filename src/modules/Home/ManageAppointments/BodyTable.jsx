import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineMore } from "react-icons/ai";
import { format, parseISO } from "date-fns";
import Pagination from "./Pagination";
import SelectCompoment from "./SelectCompoment";
import DatePicker from "./DatePicker";
import { vi } from "date-fns/locale";
import { useGetListOfAppointmentsQuery } from "../../../apis/slice/Agencies";
import { convertDateToISO } from "../../../utils/ConverDate";
import SearchInput from "../../../components/BaseInput/SearchInput";

const BodyTable = ({ isShow, setIsShow, setInfo }) => {
  const now = new Date();
  const formattedDate = format(now, "dd/MM/yyyy", { locale: vi });
  const [date, setDate] = useState([formattedDate]);
  const refOfModel = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refOfModel.current && !refOfModel.current.contains(event.target)) {
        setIsShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // get api list appointments
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [ListData,setListData] = useState([]);
  const pageSize = 10;

  const { data, isLoading } = useGetListOfAppointmentsQuery({
    queries: { pageIndex: currentPage||1, pageSize: pageSize },
    body: {
      start: date[0] ? convertDateToISO(date[0]) : null,
      end: date[1] ? convertDateToISO(date[1]) : null,
    },
  });

  const totalPagesMemo = useMemo(
    () =>
      data?.response?.totalPages ? data?.response?.totalPages : totalPages,
    [data]
  );
  const totalItemsMemo = useMemo(
    () => (data?.response?.items ? data?.response?.items?.length : totalItems),
    [data, date]
  );

  useEffect(() => {
    setTotalPages(totalPagesMemo);
    setTotalItems(totalItemsMemo);
  }, [data, date]);

  if (isLoading) {
    return <span className="loading loading-ball loading-lg"></span>;
  }
 
  
  return (
    <div className="max-w-[1360px] mx-auto flex-col justify-start items-start gap-4 flex">
      <div className="flex justify-start items-start gap-4 relative">
        <SelectCompoment setIsShow={setIsShow} setDate={setDate} />
        <div className="flex">
          <div className=" w-[405px] h-[38px] px-4 py-[9px] bg-blue-50 rounded-tl-md rounded-bl-md flex items-center gap-3">
            <div className="w-5 h-5 relative"></div>
            <div className="text-blue-800 text-sm font-normal leading-tight">
              Tổng số lịch hẹn từ {date[0] && date[0]} {date[1] && "-"}{" "}
              {date[1] && date[1]}
            </div>
          </div>

          <div className="h-[38px] px-4 py-[9px] bg-blue-800 rounded-tr-md rounded-br-md flex items-center">
            <div className="text-white text-sm font-normal leading-tight">
              {totalItems}
            </div>
          </div>
        </div>
        {/* date picker */}
        <div
          className={`${
            isShow ? "" : "hidden"
          } absolute top-10 left-0 z-100 bg-white shadow-sm border-[1px] rounded-xl w-fit h-fit`}
          ref={refOfModel}
        >
          <DatePicker setDate={setDate} />
        </div>
        {/* search */}

        <SearchInput
          data={data}
          setListData={setListData}
        />
        {/* end */}
      </div>

      {/* table */}
      <div className="w-[1360px] h-[879px] flex-col justify-start items-start gap-4 flex">
        <div className="w-full self-stretch h-[825px] flex-col justify-start items-start gap-4 flex">
          <div className="w-full bg-white rounded-lg shadow border border-gray-200">
            <table className="w-full table-auto min-h-[500px]">
              <thead>
                <tr className="flex items-center">
                  <th className="w-16 h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      STT
                    </span>
                  </th>
                  <th className="w-[336px] h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Khách hàng
                    </span>
                  </th>
                  <th className="w-[284px] h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Địa chỉ toà nhà
                    </span>
                  </th>
                  <th className="w-[120px] h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Mã phòng
                    </span>
                  </th>
                  <th className="w-[152px] h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Giá thuê (VNĐ)
                    </span>
                  </th>
                  <th className="w-[196px] h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Ngày giờ xem
                    </span>
                  </th>
                  <th className="w-36 h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Mã lịch hẹn
                    </span>
                  </th>
                  <th className="w-16 h-10 px-6 py-3 bg-gray-50 justify-start items-center flex cursor-pointer"></th>
                </tr>
              </thead>
              <tbody className="h-[460px] overflow-y-auto block custom-scrollbar">
                {ListData?.map((i, index) => (
                  <tr className="flex w-full" key={index}>
                    <td className="w-16 h-[72px] px-6 py-4 justify-start items-center flex">
                      <p className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                        {index + 1 + (currentPage - 1) * pageSize}
                      </p>
                    </td>
                    <td className="w-[336px] h-[72px] px-6 py-4 justify-start items-center gap-4 flex">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://via.placeholder.com/40x40"
                      />
                      <div className="grow shrink basis-0 flex-col justify-center items-start flex">
                        <div className="self-stretch text-gray-900 text-sm font-medium  leading-tight">
                          {i.customerName}
                        </div>
                        <div className="self-stretch text-gray-500 text-sm font-normal  leading-tight">
                          {i.customerPhoneNumber}
                        </div>
                      </div>
                    </td>
                    <td className="w-[284px] h-[72px] px-6 py-4 justify-start items-center flex">
                      <span className="text-gray-500 text-sm font-normal w-full  leading-tight">
                        {i.houseAddress}
                      </span>
                    </td>

                    <td className="w-[120px] h-[72px] px-6 py-4 justify-start items-center flex">
                      <span className="text-gray-500 text-sm font-normal  leading-tight">
                        P.{i.roomCode}
                      </span>
                    </td>

                    <td className="w-[152px] h-[72px] px-6 py-4 justify-start items-center flex">
                      <span className="text-gray-500 text-sm font-normal leading-tight">
                        {i.rentalPrice.toLocaleString("vi-VN")}
                      </span>
                    </td>

                    <td className="w-[196px] h-[72px] px-6 py-4 justify-start items-center flex">
                      <span className="text-gray-500 text-sm font-normal  leading-tight">
                        {format(parseISO(i.dateView), "HH:mm dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </span>
                    </td>

                    <td className="w-36 h-[72px] px-6 py-4 justify-start items-center flex">
                      <span className="text-gray-500 text-sm font-normal  leading-tight">
                        {i.scheduleId}
                      </span>
                    </td>

                    <td className="w-16 h-[72px] justify-center items-center flex  ">
                      <div className="w-full dropdown dropdown-end">
                        <div
                          tabIndex={index}
                          role="button"
                          className="btn m-1 -z-10 bg-white hover:bg-white outline-none border-0  shadow-none border-transparent"
                        >
                          <AiOutlineMore />
                        </div>

                        <ul
                          tabIndex={index}
                          className="dropdown-content menu rounded-md z-[100] w-52 p-2 shadow bg-white border"
                        >
                          <li
                            onClick={() => {
                              setInfo((prev) => ({
                                ...prev,
                                roomId: i.roomCode,
                                houseAddress: i.houseName,
                                rentalPrice: i.rentalPrice,
                                id: i.roomId,
                                houseId: i.houseId,
                                fullName: i.customerName,
                                phoneNumber: i.customerPhoneNumber,
                                scheduleId: i.scheduleId,
                              }));
                            }}
                          >
                            <label
                              htmlFor="my-drawer-4"
                              className="drawer-button text-gray-700 text-sm font-normal  leading-tight"
                            >
                              Đặt cọc
                            </label>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
      {/* end table */}
    </div>
  );
};

export default BodyTable;
