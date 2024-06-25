import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";
import {
  useQueryData,
  useClickSearchFilter,
  useQueryFilterData,
} from "@customhooks/FilterCustomHook";
import CustomLoading from "../CustomLoading";

const SimilarRoom = ({ id }) => {
  const handleClickSearch = useClickSearchFilter();
  const [filterData, setFilterData] = useQueryFilterData();
  const [data, isFetching, isError] = useQueryData();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (id !== undefined) {
      setFilterData({ ...filterData, HouseId: id });
      handleClickSearch();
    }
  }, [id, setFilterData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(data?.response || []);
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);

  if (isFetching) {
    return <CustomLoading />;
  }
 
  return (
    <div className="grid grid-cols-4 gap-4  gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
      {isError && <CustomLoading />}
      {items.length > 0 ? (
        items.slice(0,4).map((item, index) => <CartRoom key={index} item={item} />)
      ) : (
        <CustomLoading />
      )}
    </div>
  );
};

export default SimilarRoom;
