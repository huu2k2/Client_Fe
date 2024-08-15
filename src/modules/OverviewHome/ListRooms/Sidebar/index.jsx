import React, { useEffect, useState } from "react";
import ItemHome from "./ItemHome";
import { useGetAllHousesQuery } from "@apis/slice/Houses";
import { debounce } from "../../../../utils/Debounce";

const Sidebar = ({ idHolder,setFilterData }) => {
  const { data: dataListHome } = useGetAllHousesQuery(idHolder);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataListHome?.response?.listHouses) {
      setData(dataListHome.response.listHouses);
    }
  }, [dataListHome]);

  const handleChangeSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = dataListHome?.response?.listHouses?.filter((house) =>
      house.houseName.toLowerCase().includes(value)
    );
    setData(filteredData);
  };

  const handleDebounce = debounce(handleChangeSearch, 500);
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
        <div className="min-h-screen h-fit w-full md:w-[556px] bg-white ">
          <div className="w-full p-6 bg-black flex-col justify-center items-start gap-1 inline-flex h-[90px]">
            <div className="self-stretch justify-between items-center inline-flex ">
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
          {/* search */}
          <div className="w-full  px-[13px] flex flex-col gap-2">
            <div className="w-full h-10 mt-2 justify-start items-start gap-5">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="input input-bordered w-full max-w-full"
                onChange={handleDebounce}
              />
            </div>
            <div className="divider mt-1"></div>
            {data.map((i, index) => (
              <ItemHome key={index} item={i} setFilterData={setFilterData}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
