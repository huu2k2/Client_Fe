import React, { useEffect, useState, useMemo, useCallback } from "react";
import CartRoom from "../Cart_item";
import {
  useQueryData,
  useQueryFilterData,
  useClickSearchFilter,
} from "@customhooks/FilterCustomHook";
import { useLocation } from "react-router-dom";
import { useGetDistrictsQuery } from "../../apis/slice/provices";
import { useIsLoading } from "@customhooks";
const findDistrictId = (address, districts) => {
  const district = districts?.results.find(
    (district) => address === district.district_name
  );
  return district ? district.district_id : null;
};

const Index = ({ id, money, address, category, faveritedata, option }) => {
  const [filterData, setFilterData] = useQueryFilterData();
  const [_,setIsLoading] =useIsLoading() 
  const { data: datadistrict } = useGetDistrictsQuery();
  
  const query = useMemo(() => ({
    houseId: id || null,
    districtId: findDistrictId(address, datadistrict) || null,
    price: Number(money) || null,
    categories: category ? [category] : null,
  }), [id, address, money, category, datadistrict]);

  const handleClickSearch = useClickSearchFilter();
  const location = useLocation();

  useEffect(() => {
    setFilterData((prevData) => ({ ...prevData, ...query }));
  }, [query, setFilterData]);

  useEffect(() => {
    if (
      (location.pathname === "/similarRooms" &&
        money !== null &&
        address !== null) ||
      id !== null
    ) {
      handleClickSearch();
    }
  }, [filterData, location.pathname, handleClickSearch, money, address]);

  const [data,{isLoading}] = useQueryData();
  const [items, setItems] = useState([]);
 useEffect(()=>{
  setIsLoading(isLoading)
 },[isLoading])

  useEffect(() => {
    if (option && option.selectedOption && data?.response) {
      const filteredRooms = data.response.filter(
        (room) => room.houseId === option.selectedOption
      );
      setItems(filteredRooms);
    } else if (option && option.selectedOption === "") {
      setItems(data?.response || []);
    }
  }, [option, data]);

  if (data?.response.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-rose-500">Không tìm thấy phòng tương tự!</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4 gap-y-[56px] relative min-h-[400px] max-h-fit">
      {items?.map((item, index) => (
        <CartRoom key={index} item={item} faveritedata={faveritedata} />
      ))}
    </div>
  );
};

export default Index;
