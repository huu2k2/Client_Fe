import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useGetRoomsFilterQuery } from "@apis/slice/rooms";
// Tạo context
export const FilterHookContext = createContext();

export const FilterCustomHook = ({ children }) => {
  const [queryParams, setQueryParams] = useState({});
  const { data, isFetching, isError } = useGetRoomsFilterQuery(queryParams);
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
        // if (Array.isArray(value)) {
        //   value.forEach(val => {
        //     acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        //   });
        // } else {
        //   acc.push(`${key}=${value}`);
        // }
      }
      return acc;
    }, []);
//     const queryString = filteredParams.join('&');
// console.log(queryString)
    setQueryParams(filteredParams);
  }, [filterData]);



  // Sử dụng useMemo để tránh việc render lại không cần thiết khi context value thay đổi
  const contextValue = useMemo(
    () => ({
      filterData,
      setFilterData,
      data,
      isFetching,
      isError,
      handleClickSearch,
      setQueryParams
    }),
    [filterData, setFilterData, data, isFetching, isError, handleClickSearch]
  );
 
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
export const useQueryparamOfFilter = () =>{
  const { setQueryParams } = useContext(FilterHookContext);
  return setQueryParams;
}