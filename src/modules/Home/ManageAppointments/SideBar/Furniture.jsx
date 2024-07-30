import React, { useState } from "react";
 

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
          <div className="w-[501px] h-fit  flex justify-between items-start" key={index}>
            {/* Checkbox and Furniture Name */}
            <div className="w-fit justify-start items-center gap-2 inline-flex">
              <input
                type="checkbox"
                className="w-4 h-4 relative rounded border border-gray-300 custom-checkbox"
                checked={item.isActived}
                onChange={() => {
                  setFurnitureInserts((prev) =>
                    prev.map((furniture) =>
                      furniture.furnitureId === item.furnitureId
                        ? { ...furniture, isActived: !furniture.isActived }
                        : furniture
                    )
                  );
                }}
              />
              <div className="text-gray-700 text-sm font-medium leading-tight">
                {item.furnitureName}
              </div>
            </div>

     

            <div className=" w-[318px] h-fit  flex-col justify-start items-start gap-3 inline-flex">
              {/* Price Input */}
              <div className="self-stretch px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                  <input
                    type="text"
                    value={item.price===0 ?"Trang bị có sẵn":item.price}
                    className="w-full outline-none text-sm font-normal leading-tight"
                    readOnly // Make price input read-only if you don't want to edit it
                  />
                </div>
                <div className="text-gray-500 text-sm font-normal leading-tight">
                  đ
                </div>
              </div>
       
            </div>
          </div>
        ))}
    </div>
  );
};

export default Furniture;
