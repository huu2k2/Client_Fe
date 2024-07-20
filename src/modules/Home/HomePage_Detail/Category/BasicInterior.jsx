import { BsCheckCircle } from "react-icons/bs";
import { BsDoorOpenFill } from "react-icons/bs";
import { useDataServices } from "@customhooks";
import BasicInteriorSkeleton from "./CategorySkeleton/BasicInteriorSkeleton";
import CheckCircle from '../../../../assets/CheckCircle.png';

const BasicInterior = () => {
  const [furnitureInserts] = useDataServices();

  return (
    <>
      <div className="w-full h-fit gap-5 nthd_flex_col_between">
        <div className="w-[145px] h-6 gap-2 nthd_text_medium_base nthd_flex_start">
          <BsDoorOpenFill />
          <span>Nội thất cơ bản</span>
        </div>

        <div className="grid grid-cols-3 w-full h-fit gap-x-44 gap-y-4">
          {furnitureInserts ? (
            furnitureInserts.map((i, index) => (
              <div className="nthd_basicInterioritem  gap-[7px] flex  w-full" key={index}>
                <img src={CheckCircle} alt="Check Circle" />
                <div className="nthd_text_medium_sm_text  h-5 w-full flex justify-between">
                  {i?.furnitureName}
                  <span className="text-[#6B7280] flex justify-end ">
                    {i.price.toLocaleString("en-US")} đ/tháng
                  </span>
                </div>
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
