import { BsWifi } from "react-icons/bs";
import { useDataServices } from "@customhooks";
import UtilityDirectorySkeleton from "./CategorySkeleton/UtilityDirectorySkeleton";

const UtilityDirectory = () => {
  const [,, utility] = useDataServices();

  return (
    <>
      {utility.length > 0 ? (
        <div className="w-full h-[80px] gap-5 mt-5 nthd_flex_col_between">
          <div className="w-[165px] h-6 gap-2 flex justify-start nthd_text_medium_base items-center font-bold">
            <BsWifi className="text-black"/>
            <div className="text-black text-base font-medium   leading-normal">Danh mục tiện ích</div>
          </div>

          <div className="w-fit flex justify-start items-center flex-wrap gap-2">
            {utility.map((i, index) => {
              return (
                i.value && (
                  <div className="nthd_category_item" key={index}>
                    {i.name}
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : (
        <UtilityDirectorySkeleton />
      )}
    </>
  );
};

export default UtilityDirectory;
