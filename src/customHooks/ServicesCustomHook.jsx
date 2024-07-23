import React, { createContext, useState, useEffect, useContext } from "react";

export const ServicesContext = createContext();

const ServicesContextHook = ({ children }) => {
  const [data, setData] = useState(null);
  const [furnitureInserts, setFurnitureInserts] = useState([]);
  const [serviceInserts, setServiceInserts] = useState([]);
  const [utility, setUtility] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [holder, setHolder] = useState({});
  const [rooms, setRooms] = useState({});
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(null);
  const [brokeragePolicy, setBrokeragePolicy] = useState([]);

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
      setCommissions(data?.response?.commissions);
      setHolder(data?.response?.holder);
      setRooms({
        roomToBeEmpty: data?.response?.roomToBeEmpty,
        emptyRoom: data?.response?.emptyRoom,
      });
      setAddress(data?.response?.houseAddress);
      setPrice(data?.response?.rentPrice);
      setBrokeragePolicy(data?.response?.brokeragePolicy);
    }
  }, [data]); // Dependency should be data

  return (
    <ServicesContext.Provider
      value={{
        setData,
        data,
        furnitureInserts,
        serviceInserts,
        utility,
        commissions,
        holder,
        rooms,
        address,
        price,
        brokeragePolicy,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContextHook;
export const useDataServices = () => {
  const { furnitureInserts, serviceInserts, utility, commissions } =
    useContext(ServicesContext);
  return [furnitureInserts, serviceInserts, utility, commissions];
};
export const useGetHolder = () => {
  const { holder, rooms } = useContext(ServicesContext);
  return [holder, rooms];
};
export const useGetInfoItem = () => {
  const { address, price } = useContext(ServicesContext);
  return [address, price];
};
export const useGetBrokeragePolicy = () => {
  const { brokeragePolicy } = useContext(ServicesContext);
  return [brokeragePolicy];
};

export const useGetDataDetail = () => {
  const { setData } = useContext(ServicesContext);
  return setData;
};
