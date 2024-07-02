import { BsCheckCircle } from "react-icons/bs";
import { BsDoorOpenFill } from "react-icons/bs";
import { useDataServices } from "@customhooks";
import BasicInteriorSkeleton from "./CategorySkeleton/BasicInteriorSkeleton";
import CheckCircle from '../../../../assets/CheckCircle.png'
const BasicInterior = () => {
  const [furnitureInserts] = useDataServices();

  return (
    <>
    <div className="w-[552px] h-fit gap-5 nthd_flex_col_between">
      <div className="w-[145px] h-6 gap-2  nthd_text_medium_base nthd_flex_start">
        <BsDoorOpenFill />
        <span> Nội thất cơ bản</span>
      </div>

      <div className="grid grid-cols-2  w-full h-fit gap-4">
        {furnitureInserts ? (
          furnitureInserts.map((i, index) => (
            <div className="nthd_basicInterior_item " key={index}>
              <img src={CheckCircle}   />
              <h5 className="nthd_text_medium_sm_text  w-[219px] h-5 flex justify-between">
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
