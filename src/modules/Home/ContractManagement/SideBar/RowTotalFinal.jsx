import { useRetalPrice, useSetTotalReduce } from "../../../../customHooks";
 

const RowTotalFinal = () => {
const [totalReduce,setTotalReduce] =useSetTotalReduce()
const [RetalPrice,setRetalPrice]= useRetalPrice()
  return (
    <div className="w-[501px]  h-fit pl-2 py-5 flex-col justify-start items-start gap-5 inline-flex">
    <div className="text-rose-800 text-lg font-medium leading-7 flex w-full justify-between items-center">
        <div>
        <p>Tổng tiền nhà</p>
        <p className="text-sm italic">(Bao gồm nội thất)</p>
        </div>
        
        <div>
            {(totalReduce + RetalPrice)?.toLocaleString("vi-VN")} VNĐ
        </div>
      </div>
   
    </div>
  );
};

export default RowTotalFinal;
