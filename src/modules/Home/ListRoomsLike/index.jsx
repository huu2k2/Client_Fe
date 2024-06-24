import React from "react";
 
import ListCartHome from "@components/ListCartHome";
 
const HomePage = () => {
  return (
  
    <div className="w-full flex flex-col justify-center items-center py-20">
 
      <div className="w-full h-fit flex justify-center items-center">

        <ListCartHome/>
      </div>
    </div>
     
  );
};

export default HomePage;
