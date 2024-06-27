import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";
 
import CustomLoading from "../CustomLoading";
import { useGetRoomsFilterQuery } from "../../apis/slice/rooms";

const SimilarRoom = ({ id,money,address }) => {
  const query = {
    HouseId: id,
    District: address,
    Price: money,
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

 const {data, isFetching, isError} = useGetRoomsFilterQuery(filteredParams)

 if(isFetching){
  return <CustomLoading />
 }
  return (
    <div className="grid grid-cols-4 gap-4  gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
      {isError && <CustomLoading />}
      {data?.response?.length > 0 ? (
        data?.response?.slice(0,4).map((item, index) => <CartRoom key={index} item={item} />)
      ) : (
        <CustomLoading />
      )}
    </div>
  );
};

export default SimilarRoom;
