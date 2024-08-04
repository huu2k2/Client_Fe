import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";
import { useGetRoomsFilterMutation } from "@apis/slice/rooms";
import { useGetDistrictsQuery } from "@apis/slice/provices";
import { useIsLoading } from "@customhooks";
const findDistrictId = (address, districts) => {
  const district = districts?.results.find(
    (district) => address === district.district_name
  );
  return district ? district.district_id : null;
};
const SimilarRoom = ({ id, money, address, category }) => {
  const { data: datadistrict } = useGetDistrictsQuery();
  const [_,setIsLoading] =useIsLoading() 
  const query = {
    houseId: id,
    districtId: findDistrictId(address, datadistrict),
    price: money,
    categories: category && [category],
  };

  const [getRoomsFilter, { data, isLoading }] = useGetRoomsFilterMutation();
  useEffect(() => {
    const rs = async () => {
      await getRoomsFilter(query).unwrap();
    };
    rs();
  }, [money, address]);
  useEffect(() => {setIsLoading(isLoading)}, [isLoading]);

  return (
    <div className="grid grid-cols-4 gap-4  gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
      {data?.response?.slice(0, 4).map((item, index) => (
        <CartRoom key={index} item={item} />
      ))}
    </div>
  );
};

export default SimilarRoom;
