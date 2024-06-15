import { BsCheckCircle } from "react-icons/bs";
import { BsDoorOpenFill } from "react-icons/bs";
import { useDataServices } from "@customhooks";
import { Skeleton } from "@mui/material";
const BasicInteriorSkeleton = () => {

    return (
        <div className="w-[552px]  gap-5 nthd_flex_col_between">
            <div className="w-[145px]   nthd_text_medium_base nthd_flex_between">
                <BsDoorOpenFill color="#6B7280" />
                <span> Nội thất cơ bản</span>
            </div>

            <div className="grid grid-cols-2 grid-rows-3 w-full h-[92px]">

                <div className="flex items-center" >
                    <Skeleton variant="circular" width={16} height={16} />

                    <h5 className="ml-[7px] w-fit">
                        <Skeleton variant="rounded" width={160} height={20} />

                    </h5>
                </div>
            </div>
        </div>
    );
};

export default BasicInteriorSkeleton;
