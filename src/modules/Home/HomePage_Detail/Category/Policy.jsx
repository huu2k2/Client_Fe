import { BsBookmarkCheckFill } from "react-icons/bs";
import { useDataServices } from "@customhooks";
const Policy = () => {
  const [a, b, c, commissions] = useDataServices();
 
  return (
    <div className="w-full  gap-5 nthd_flex_col_between">
      <div className="w-[118px] h-6 nthd_text_medium_base nthd_flex_between">
        <BsBookmarkCheckFill />
        <span>Chính sách</span>
      </div>

      <div className=" w-full ">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="h-10 bg-[#F9FAFB]">
              <th className="nthd_policy_item_th">Thời hạn hợp đồng</th>
              <th className="nthd_policy_item_th">Đặt cọc</th>
              <th className="nthd_policy_item_th">Hoa hồng</th>
            </tr>
          </thead>
          <tbody>
            {commissions &&
              commissions.map((i, index) => (
                <tr className="h-10" key={index}>
                  <td className="nthd_policy_item_td ">{i.month} tháng</td>
                  <td className="nthd_policy_item_td">{i.deposit} tháng</td>
                  <td className="nthd_policy_item_td">{i.commission} tháng</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Policy;
