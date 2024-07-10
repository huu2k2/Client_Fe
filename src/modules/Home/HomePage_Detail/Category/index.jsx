import React from "react";
import UtilityDirectory from "./UtilityDirectory";
import BasicInterior from "./BasicInterior";
import Policy from "./Policy";

const index = () => {
  return (
    <div className="w-full h-[615px]  gap-12 flex flex-col mt-6">
      <UtilityDirectory />
      <BasicInterior />
      <Policy />
    </div>
  );
};

export default index;
