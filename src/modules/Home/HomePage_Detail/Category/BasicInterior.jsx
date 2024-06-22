import { BsCheckCircle } from "react-icons/bs";
import { BsDoorOpenFill } from "react-icons/bs";
import { useDataServices } from "@customhooks";
import BasicInteriorSkeleton from "./CategorySkeleton/BasicInteriorSkeleton";
const BasicInterior = () => {
  const [furnitureInserts] = useDataServices();

  return (
    <>
    <div className="w-[552px] h-[136px] gap-5 nthd_flex_col_between">
      <div className="w-[145px] h-6  nthd_text_medium_base nthd_flex_between">
        <BsDoorOpenFill />
        <span> Nội thất cơ bản</span>
      </div>

      <div className="grid grid-cols-2 grid-rows-3 w-full h-[92px]">
        {furnitureInserts ? (
          furnitureInserts.map((i, index) => (
            <div className="nthd_basicInterior_item" key={index}>
              <BsCheckCircle className="bg-green-600 text-white rounded-lg" />
              <h5 className="nthd_text_medium_sm_text w-fit">
                {" "}
                {i?.furnitureName}{" "}
                <span className="text-[#6B7280]">
                  {" "}
                  {i.price.toLocaleString("en-US")} đ/tháng
                </span>
              </h5>
            </div>
          ))
        ) : (
          <div>
            <BasicInteriorSkeleton />
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default BasicInterior;
