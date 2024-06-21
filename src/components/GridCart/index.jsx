import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";
import {
  useQueryData,
  useQueryFilterData,
} from "@customhooks/FilterCustomHook";
import CustomLoading from "../CustomLoading";
const Index = ({ id }) => {
  const [items, setItems] = useState([]);
  const [filterData, setFilterData] = useQueryFilterData();
  const [data, isFetching, isError] = useQueryData();
  useEffect(() => {
    if (id !== undefined && id !== filterData.HouseId && id !== 0) { 
      setFilterData({ ...filterData, HouseId: id });
    }
  }, [id, filterData, setFilterData]);
  if (isFetching) {
    return (
      <>
        <CustomLoading />
      </>
    );
  }
 

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(data?.response || []);
    }, 500);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [data]);
  return (
    <div className="grid grid-cols-4 gap-4  gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
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
