import  { createContext, useState, useContext } from "react";


// Tạo context
export const ShowLoadingContext = createContext();
export const ShowLoadingCustomHook = ({children}) => {
    const [isLoading,setIsLoading] = useState(false)
    
  return (
    <ShowLoadingContext.Provider value={{ isLoading,setIsLoading  }}>
      {children}
    </ShowLoadingContext.Provider>
  )
}

export const useIsLoading = () => {
    const {isLoading,setIsLoading} = useContext(ShowLoadingContext);
    return [isLoading,setIsLoading];
  };
  