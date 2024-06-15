import React, { createContext, useState, useEffect, useContext } from 'react';
import { useGetServicesOfRoomQuery } from '@apis/slice/services';
 

export const ServicesContext = createContext();

const ServicesContextHook = ({ children }) => {
    const [idServices, setIsServices] = useState(0);
    const [furnitureInserts, setFurnitureInserts] = useState([]);
    const [serviceInserts, setServiceInserts] = useState([]);

    const { data, error, isLoading } = useGetServicesOfRoomQuery(idServices);

    useEffect(() => {
        if (data) { // Check if data is not undefined
            setFurnitureInserts(data.furnitureInserts || []);
            setServiceInserts(data.serviceInserts || []);
        }
    }, [data]); // Dependency should be data

    return (
        <ServicesContext.Provider value={{ setIsServices, data, error, isLoading, furnitureInserts, serviceInserts }}>
            {children}
        </ServicesContext.Provider>
    );
}

export default ServicesContextHook;
export const useDataServices = () => {
    const { furnitureInserts, serviceInserts ,error, isLoading} = useContext(ServicesContext);
    return [furnitureInserts, serviceInserts,error, isLoading];
  };
  export const useSetIdRoomServices = () => {
    const { setIsServices } = useContext(ServicesContext);
    return [setIsServices];
  };
  