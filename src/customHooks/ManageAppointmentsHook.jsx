import { createContext, useContext, useEffect, useState } from "react";

// Create context
export const ManageAppointmentsHookContext = createContext();

export const ManageAppointmentsHook = ({ children }) => {
  const [getInfo, setInfo] = useState({
    roomId: 0,
    houseAddress: "",
    rentalPrice: 0,
    roomCode: "101",
    houseId: 0,
    scheduleId: 0,
    fullName: "",
    phoneNumber: "",
    id: 0,
    totalReduce:0
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [getNamecommissionPolicyId, setNamecommissionPolicyId] = useState("");
  const [getRentalMonth, setRentalMonth] = useState("");
//
 
const [totalReduce,setTotalReduce] = useState(0)
const [RetalPrice,setRetalPrice] = useState(0)
const [DepositAmount,setDepositAmount]= useState(0)

useEffect(()=>{
if(!isSidebarOpen){
  setDepositAmount(0)
  setRetalPrice(0)
  setTotalReduce(0)
  setRentalMonth("")
  setNamecommissionPolicyId("")
}
},[isSidebarOpen])
  const contextValue = {
    getInfo,
    setInfo,
    isSidebarOpen,
    setIsSidebarOpen,
    getNamecommissionPolicyId,
    setNamecommissionPolicyId,
    getRentalMonth,
    setRentalMonth,
    setValue: null,
    totalReduce,
    setTotalReduce,
    RetalPrice,setRetalPrice,
    DepositAmount,setDepositAmount
  };

  return (
    <ManageAppointmentsHookContext.Provider value={contextValue}>
      {children}
    </ManageAppointmentsHookContext.Provider>
  );
};

// Custom hooks to access context data

export const useSetInfo = () => {
  const { getInfo, setInfo } = useContext(ManageAppointmentsHookContext);
  return [getInfo, setInfo];
};

export const useSetIsSidebarOpen = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(ManageAppointmentsHookContext);
  return [isSidebarOpen, setIsSidebarOpen];
};
export const useSetTotalReduce = () => {
  const { totalReduce,setTotalReduce } = useContext(ManageAppointmentsHookContext);
  return [totalReduce,setTotalReduce];
};

export const useDayMonthofSelect = () => {
  const {getNamecommissionPolicyId, setNamecommissionPolicyId, getRentalMonth, setRentalMonth } = useContext(ManageAppointmentsHookContext);
  return [getNamecommissionPolicyId, setNamecommissionPolicyId, getRentalMonth, setRentalMonth];
};
export const useRetalPrice = () => {
  const { RetalPrice,setRetalPrice } = useContext(ManageAppointmentsHookContext);
  return [RetalPrice,setRetalPrice];
};
export const useDepositAmount =()=>{
  const { DepositAmount,setDepositAmount } = useContext(ManageAppointmentsHookContext);
  return [DepositAmount,setDepositAmount];
}