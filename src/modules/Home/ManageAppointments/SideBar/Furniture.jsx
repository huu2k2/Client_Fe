import React, { useState } from "react";
import ItemFurniture from "./ItemFurniture";
 

const Furniture = ({ furnitureInserts,setFurnitureInserts }) => {
  // Initialize the state for note value if needed
  const [valueNote, setValueNote] = useState("");
 
  // Handle note change event
  const handleChangeNote = (e, furnitureId) => {
    const updatedNote = e.target.value;
    setValueNote(updatedNote);

    setFurnitureInserts((prev) =>
      prev.map((item) =>
        item.furnitureId === furnitureId ? { ...item, note: updatedNote } : item
      )
    );
  };
 
  return (
    <div className="w-[501px] h-fit pl-2 py-5 flex-col justify-between items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Nội thất bàn giao
      </div>

      {/* Map through furnitureInserts */}
      {furnitureInserts &&
        furnitureInserts.map((item, index) => (
          <ItemFurniture item={item} key={index}/>
        ))}
    </div>
  );
};

export default Furniture;
