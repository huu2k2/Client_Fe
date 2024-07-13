import { useState } from "react";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { vi } from "date-fns/locale";

// Component DatePicker
const DatePicker = ({ setDate }) => {
  const initialRange = {
    from: new Date(),
    to: addDays(new Date(), 1),
  };

  const [range, setRange] = useState(initialRange);

  const handleDayClick = (range) => {
    if (range?.from && range?.to) {
      setDate([
        format(range.from, "dd/MM/yyyy", { locale: vi }),
        format(range.to, "dd/MM/yyyy", { locale: vi }),
      ]);
    }
    setRange(range);
  };

  return (
    <DayPicker
      numberOfMonths={2}
      pagedNavigation
      onSelect={handleDayClick}
      mode="range"
      selected={range}
      locale={vi}
      className="my-day-picker"
    />
  );
};

export default DatePicker;
