import React from "react";
import UtilityDirectory from "./UtilityDirectory";
import BasicInterior from "./BasicInterior";
import Policy from "./Policy";

const index = () => {
  return (
    <div className="w-full h-fit  gap-12 flex flex-col my-6">
      <UtilityDirectory />
      <BasicInterior />
      <Policy />
    </div>
  );
};

export default index;
