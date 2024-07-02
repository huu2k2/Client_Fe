import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";
import {
  useQueryData,
  useQueryFilterData,
  useClickSearchFilter,
} from "@customhooks/FilterCustomHook";
import CustomLoading from "../CustomLoading";
import { useLocation } from "react-router-dom";
import { useGetDistrictsQuery } from "../../apis/slice/provices";

const findDistrictId = (address, districts) => {
  const district = districts?.results.find(
    (district) => address === district.district_name
  );
  return district ? district.district_id : null;
};

const Index = ({ id, money, address, faveritedata }) => {
  const [items, setItems] = useState([]);
  const [filterData, setFilterData] = useQueryFilterData();
  const [error, setError] = useState("");

  const { data: datadistrict } = useGetDistrictsQuery();

  const query = {
    houseId: id,
    districtId: findDistrictId(address, datadistrict),
    price: money,
  };

  const handleClickSearch = useClickSearchFilter();
  const location = useLocation();

  useEffect(() => {
    setFilterData((prevData) => ({ ...prevData, ...query }));
  }, [id, address, money, datadistrict, setFilterData]);

  useEffect(() => {
    if (
      (location.pathname === "/similarRooms" &&
        money !== null &&
        address !== null) ||
      id !== null
    ) {
      handleClickSearch();
    }
  }, [filterData, location.pathname, handleClickSearch, money, address, id]);

  const [data, isFetching, isError] = useQueryData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(data?.response || []);
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    if (!data?.response?.length) {
      setError("không tìm thấy phòng tương tự!");
    } else {
      setError("");
    }
  }, [data]);

  return (
    <>
      {items.length===0 && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-rose-500">{error}</p>
        </div>
      )}
      {items.length > 0 && (
        <div className="w-full grid grid-cols-4 gap-4 gap-y-[56px] relative min-h-[400px] max-h-fit ">
          {items.map((item, index) => (
            <CartRoom key={index} item={item} faveritedata={faveritedata} />
          ))}
        </div>
      )}
    </>
  );
};

export default Index;
