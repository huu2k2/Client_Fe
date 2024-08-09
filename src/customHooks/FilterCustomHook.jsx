import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useGetRoomsFilterMutation } from "@apis/slice/rooms";
import { useIsLoading } from "./ShowLoadingCustomHook";

// Create context
export const FilterHookContext = createContext();

export const FilterCustomHook = ({ children }) => {
  const [_, setIsLoading] = useIsLoading();
  const [getRoomsFilter, { data, isLoading, isError, error }] = useGetRoomsFilterMutation();
  
  const initialFilterData = {
    houseId: null,
    housePass: null,
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

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        await getRoomsFilter(filterData).unwrap();
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Request was aborted');
        } else {
          console.error('Error fetching rooms:', err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Hủy bỏ yêu cầu khi component bị gỡ bỏ hoặc filterData thay đổi
    };
  }, [filterData, getRoomsFilter]);

  const handleClickSearch = useCallback(async () => {
    const controller = new AbortController();
    try {
      await getRoomsFilter(filterData).unwrap();
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error fetching rooms:', err);
        alert('Error fetching rooms. Please try again later.');
      }
    }

    return () => {
      controller.abort(); // Hủy bỏ yêu cầu khi cần
    };
  }, [filterData, getRoomsFilter]);

  const handleClickRemoveFilter = useCallback(async () => {
    const controller = new AbortController();


    try {
      setFilterData(initialFilterData)
      await getRoomsFilter(initialFilterData).unwrap();
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error fetching rooms:', err);
        alert('Error fetching rooms. Please try again later.');
      }
    }

    return () => {
      controller.abort(); // Hủy bỏ yêu cầu khi cần
    };
  }, [getRoomsFilter]);

  const contextValue = useMemo(
    () => ({
      filterData,
      setFilterData,
      data,
      isLoading,
      isError,
      error,
      handleClickSearch,
      handleClickRemoveFilter,
    }),
    [filterData, data, isLoading, isError, error, handleClickSearch, handleClickRemoveFilter]
  );

  return (
    <FilterHookContext.Provider value={contextValue}>
      {children}
    </FilterHookContext.Provider>
  );
};

// Custom hooks to access context data
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

export const useClickRemoveFilter = () => {
  const { handleClickRemoveFilter } = useContext(FilterHookContext);
  return handleClickRemoveFilter;
};

export const useQueryParamOfFilter = () => {
  const { setQueryParams } = useContext(FilterHookContext);
  return setQueryParams;
};
