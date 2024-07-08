import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { vi } from "date-fns/locale";

// Component DatePicker
const DatePicker = ({setDate}) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const handleDayClick = (day) => {
    if (day) {
      const newSelected = [...selectedDates];

      // Sắp xếp các ngày đã chọn theo thứ tự từ sớm đến muộn

      // Nếu chọn quá 2 ngày, giữ lại ngày sớm nhất và muộn nhất
      if (newSelected.length > 1) {
        if (new Date(day) > new Date(newSelected[1])) {
          newSelected.pop();
        } else if (new Date(day) < new Date(newSelected[0])) {
          newSelected.shift();
        } else {
          if (
            new Date(day) - new Date(newSelected[0]) >
            new Date(newSelected[1]) - new Date(day)
          ) {
            newSelected.pop();
          } else {
            newSelected.shift();
          }
        }
      }
      newSelected.push(day);
      newSelected.sort((a, b) => a - b);
      setSelectedDates(newSelected);
      setDate(newSelected.map(date => format(date, 'dd/MM/yyyy', { locale: vi })))
    }
  };
 
  return (
    <DayPicker
      mode="multiple"
      numberOfMonths={2}
      pagedNavigation
      selected={selectedDates}
      onDayClick={handleDayClick}
      locale={vi}
    />
  );
};

export default DatePicker;
