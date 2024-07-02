import { BsBookmarkCheckFill } from "react-icons/bs";
import { useDataServices } from "@customhooks";
import PolicySkeleton from './CategorySkeleton/PolicySkeleton'
const Policy = () => {
  const [a, b, c, commissions] = useDataServices();
 
  return (
    <>
    {commissions ? 
    <div className="w-full  gap-5 nthd_flex_col_between">
      <div className="w-[118px] h-6 gap-2 nthd_text_medium_base nthd_flex_start">
        <BsBookmarkCheckFill />
        <span>Chính sách</span>
      </div>

      <div className=" w-full ">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="h-10 bg-[#F9FAFB]">
              <th className="nthd_policy_item_th w-1/3">Thời hạn hợp đồng</th>
              <th className="nthd_policy_item_th w-1/3">Đặt cọc</th>
              <th className="nthd_policy_item_th w-1/3">Hoa hồng</th>
            </tr>
          </thead>
          <tbody>
            {commissions &&
              commissions.map((i, index) => (
                <tr className="h-10" key={index}>
                  <td className="nthd_policy_item_td ">{i.month} tháng</td>
                  <td className="nthd_policy_item_td">{i.deposit} tháng</td>
                  <td className="nthd_policy_item_td">{i.commission} %</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    : <PolicySkeleton /> }
    </>
  );
};

export default Policy;
