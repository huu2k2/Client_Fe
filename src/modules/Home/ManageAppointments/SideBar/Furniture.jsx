import React, { useState } from "react";
import ItemFurniture from "./ItemFurniture";
 

const Furniture = ({ furnitureInserts,setFurnitureInserts }) => {
  return (
    <div className="w-[501px] h-fit pl-2 py-5 flex-col justify-between items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Nội thất bàn giao
      </div>

      {/* Map through furnitureInserts */}
      {furnitureInserts &&
        furnitureInserts.map((item, index) => (
          <ItemFurniture item={item} key={index} setFurnitureInserts={setFurnitureInserts}/>
        ))}
    </div>
  );
};

export default Furniture;
