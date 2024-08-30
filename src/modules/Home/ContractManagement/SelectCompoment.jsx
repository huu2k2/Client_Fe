
import Select from 'react-select';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale'; // Để định dạng ngày theo locale tiếng Việt
import { debounce } from "@utils/Debounce";

const options = [
  { value: 'today', label: 'Hôm nay' },
  { value: 'yesterday', label: 'Hôm qua' },
  { value: '7 ago', label: '7 ngày trước' },
  { value: 'month ago', label: 'Tháng trước' },
  { value: 'select', label: 'Tùy chọn' },
];

const SelectCompoment = ({setIsShow,setDate}) => {
  const handleChangeDebounced = 
    debounce((selectedOption) => {
      const now = new Date();
      const formattedDate = format(now, 'dd/MM/yyyy', { locale: vi });

      switch (selectedOption.value) {
        case "today":
          setDate([formattedDate]);
          setIsShow(false); // Ẩn DatePicker nếu cần
          break;
        case "yesterday":
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          setDate([format(yesterday, "dd/MM/yyyy", { locale: vi })]);
          setIsShow(false); // Ẩn DatePicker nếu cần
          break;
        case "7 ago":
          const sevenDaysAgo = new Date(now);
          sevenDaysAgo.setDate(now.getDate() - 7);
          setDate([
            format(sevenDaysAgo, "dd/MM/yyyy", { locale: vi }),
            format(now, "dd/MM/yyyy", { locale: vi }),
          ]);
          setIsShow(false); // Ẩn DatePicker nếu cần
          break;
        case "month ago":
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const startOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
          const endOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
          
          // Định dạng ngày tháng
          const formattedStartOfLastMonth = format(startOfLastMonth, "dd/MM/yyyy", { locale: vi });
          const formattedEndOfLastMonth = format(endOfLastMonth, "dd/MM/yyyy", { locale: vi });
      
          // Thiết lập ngày
          setDate([formattedStartOfLastMonth, formattedEndOfLastMonth]);
          setIsShow(false);
          break;
        case "select":
          setIsShow(true);
          break;
        default:
          setDate([formattedDate]);
          break;
      }
    }
  );

  return (
    <div className="w-[150px] h-[38px]  bg-white rounded-md shadow border border-gray-300 justify-center items-center gap-2 inline-flex">

    <Select
    defaultValue={options[0]}
    options={options}
    onChange={handleChangeDebounced}
    className="w-full h-full text-gray-700 text-sm font-medium  leading-tight"
    
    />
    </div>
  );
};

export default SelectCompoment;
