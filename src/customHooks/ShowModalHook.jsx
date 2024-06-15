import  { createContext, useState, useContext, useRef, useEffect } from "react";


// Tạo context
export const ShowModalHookContext = createContext();
export const ShowModalHook = ({children}) => {
    const [isShowModal,setIsShowModal] = useState(false)
    const dropdownRef = useRef(null);

    useEffect
    (() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsShowModal(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef]);

  return (
    <ShowModalHookContext.Provider value={{ isShowModal,setIsShowModal,dropdownRef  }}>
      {children}
    </ShowModalHookContext.Provider>
  )
}

export const useBooleanIsShowModal = () => {
    const {isShowModal,setIsShowModal,dropdownRef} = useContext(ShowModalHookContext);
    return [isShowModal,setIsShowModal,dropdownRef];
  };
  