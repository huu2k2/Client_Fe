import React, { createContext, useState, useContext, useCallback, useMemo } from "react";
import { useGetRoomsFilterQuery } from "@apis/slice/rooms";

// Tạo context
export const FilterHookContext = createContext();

export const FilterCustomHook = ({ children }) => {
  const initialFilterData = {
    HouseId: null,
    Address: null,
    District: null,
    Ward: null,
    Category: [],
    Status: [],
    Furnitures: [],
    Price: null,
    Parking: null,
    Security: null,
    Elevator: null,
    Pet: null,
    FreeHours: null,
    Washing: null,
    RoomQuantity: null,
  };

  const [filterData, setFilterData] = useState(initialFilterData);
  const [queryParams, setQueryParams] = useState({});

  // Tạo hàm tìm kiếm
  const handleClickSearch = useCallback(() => {
    // Loại bỏ các giá trị null và mảng trống khỏi filterData
    const filteredParams = Object.keys(filterData).reduce((acc, key) => {
      const value = filterData[key];
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

    setQueryParams(filteredParams);
  }, [filterData]);

  const { data, isFetching, isError } = useGetRoomsFilterQuery(queryParams);
 
  // Sử dụng useMemo để tránh việc render lại không cần thiết khi context value thay đổi
  const contextValue = useMemo(() => ({
    filterData,
    setFilterData,
    data,
    isFetching,
    isError,
    handleClickSearch
  }), [filterData, setFilterData, data, isFetching, isError, handleClickSearch]);

  return (
    <FilterHookContext.Provider value={contextValue}>
      {children}
    </FilterHookContext.Provider>
  );
};

// Custom hooks để truy cập dữ liệu context
export const useQueryFilterData = () => {
  const { filterData, setFilterData } = useContext(FilterHookContext);
  return [filterData, setFilterData];
};

export const useQueryData = () => {
  const { data, isFetching, isError } = useContext(FilterHookContext);
  return [data, isFetching, isError];
};

export const useClickSearchFilter = () => {
  const { handleClickSearch } = useContext(FilterHookContext);
  return handleClickSearch;
};
