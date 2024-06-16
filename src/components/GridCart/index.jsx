import React from "react";
import CartRoom from "../Cart_item";
import { useQueryData } from "@customhooks/FilterCustomHook";
import Skeleton from "../Cart_item/skeleton";
import CustomLoading from "../CustomLoading";
const Index = ({ n }) => {
  const [data, isFetching, isError] = useQueryData();
  const cartItems = new Array(n).fill(null);
 
  if (isFetching) {
    return (
      <>
        <div className="grid grid-cols-4 gap-4">
          {cartItems.map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4  gap-y-[56px] relative w-full h-full">
      {isError && <CustomLoading />}
      {data?.response.map((i, index) => (
        <CartRoom key={index} item={i} />
      ))}
      
    </div>
  );
};

export default Index;
