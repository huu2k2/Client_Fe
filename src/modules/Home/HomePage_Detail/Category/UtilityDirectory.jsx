import { BsWifi } from "react-icons/bs";

const UtilityDirectory = () => {
  return (
    <div className="w-[312px] h-[80px] gap-5 mt-5 nthd_flex_col_between">
      <div className="w-[165px] h-6 gap-2 flex justify-between nthd_text_medium_base items-center">
        <BsWifi />
        <span>Danh mục tiện ích</span>
      </div>

      <div className="w-fit flex justify-start items-center gap-2">
        <div className="nthd_category_item">Thang máy</div>
        <div className="nthd_category_item">Thang máy</div>
        <div className="nthd_category_item">Thang máy</div>
      </div>
    </div>
  );
};

export default UtilityDirectory;
