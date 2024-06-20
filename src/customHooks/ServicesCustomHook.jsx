import React, { createContext, useState, useEffect, useContext } from "react";
import { useGetAllDetailQuery } from "@apis/slice/services";

export const ServicesContext = createContext();

const ServicesContextHook = ({ children }) => {
  const [idServices, setIsServices] = useState(0);
  const [furnitureInserts, setFurnitureInserts] = useState([]);
  const [serviceInserts, setServiceInserts] = useState([]);
  const [utility, setUtility] = useState([]);
  const [commissions,setCommissions] =useState([]);
  const [holder,setHolder] =useState({});
  const [rooms,setRooms] =useState({});
  const { data, error, isLoading } = useGetAllDetailQuery(idServices);

  useEffect(() => {
    if (data) {
      // Check if data is not undefined
      setFurnitureInserts(data?.response?.houseFurnitureViewModels);
      setServiceInserts(data?.response?.houseServiceViewModels);
      setUtility([
        { name: "Bãi đậu xe", value: data?.response?.parking },
        { name: "Cầu thang", value: data?.response?.stair },
        { name: "Giặt giũ", value: data?.response?.washing },
        { name: "An ninh", value: data?.response?.sercuri },
        { name: "Wifi", value: data?.response?.wifi },
        { name: "Thang máy", value: data?.response?.elevator },
        { name: "Vệ sinh hành lang", value: data?.response?.hallwayCleaning },
        { name: "Khóa vân tay", value: data?.response?.fingerprintLock },
        { name: "Giờ miễn phí", value: data?.response?.freeHours },
        { name: "Dọn phòng", value: data?.response?.cleanRoom },
        { name: "Thú cưng", value: data?.response?.pet },
        { name: "Camera", value: data?.response?.cammera },
      ]);
      setCommissions(data?.response?.commissions)
      setHolder(data?.response?.holder)
      setRooms({roomToBeEmpty:data?.response?.roomToBeEmpty,emptyRoom:data?.response?.emptyRoom})
    }
  }, [data]); // Dependency should be data

  return (
    <ServicesContext.Provider
      value={{
        setIsServices,
        data,
        error,
        isLoading,
        furnitureInserts,
        serviceInserts,
        utility,
        commissions,
        holder,
        rooms
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContextHook;
export const useDataServices = () => {
  const { furnitureInserts, serviceInserts, utility,commissions, error, isLoading } =
    useContext(ServicesContext);
  return [furnitureInserts, serviceInserts, utility,commissions, error, isLoading];
};
export const useGetHolder = () => {
  const { holder ,rooms} = useContext(ServicesContext);
  return [holder,rooms];
};
export const useSetIdRoomServices = () => {
  const { setIsServices } = useContext(ServicesContext);
  return [setIsServices];
};
