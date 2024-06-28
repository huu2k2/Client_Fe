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

  // Sử dụng useEffect để cập nhật filterData khi id thay đổi hoặc location.pathname là '/similarRooms'
  useEffect(() => {
    setFilterData({ ...filterData, ...filteredParams });
  }, []);

  useEffect(() => {
    if (location.pathname === "/similarRooms") {
      handleClickSearch();
    }
  }, [filterData]);
  const [data, isFetching, isError] = useQueryData();
  // Sử dụng useEffect để cập nhật items khi data thay đổi
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(data?.response || []);
    }, 500);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [data]);

  // Render danh sách items
  return (
    <div className="grid grid-cols-4 gap-4 gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
      {isError && <CustomLoading />}
      {items.length > 0 ? (
        items.map((item, index) => <CartRoom key={index} item={item} />)
      ) : (
        <CustomLoading />
      )}
    </div>
  );
};

export default Index;
