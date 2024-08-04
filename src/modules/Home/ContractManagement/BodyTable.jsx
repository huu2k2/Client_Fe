import React, {
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
import {
  useGetListsOfContractManagementQuery,
  usePostCancelDepositeMutation,
} from "@apis/slice/Agencies";
import { convertDateToISO } from "@utils/ConverDate";
import { usePostDepositMutation } from "@apis/slice/Deposit";
import { toast } from "react-toastify";
import SearchInput from "@components/BaseInput/SearchInput";
import { useIsLoading } from "@customhooks"
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
  const pageSize = 10;

  const [ListData, setListData] = useState([]);
  const [getTextSearch, setTextSearch] = useState("");
  const startDateISO = convertDateToISO(date[0]);
  const endDateISO = date[1] ? convertDateToISO(date[1]) : null;
  const [_,setLoading] = useIsLoading()
  const { data, error, isLoading, refetch } =
    useGetListsOfContractManagementQuery({
      queries: { pageIndex: currentPage, pageSize: pageSize },
      body: {
        start: startDateISO,
        end: endDateISO || startDateISO,
        customerName: getTextSearch,
      },
    });
    useEffect(()=>{
      setLoading(isLoading)
     },[isLoading])
  useEffect(() => {
    if (error) {
      setTotalPages(1);
    }
  }, [error]);

  const totalPagesMemo = useMemo(
    () =>
      data?.response?.totalPages ? data?.response?.totalPages : totalPages,
    [data, getTextSearch]
  );
  const totalItemsMemo = useMemo(
    () => (data?.response?.items ? data?.response?.items?.length : totalItems),
    [data, date, getTextSearch]
  );

  useEffect(() => {
    setTotalPages(totalPagesMemo);
    setTotalItems(totalItemsMemo);
  }, [data, date, getTextSearch]);

  const [PostDeposit] = usePostDepositMutation();
  const handleExportDeposit = async (i) => {
    try {
      // Gửi yêu cầu API và nhận file PDF
      const response = await PostDeposit(i.depositId).unwrap();
      
      // Kiểm tra xem response có phải là Blob không
      if (response) {
        const blob = new Blob([response], {
          type: 'application/pdf', // Đảm bảo loại MIME cho file PDF
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `HDCOC-P.${i.roomCode}-${i.customerName}.pdf`;
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(link.href);
        toast.success("Xuất hợp đồng thành công!");
       
      } else {
        toast.error("Dữ liệu không hợp lệ.");
      }
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra!");
    }
  };
  // ============== cancle deposite
  const [postCancelDeposite] = usePostCancelDepositeMutation();

  const handleCancledeposite = async (i) => {
    try {
      const kq = await postCancelDeposite({ depositId: i.depositId }).unwrap();
      console.log("kết quả ", kq);
      toast.success("Hủy hợp đồng thành công!");
    } catch (err) {
      // Xử lý lỗi
      toast.error(err);
      console.error("Failed to cancel deposit:", err);
    }
  };
  return (
    <div className="max-w-[1360px] mx-auto flex-col justify-start items-start gap-4 flex">
      <div className="flex justify-start items-start gap-4 relative">
        <SelectCompoment setIsShow={setIsShow} setDate={setDate} />
        <div className="flex">
          <div className=" w-[405px] h-[38px] px-4 py-[9px] bg-blue-50 rounded-tl-md rounded-bl-md flex items-center gap-3">
            <div className="w-5 h-5 relative"></div>
            <div className="text-blue-800 text-sm font-normal leading-tight">
              Tổng số hợp đồng từ {date[0] && date[0]} {date[1] && "-"}{" "}
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
        <SearchInput
          data={data}
          setListData={setListData}
          getTextSearch={getTextSearch}
          setTextSearch={setTextSearch}
        />
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
                  <th className="w-[260px] h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Khách hàng
                    </span>
                  </th>
                  <th className="w-[360px] h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
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
                  <th className="w-40 h-10 px-6 py-3 bg-blue-900 justify-start items-center flex">
                    <span className="text-white text-xs font-medium uppercase leading-none tracking-wide">
                      Hoa hồng
                    </span>
                  </th>
                  <th className="flex-1 h-10 px-6 py-3 bg-gray-50 justify-start items-center flex">
                    <span className="text-gray-500 text-xs font-medium uppercase leading-none tracking-wide">
                      Trạng thái
                    </span>
                  </th>
                  <th className="w-20 h-10 px-6 py-3 bg-gray-50 "></th>
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
                    <td className="w-[260px] h-[72px] px-6 py-4 justify-start items-center gap-4 flex">
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
                    <td className="w-[360px] h-[72px] px-6 py-4 justify-start items-center flex">
                      <span className="text-gray-500 text-sm font-normal w-full  leading-tight">
                        {i.houseName +
                          " " +
                          i.houseAddress?.split(",")[0] +
                          " " +
                          i.houseAddress?.split(",")[1]}
                      </span>
                    </td>

                    <td className="w-[120px] h-[72px] px-6 py-4 justify-start items-center flex">
                      <span className="text-gray-500 text-sm font-normal  leading-tight">
                        A.{i.roomCode}
                      </span>
                    </td>

                    <td className="w-[152px] h-[72px] px-6 py-4 justify-start items-center flex">
                      <span className="text-gray-500 text-sm font-normal leading-tight">
                        {i.rentalPrice.toLocaleString("vi-VN")}
                      </span>
                    </td>

                    <td className="w-40 h-[72px] bg-blue-100 px-6 py-4 justify-start items-center flex">
                      <span className=" text-black text-sm font-normal  leading-tight">
                        {i.commission}
                      </span>
                    </td>

                    <td className="w-36 h-[72px] px-6 py-4 justify-start items-center flex">
                      <div
                        className={`w-fit h-5 px-2.5 py-0.5 ${
                          i.status === "2"
                            ? "bg-emerald-100"
                            : i.status === "6"
                            ? "bg-rose-600"
                            : "bg-blue-100 "
                        } rounded-[10px] justify-center items-center inline-flex`}
                      >
                        <div
                          className={`text-center ${
                            i.status === "2"
                              ? "text-emerald-800"
                              : i.status === "6"
                              ? "text-white"
                              : "text-blue-800"
                          } text-xs font-medium leading-none`}
                        >
                          {i.status === "2"
                            ? "Đặt cọc"
                            : i.status === "6"
                            ? "Đã hủy cọc"
                            : "Đã thuê"}
                        </div>
                      </div>
                    </td>

                    <td className="w-16 h-[72px] justify-center items-center flex  ">
                      <div className="w-full dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn m-1  -z-10 bg-white hover:bg-white outline-none border-0  shadow-none border-transparent"
                        >
                          <AiOutlineMore />
                        </div>

                        <ul
                          tabIndex={0}
                          className="dropdown-content menu rounded-md z-50 w-52 p-2 shadow bg-white"
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
                                depositId: i.depositId,
                                status: i.status,
                              }));
                            }}
                          >
                            <label
                              htmlFor="my-drawer-5"
                              className="drawer-button text-gray-700 text-sm font-normal  leading-tight"
                            >
                              Xem thông tin đặt cọc
                            </label>
                          </li>
                          <li onClick={() => handleExportDeposit(i)}>
                            <span className="text-gray-700 text-sm font-normal  leading-tight">
                              Xuất hợp đồng cọc
                            </span>
                          </li>
                          <li onClick={() => handleCancledeposite(i)}>
                            <span className="text-gray-700 text-sm font-normal  leading-tight">
                              Hủy cọc
                            </span>
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
