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
  
  const [isPending, startTransition] = useTransition();  // Khởi tạo useTransition

  // Sử dụng useCallback bên trong thành phần
  const findDistrictId = useCallback((address, districts) => {
    const district = districts?.results.find(
      (district) => address === district.district_name
    );
    return district ? district.district_id : null;
  }, []);

  // Memorize query to avoid unnecessary recomputation
  const query = useMemo(() => ({
    houseId: id || null,
    districtId: findDistrictId(address, datadistrict) || null,
    price: {
      min: Number(money)===0 ? null :Math.max(Number(money) - 1000000, 0),
      max:Number(money)===0?null: Number(money) + 1000000,
    },
    categories: category ? [category] : null,
  }), [id, address, money, category, datadistrict, findDistrictId]);

  // Update filter data only when query changes
  useEffect(() => {
    startTransition(() => {
      setFilterData((prevData) => ({ ...prevData, ...query }));
    });
  }, [query, setFilterData]);

  // Trigger search only when relevant data changes
  useEffect(() => {
    if (
      (location.pathname === "/similarRooms" &&
        money !== null &&
        address !== null) ||
      id !== null
    ) {
      handleClickSearch();
    }
  }, [filterData, location.pathname, handleClickSearch, money, address, id]);

  const [data, { isLoading }] = useQueryData();
  const [items, setItems] = useState([]);

  // Sync loading state with global state
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  // Update items list only when data or option changes
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
  }, [option]);

  if (isPending || !data?.response?.length) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-rose-500">{isPending ? "Đang tải dữ liệu..." : "Không tìm thấy phòng tương tự!"}</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4 gap-y-[56px] relative min-h-[400px] max-h-fit">
      {data?.response && items.map((item, index) => (
        <CartRoom key={index} item={item} faveritedata={faveritedata} />
      ))}
    </div>
  );
};

export default Index;
