import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";
import {
  useQueryData,
  useQueryFilterData,
  useClickSearchFilter,
} from "@customhooks/FilterCustomHook";
import CustomLoading from "../CustomLoading";
import { useLocation } from "react-router-dom";

const Index = ({ id, money, address }) => {
  const [items, setItems] = useState([]);
  const [filterData, setFilterData] = useQueryFilterData();

  const query = {
    HouseId: id,
    District: address,
    Price: Number(money),
  };

  const filteredParams = Object.keys(query).reduce((acc, key) => {
    const value = query[key];
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== 0 &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const handleClickSearch = useClickSearchFilter();
  const location = useLocation();

  useEffect(() => {
    setFilterData({ ...filterData, ...filteredParams });
  }, [id, address, money]);

  useEffect(() => {
    if ((location.pathname === "/similarRooms" && money !== null && address !== null) || id !== null) {
      handleClickSearch();
    }
  }, [filterData, location.pathname]);

  const [data, isFetching, isError] = useQueryData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(data?.response || []);
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="grid grid-cols-4 gap-4 gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
      {isError && <CustomLoading />}
      {items.length > 0 ? (
        items.map((item, index) => <CartRoom key={index} item={item} />)
      ) : (
        !isFetching && <p className="text-rose-500">không tìm thấy phòng!</p>
      )}
    </div>
  );
};

export default Index;
