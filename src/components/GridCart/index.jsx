import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";
import {
  useQueryData,
  useQueryFilterData,
} from "@customhooks/FilterCustomHook";
import CustomLoading from "../CustomLoading";

const Index = ({ id,money ,address}) => {
 
  const [items, setItems] = useState([]);
  const [filterData, setFilterData] = useQueryFilterData();
  const [data, isFetching, isError] = useQueryData();
  const query = {
    HouseId: id,
    District: address,
    Price: Number(money),
  }
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
 
  // Sử dụng useEffect để cập nhật filterData khi id thay đổi
  useEffect(() => {

      setFilterData({ ...filterData, ...filteredParams });
    
  }, []);

 
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
        id > 0 ? (
          items
            .slice(0, 4)
            .map((item, index) => <CartRoom key={index} item={item} />)
        ) : (
          items.map((item, index) => <CartRoom key={index} item={item} />)
        )
      ) : (
        <CustomLoading />
      )}
    </div>
  );
};

export default Index;
