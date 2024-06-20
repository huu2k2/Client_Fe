import React, { useEffect, useState } from "react";
import CartRoom from "../Cart_item";
import { useQueryData } from "@customhooks/FilterCustomHook";
import CustomLoading from "../CustomLoading";
const Index = ({ n=8 }) => {
  const [data, isFetching, isError] = useQueryData();
  const cartItems = new Array(n).fill(null);

  if (isFetching) {
    return (
      <>
       <CustomLoading/>
      </>
    );
  }
  const [items, setItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(data?.response || []);
    }, 500);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [data]);
  return (
    <div className="grid grid-cols-4 gap-4  gap-y-[56px] relative w-full min-h-[400px] max-h-fit">
      {isError && <CustomLoading />}
      {items.length > 0 ? (
        items.map((i, index) => <CartRoom key={index} item={i} />)
      ) : (
        <CustomLoading/>
      )}
    </div>
  );
};

export default Index;
