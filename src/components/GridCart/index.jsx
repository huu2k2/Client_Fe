import React, { useEffect, useState, useMemo, useCallback, useTransition } from "react";
import CartRoom from "../Cart_item";
import {
  useQueryData,
  useQueryFilterData,
  useClickSearchFilter,
} from "@customhooks/FilterCustomHook";
import { useLocation } from "react-router-dom";
import { useGetDistrictsQuery } from "../../apis/slice/provices";
import { useIsLoading } from "@customhooks";

const Index = ({ id, money, address, category, faveritedata, option }) => {
  const [filterData, setFilterData] = useQueryFilterData();
  const [_, setIsLoading] = useIsLoading();
  const { data: datadistrict } = useGetDistrictsQuery();
  const handleClickSearch = useClickSearchFilter();
  const location = useLocation();
  
  const [isPending, startTransition] = useTransition();
  const [data, { isLoading }] = useQueryData();
  const [items, setItems] = useState([]);

  const findDistrictId = useCallback((address, districts) => {
    const district = districts?.results.find(
      (district) => address === district.district_name
    );
    return district ? district.district_id : null;
  }, []);

  const query = useMemo(() => ({
    houseId: id || null,
    districtId: findDistrictId(address, datadistrict) || null,
    price: {
      min: Number(money) === 0 ? 0 : Math.max(Number(money) - 1000000, 0),
      max: Number(money) === 0 ? 0 : Number(money) + 1000000,
    },
    categories: category ? [category] : null,
  }), [id, money, category, datadistrict, findDistrictId]);

  useEffect(() => {
    startTransition(() => {
      setFilterData((prevData) => ({ ...prevData, ...query }));
    });
  }, [query]);

  useEffect(() => {
    if (
      (location.pathname === "/similarRooms" &&
        money !== null &&
        address !== null) ||
      id !== null
    ) {
      handleClickSearch();
    }
    
  }, [ location.pathname, money, address, id]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    startTransition(() => {
      if (option?.selectedOption && data?.response) {
        const filteredRooms = data.response.filter(
          (room) => room.houseId === option.selectedOption
        );
        setItems(filteredRooms);
      } else if (option?.selectedOption === "") {
        setItems(data?.response || []);
      }
    });
  }, [option, data]);

  if (isPending&&!data?.response?.length) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-rose-500">{isPending ? "Đang tải dữ liệu..." : "Không tìm thấy phòng tương tự!"}</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4 gap-y-[56px] relative min-h-[400px] max-h-fit">
      {items.map((item, index) => (
        <CartRoom key={index} item={item} faveritedata={faveritedata} />
      ))}
    </div>
  );
};

export default Index;
