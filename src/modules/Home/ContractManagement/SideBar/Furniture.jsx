import React, { useState, useEffect } from "react";

const ItemFurniture = ({ item, handleChangePrice ,handleCheckboxChange,getInfo}) => {
  return (
    <div
      className="w-[501px] h-fit flex justify-between items-start"
      key={item.furnitureId}
    >
      {/* Checkbox and Furniture Name */}
      <div className="justify-start items-center gap-2 inline-flex">
        <input
          type="checkbox"
          className="w-4 h-4 relative rounded border border-gray-300 custom-checkbox"
          checked={item.isActived}
          onChange={() => {
            handleCheckboxChange(item.furnitureId, !item.isActived);
          }}
          disabled={getInfo.status==="3"}
        />
        <div className="text-gray-700 text-sm font-medium leading-tight">
          {item.name}
        </div>
      </div>

      {/* Furniture Details */}
      <div className="w-[318px] h-fit flex-col justify-start items-start gap-3 inline-flex">
        {/* Price Input */}
        <div className="self-stretch px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
            <input
              type="text"
              value={
                item.price === 0
                  ? "Trang bị có sẵn"
                  : item.price.toLocaleString("vi-VN")
              }
              disabled={getInfo.status==="3" || item.price===0}
              className="w-full outline-none text-sm font-normal leading-tight"
              onChange={(e) => handleChangePrice(e, item.furnitureId)}
            />
          </div>
          <div className="text-gray-500 text-sm font-normal leading-tight">
            đ
          </div>
        </div>
      </div>
    </div>
  );
};

const Furniture = ({ furnitureInserts, setFurnitureInserts,getInfo }) => {
  const [localFurnitureInserts, setLocalFurnitureInserts] =
    useState(furnitureInserts);

  useEffect(() => {
    setLocalFurnitureInserts(furnitureInserts);
  }, [furnitureInserts]);

  // Handle price change event
  const handleChangePrice = (e, furnitureId) => {
    const updatedValue = e.target.value;
    // Remove non-numeric characters except commas
    const numericValue = parseInt(updatedValue.replace(/[^0-9]/g, ""), 10);

    setLocalFurnitureInserts((prev) =>
      prev.map((item) =>
        item.furnitureId === furnitureId
          ? { ...item, price: isNaN(numericValue) ? 0 : numericValue }
          : item
      )
    );
  };
  const handleCheckboxChange = (furnitureId) => {
    setLocalFurnitureInserts((prev) =>
      prev.map((item) =>
        item.furnitureId === furnitureId
          ? { ...item, isActived: !item.isActived }
          : item
      )
    );
  };

  useEffect(() => {
    setFurnitureInserts(localFurnitureInserts);
  }, [localFurnitureInserts]);

  return (
    <div className="w-[501px] h-fit pl-4 py-5 flex-col justify-between items-start gap-5 inline-flex">
      <div className="text-rose-800 text-lg font-medium leading-7">
        Nội thất bàn giao
      </div>

      {/* Map through localFurnitureInserts */}
      {localFurnitureInserts &&
        localFurnitureInserts.map((item) => (
          <ItemFurniture
            item={item}
            handleChangePrice={handleChangePrice}
            key={item.furnitureId}
            handleCheckboxChange={handleCheckboxChange}
            getInfo={getInfo}
          />
        ))}
    </div>
  );
};

export default Furniture;
