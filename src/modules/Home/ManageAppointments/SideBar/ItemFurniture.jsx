import React, { useEffect, useState } from 'react'

const ItemFurniture = ({ item, setFurnitureInserts }) => {
    const [price, setPrice] = useState('')
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        setIsChecked(item.isActived)
        setPrice(item.price === 0 ? "Trang bị có sẵn" : item.price.toLocaleString('vi-VN'))
    }, [item])

    const handlePriceChange = (e) => {
        const inputValue = e.target.value.replace(/,/g, '')
        const newPrice = inputValue === '' ? 0 : parseFloat(inputValue)
        setPrice(inputValue === '' ? '' : newPrice.toLocaleString('vi-VN'))
        
        setFurnitureInserts((prev) =>
            prev.map((furniture) =>
                furniture.furnitureId === item.furnitureId
                    ? { ...furniture, price: newPrice }
                    : furniture
            )
        )
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
        setFurnitureInserts((prev) =>
            prev.map((furniture) =>
                furniture.furnitureId === item.furnitureId
                    ? { ...furniture, isActived: !furniture.isActived }
                    : furniture
            )
        )
    }

    return (
        <div className="w-[501px] h-fit flex justify-between items-start">
            {/* Checkbox and Furniture Name */}
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
                {/* Price Input */}
                <div className="self-stretch px-[13px] py-[9px] bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                        <input
                            type="text"
                            value={price}
                            onChange={handlePriceChange}
                            className="w-full outline-none text-sm font-normal leading-tight"
                        />
                    </div>
                    <div className="text-gray-500 text-sm font-normal leading-tight">
                        đ
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemFurniture
