import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";

import CustomLoading from "../CustomLoading";
import { useGetRoomsFilterMutation } from "@apis/slice/rooms";
import { useGetDistrictsQuery } from "@apis/slice/provices";
const findDistrictId = (address, districts) => {
  const district = districts?.results.find(
    (district) => address === district.district_name
  );
  return district ? district.district_id : null;
};
const SimilarRoom = ({ id, money, address,category }) => {
  const { data: datadistrict } = useGetDistrictsQuery();
  const query = {
    houseId: id,
    districtId: findDistrictId(address, datadistrict),
    price: money,
    categories:category&&[category]
  };
  
  const [getRoomsFilter, { data }] =
    useGetRoomsFilterMutation();
  useEffect(() => {
    const rs = async () => {
      await getRoomsFilter(query).unwrap();
    };
    rs();
  }, [money, address]);
 
 
  return (
    <div className="grid grid-cols-4 gap-4  gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
      {data?.response?.length > 0 ? (
        data?.response
          ?.slice(0, 4)
          .map((item, index) => <CartRoom key={index} item={item} />)
      ) : (
        <CustomLoading />
      )}
    </div>
  );
};

export default SimilarRoom;
