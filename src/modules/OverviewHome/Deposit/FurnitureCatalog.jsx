import React from "react";
import { AiOutlineMore } from "react-icons/ai";
const FurnitureTable = () => {
  // Dữ liệu giả cho bảng
  const furnitureData = [
    { id: 1, name: "Máy lạnh", rentalPrice: 300000 },
    { id: 2, name: "Tủ lạnh", rentalPrice: 300000 },
    { id: 3, name: "Tủ quần áo", rentalPrice: 300000 },
    { id: 4, name: "Nệm", rentalPrice: 300000 },
    { id: 5, name: "Máy giặt", rentalPrice: 300000 },
    { id: 6, name: "Máy nóng lạnh", rentalPrice: 300000 },
    { id: 7, name: "Kệ bếp", rentalPrice: 300000 },
  ];

  return (
    <div className="w-[1280px] h-fit">
      <div className="text-rose-800 text-lg font-medium font-['Inter'] leading-normal mb-4">
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
                <input type="checkbox" name="" id="" />
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
                <td className="w-16 h-[72px]  px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                <input type="checkbox" name="" id="" />
                </td>
                <td className="w-20 h-[72px] px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                  {item.id}
                </td>
                <td className="w-[536px] h-[72px] px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                  {item.name}
                </td>
                <td className="w-[536px] h-[72px] px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                  {item.rentalPrice}
                </td>
                <td className="w-16 h-[72px] px-6 py-4 whitespace-nowrap text-right text-sm font-normal flex">
                  <AiOutlineMore />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FurnitureTable;
