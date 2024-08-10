import React, { useEffect, useState } from 'react';

const ItemFurniture = ({ item, setFurnitureInserts }) => {
    const [displayPrice, setDisplayPrice] = useState('');
    const [actualPrice, setActualPrice] = useState(0);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const priceValue = item.price === 0 ? "Trang bị có sẵn" : item.price.toLocaleString('vi-VN');
        setDisplayPrice(priceValue);
        setActualPrice(item.price);
        setIsChecked(item.isActived);
    }, [item]);

    const handlePriceChange = (e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        const newPrice = inputValue === '' ? 0 : parseFloat(inputValue);
        setActualPrice(newPrice);
        setDisplayPrice(inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','));

        setFurnitureInserts((prev) =>
            prev.map((furniture) =>
                furniture.furnitureId === item.furnitureId
                    ? { ...furniture, price: newPrice }
                    : furniture
            )
        );
    };

    const handleCheckboxChange = () => {
        const newCheckedStatus = !isChecked;
        setIsChecked(newCheckedStatus);

        setFurnitureInserts((prev) =>
            prev.map((furniture) =>
                furniture.furnitureId === item.furnitureId
                    ? { ...furniture, isActived: newCheckedStatus }
                    : furniture
            )
        );
    };

    return (
        <div className="w-[501px] h-fit flex justify-between items-start">
            <div className="w-fit justify-start items-center gap-2 inline-flex">
                <input
                    type="checkbox"
                    className="w-4 h-4 relative rounded border border-gray-300 custom-checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div className="text-gray-700 text-sm font-medium leading-tight">
                    {item.furnitureName}
                </div>
            </div>

            <div className="w-[318px] h-fit flex-col justify-start items-start gap-3 inline-flex">
                <div className="self-stretch px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                        <input
                            type="text"
                            value={displayPrice}
                            onChange={handlePriceChange}
                            className="w-full outline-none text-sm font-normal leading-tight"
                            disabled={!isChecked}
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

export default ItemFurniture;
