import React, { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import CheckedLine from "../../../assets/CheckedInput.svg";

const FurnitureTable = () => {
  // Dữ liệu giả cho bảng
  const initialFurnitureData = [
    { id: 1, name: "Máy lạnh", rentalPrice: 0, dvt: "VND" },
    { id: 2, name: "Tủ lạnh", rentalPrice: 0, dvt: "VND" },
    { id: 3, name: "Tủ quần áo", rentalPrice: 0, dvt: "VND" },
    { id: 4, name: "Nệm", rentalPrice: 0, dvt: "VND" },
    { id: 5, name: "Máy giặt", rentalPrice: 0, dvt: "VND" },
    { id: 6, name: "Máy nóng lạnh", rentalPrice: 0, dvt: "VND" },
    { id: 7, name: "Kệ bếp", rentalPrice: 0, dvt: "VND" },
  ];

  const [furnitureData, setFurnitureData] = useState(initialFurnitureData);
  const [checkedItems, setCheckedItems] = useState(
    furnitureData.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );

  const allChecked = Object.values(checkedItems).every(Boolean);
  const someChecked = Object.values(checkedItems).some(Boolean);

  const handleParentCheckboxChange = () => {
    const newCheckedItems = furnitureData.reduce((acc, item) => {
      acc[item.id] = !allChecked;
      return acc;
    }, {});
    setCheckedItems(newCheckedItems);
  };

  const handleChildCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePriceChange = (id, value) => {
    const formattedValue = value.replace(/[^0-9]/g, ""); // Chỉ giữ số
    setFurnitureData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, rentalPrice: formattedValue } : item
      )
    );
  };

  return (
    <div className="w-[1280px] h-fit">
      <div className="text-rose-800 text-lg font-bold leading-normal mb-4">
        Danh mục nội thất
      </div>
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="w-16 h-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {someChecked && !allChecked ? (
                  <img
                    src={CheckedLine}
                    alt="checked line icon"
                    onClick={handleParentCheckboxChange}
                    className="w-5 h-5"
                  />
                ) : (
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    onChange={handleParentCheckboxChange}
                    checked={allChecked}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = !allChecked && someChecked;
                      }
                    }}
                  />
                )}
              </th>
              <th
                scope="col"
                className="w-20 h-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                STT
              </th>
              <th
                scope="col"
                className="w-[536px] h-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nội thất
              </th>
              <th
                scope="col"
                className="w-[536px] h-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giá thuê (VNĐ)
              </th>
              <th scope="col" className="w-16 h-10 px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {furnitureData.map((item) => (
              <tr key={item.id}>
                <td className="w-16 h-[72px] px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={checkedItems[item.id]}
                    onChange={() => handleChildCheckboxChange(item.id)}
                  />
                </td>
                <td className="w-20 h-[72px] px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                  {item.id}
                </td>
                <td className="w-[536px] h-[72px] px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                  {item.name}
                </td>
                <td className="w-[536px] h-fit px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 flex justify-start items-center gap-5">
                  <input
                    type="text"
                    value={new Intl.NumberFormat("vi-VN").format(
                      item.rentalPrice
                    )}
                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                    className="w-[80%] border border-gray-300 rounded-md px-2 py-1"
                  />
                  <h1 className="font-bold">{item.dvt}</h1>
                </td>
                {/* <td className="w-16 h-[72px] px-6 py-4 whitespace-nowrap text-right text-sm font-normal flex">
                  <AiOutlineMore />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FurnitureTable;
