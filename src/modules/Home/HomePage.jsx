import React, { useState } from "react";
import FilterNavbar from "@components/FilterNavbar";
import ListCartHome from "@components/ListCartHome";

const HomePage = () => {
  const [option, setOption] = useState("");

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-[118px] py-6 flex justify-center items-center bg-gray-50">
        <FilterNavbar setOption={setOption} />
      </div>
      <div className="w-full h-fit flex justify-center items-center">
        <ListCartHome selectedOption={option} />
      </div>
    </div>
  );
};

export default HomePage;
