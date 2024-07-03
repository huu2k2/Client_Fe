import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";

import CustomLoading from "../CustomLoading";
import { useGetRoomsFilterMutation } from "../../apis/slice/rooms";
import { useGetDistrictsQuery } from "../../apis/slice/provices";
const findDistrictId = (address, districts) => {
  const district = districts?.results.find(
    (district) => address === district.district_name
  );
  return district ? district.district_id : null;
};
const SimilarRoom = ({ id, money, address }) => {
  const { data: datadistrict } = useGetDistrictsQuery();
  const query = {
    houseId: id,
    districtId: findDistrictId(address, datadistrict),
    price: money,
  };
  
  const [getRoomsFilter, { data, isLoading, isError, error }] =
    useGetRoomsFilterMutation();
  useEffect(() => {
    const rs = async () => {
      await getRoomsFilter(query).unwrap();
    };
    rs();
  }, [money, address]);
  if (isLoading) {
    return <CustomLoading />;
  }

  console.log("query",query)
  return (
    <div className="grid grid-cols-4 gap-4  gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
      {isError && <CustomLoading />}
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
