import React, { useState } from "react";
import SelectComponent from "./SelectCompoment"; // Ensure this path is correct
import { AiFillCaretDown } from "react-icons/ai"; // Imported but not used; you might want to add it where needed

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
    <div className="w-[556px] h-fit px-6 py-5 flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Nội thất bàn giao
      </div>

      {/* Map through furnitureInserts */}
      {furnitureInserts &&
        furnitureInserts.map((item, index) => (
          <div className="w-[508px] h-fit  flex justify-between items-start" key={index}>
            {/* Checkbox and Furniture Name */}
            <div className=" justify-start items-center gap-2 inline-flex">
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

            {/* Furniture Details */}

            <div className=" w-[312px] h-fit  flex-col justify-start items-start gap-3 inline-flex">
              {/* Price Input */}
              <div className="self-stretch px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                  <input
                    type="text"
                    value={item.price}
                    className="w-full outline-none text-sm font-normal leading-tight"
                    readOnly // Make price input read-only if you don't want to edit it
                  />
                </div>
                <div className="text-gray-500 text-sm font-normal leading-tight">
                  đ
                </div>
              </div>
              {item.isActived && (
                <>
                  <div className="self-stretch bg-white rounded-md shadow border border-gray-300 justify-between items-center inline-flex">
                    <SelectComponent status={item.status} />
                  </div>

                  <div className="w-[312px] h-[105px] overflow-hidden bg-white rounded-md shadow border border-gray-300 justify-end items-center inline-flex">
                    <textarea
                      className="w-full h-full px-[13px] py-[9px] outline-none text-sm font-normal leading-tight"
                      placeholder=""
                      value={item.note}
                      onChange={(e) => handleChangeNote(e, item.furnitureId)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Furniture;
