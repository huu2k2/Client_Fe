import React, { useState, useEffect } from "react";
import Body from "./Body";
import GroupCheckbox from "./GroupCheckbox";
import IconPickHome from "../../../assets/pickHome.png";
import { useParams } from "react-router-dom";
import { useGetRoomsofhouseMutation } from "@apis/slice/rooms";
import Sidebar from "./Sidebar";
import { useGetInfoHomeQuery } from "@apis/slice/Houses";
import { Helmet } from "react-helmet";
const calculateRoomStatusTotals = (data) => {
  return data.reduce(
    (totals, item) => {
      if (item.status === "0") {
        totals.empty += 1;
      } else if (item.status === "1") {
        totals.toBeEmpty += 1;
      } else if (item.status === "2") {
        totals.booked += 1;
      } else {
        totals.rented += 1;
      }
      return totals;
    },
    {
      empty: 0,
      toBeEmpty: 0,
      booked: 0,
      rented: 0,
    }
  );
};

const Index = () => {
  const { idHome } = useParams();

  const [query, setQuery] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterData, setFilterData] = useState({
    houseId: idHome,
    districtId: null,
    wardId: null,
    categories: null,
    status: null,
    price: null,
    hasDeposited: null,
    hasRented: null,
    furnitures: null,
    parking: null,
    security: null,
    elevator: null,
    pet: null,
    freeHour: null,
    washing: null,
    roomQuantity: null,
    housePass:
      Number(JSON.parse(sessionStorage.getItem("kwomkdnkadvadvad"))?.idhome) ===
      Number(idHome)
        ? JSON.parse(sessionStorage.getItem("kwomkdnkadvadvad"))?.pass
        : null,
  });

  const [getRoomsFilter, { data: DataOF, isLoading }] =
    useGetRoomsofhouseMutation();
  const statusTotals = calculateRoomStatusTotals(DataOF?.response || []);

  useEffect(() => {
    const rs = async () => {
      const kq = await getRoomsFilter(filterData).unwrap();
      setFilteredData(kq?.response);
    };

    rs();
  }, [filterData]); // Sử dụng idHome và filterData làm dependencies

  // Cập nhật dữ liệu lọc khi query thay đổi
  useEffect(() => {
    if (DataOF?.response?.length > 0) {
      const newFilteredData = DataOF?.response.filter((item) =>
        query.includes(item.status)
      );
      if (query.length > 0) {
        setFilteredData(newFilteredData);
      } else {
        setFilteredData(DataOF?.response);
      }
    }
  }, [query, DataOF]); // Sử dụng query và DataOF làm dependencies

  const { data: dataNameHome } = useGetInfoHomeQuery(idHome);

  return (
    <>
      <Helmet>
        <title>Danh sách phòng trống</title>
        <meta name="description" content="Danh sách phòng trống" />
      </Helmet>
      <div className="w-full h-fit bg-black flex-col justify-center items-center flex flex-1">
        <div className="w-full h-px flex-col justify-start items-start flex">
          <div className="self-stretch h-px bg-zinc-700" />
        </div>

        <div className="self-stretch w-full h-fit lg:h-40 py-10 shadow  justify-center items-center gap-6 flex">
          <div className="self-stretch w-[1360px] h-fit justify-between items-center flex px-10 lg:px-0  flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-6 w-full flex-wrap">
              <div className="text-white text-3xl font-bold leading-9 flex justify-start items-center">
                {dataNameHome && dataNameHome?.response?.houseName}
                <label
                  htmlFor="my-drawer-Overview"
                  className="mx-5 text-rose-600 text-lg drawer-button cursor-pointer"
                >
                  <div className="w-9 h-9 bg-white rounded-md shadow border border-gray-300 flex justify-center items-center">
                    <img src={IconPickHome} alt="icon chọn nhà" className="" />
                  </div>
                </label>
              </div>
              <GroupCheckbox
                setQuery={setQuery}
                query={query}
                statusTotals={statusTotals}
              />
            </div>

            <div className="w-80 h-fit px-4 py-3 bg-neutral-50 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
              <div className="justify-between items-center w-full flex">
                <div className="justify-center items-start gap-2 inline-flex">
                  <img
                    className="w-11 h-11 rounded-full"
                    src="https://via.placeholder.com/44x44"
                  />
                  <div className="flex-col justify-start items-start gap-1 inline-flex">
                    <div className="text-black text-base font-medium leading-normal">
                      {dataNameHome?.response?.houseHolderName}
                    </div>
                    <div className="text-zinc-500 text-xs font-normal leading-none ">
                      Chủ nhà
                    </div>
                  </div>
                </div>
              </div>

              <div className="justify-center items-center gap-2 inline-flex">
                <div className="px-2 flex-col justify-start items-start inline-flex">
                  <div className="w-[120px] text-zinc-500 text-xs font-normal leading-none">
                    Phòng sắp trống
                  </div>
                  <div className="text-black text-base font-medium leading-normal">
                    {DataOF?.beEmptyRoomTotal}
                  </div>
                </div>
                <div className="px-2 flex-col justify-start items-start inline-flex">
                  <div className="w-[120px] text-zinc-500 text-xs font-normal leading-none">
                    Phòng trống
                  </div>
                  <div className="text-black text-base font-medium leading-normal">
                    {DataOF?.emptyRoomTotal}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Body
          data={filteredData && filteredData.length >= 0 ? filteredData : []}
          isLoading={isLoading}
          dataNameHome={dataNameHome?.response}
        />
      </div>
      {dataNameHome?.response && (
        <Sidebar
          idHolder={dataNameHome?.response?.houseHolderId}
          setFilterData={setFilterData}
        />
      )}
    </>
  );
};

export default Index;
