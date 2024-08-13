import React, { useEffect, useState, useTransition } from "react";
import CartRoom from "../Cart_item";
import { useGetRoomsFilterMutation } from "@apis/slice/rooms";
import { useGetDistrictsQuery } from "@apis/slice/provices";
import { useIsLoading } from "@customhooks";

const findDistrictId = (address, districts) => {
  const district = districts?.results.find(
    (district) => address === district.district_name
  );
  return district ? district.district_id : null;
};

const SimilarRoom = ({ id, money, address, category }) => {
  const { data: datadistrict } = useGetDistrictsQuery();
  const [_, setIsLoading] = useIsLoading();
  const [rooms, setRooms] = useState([]);
  const [getRoomsFilter, { isLoading }] = useGetRoomsFilterMutation();
  const [isPending, startTransition] = useTransition();

  const query = {
    houseId: id,
    districtId: findDistrictId(address, datadistrict),
    price: {
      min: (Number(money) - 500000) < 0 ? 0 : Number(money) - 500000,
      max: Number(money) + 500000 || 30000000,
    },
    categories: category && [category],
  };

  useEffect(() => {
    startTransition(async () => {
      setIsLoading(true);

      try {
        const data = await getRoomsFilter(query).unwrap();
        setRooms(data.response?.slice(0, 4));
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setIsLoading(false);
      }
    });
  }, [money, address, category, id, datadistrict]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-[56px] relative w-full h-fit min-h-[400px] max-h-fit">
      {!isLoading && !isPending && rooms.map((item, index) => (
        <CartRoom key={index} item={item} />
      ))}
    </div>
  );
};

export default SimilarRoom;
