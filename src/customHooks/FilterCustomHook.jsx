import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useGetRoomsFilterMutation } from "@apis/slice/rooms";

// Tạo context
export const FilterHookContext = createContext();

export const FilterCustomHook = ({ children }) => {
  // Khởi tạo mutation hook từ RTK Query
  const [getRoomsFilter, { data, isLoading, isError, error }] = useGetRoomsFilterMutation();
  
  // Dữ liệu lọc mặc định
  const initialFilterData = {
    houseId: null,
    districtId: null,
    wardId: null,
    categories: null,
    status: null,
    price: null,
    hasDeposited: null,
    hasRented: null,
    furnitures: null,
    parking: null,
    security: null,
    elevator: null,
    pet: null,
    freeHour: null,
    washing: null,
    roomQuantity: null,
  };

  const [filterData, setFilterData] = useState(initialFilterData);
useEffect(()=>{
  const rs = async ()=>{
    await getRoomsFilter(filterData).unwrap();
  }
  rs()
},[])
  // Hàm xử lý tìm kiếm
  const handleClickSearch = useCallback(async () => {
    try {
      // Thực hiện yêu cầu lọc
      await getRoomsFilter(filterData).unwrap();
    } catch (err) {
      // Xử lý lỗi và thông báo cho người dùng
      console.error('Error fetching rooms:', err);
      alert('Error fetching rooms. Please try again later.'); // Hoặc xử lý lỗi khác tùy thuộc vào ứng dụng
    }
  }, [filterData, getRoomsFilter]);

  // Sử dụng useMemo để tối ưu hóa giá trị context
  const contextValue = useMemo(
    () => ({
      filterData,
      setFilterData,
      data,
      isLoading,
      isError,
      error,
      handleClickSearch,
    }),
    [filterData, setFilterData, data, isLoading, isError, error, handleClickSearch]
  );
console.log(filterData)
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
  const { data, isLoading, isError, error } = useContext(FilterHookContext);
  return [data, isLoading, isError, error];
};

export const useClickSearchFilter = () => {
  const { handleClickSearch } = useContext(FilterHookContext);
  return handleClickSearch;
};
