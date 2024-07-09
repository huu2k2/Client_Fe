import { parse, formatISO } from 'date-fns';
export function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Lấy tháng, đảm bảo 2 chữ số
    const day = ('0' + dateObj.getDate()).slice(-2); // Lấy ngày, đảm bảo 2 chữ số
    const year = dateObj.getFullYear(); // Lấy năm
  
   return `${year}-${month}-${day}`; 
  }
  export function formatDateType(inputDate) {
    const dateObj = new Date(inputDate);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Lấy tháng, đảm bảo 2 chữ số
    const day = ('0' + dateObj.getDate()).slice(-2); // Lấy ngày, đảm bảo 2 chữ số
    const year = dateObj.getFullYear(); // Lấy năm
    if(day && month && year){

      return `${day}/${month}/${year}`; 
    }
    return '--/--/--'
  }
  export function convertToDateISOString(dateString) {
    if (!dateString) return null; // Return null if dateString is undefined, null, or empty

    const parts = dateString.split('-'); // Split date string into parts
    if (parts.length !== 3) return null; // Ensure dateString has year, month, and day parts

    const year = parseInt(parts[0]); // Parse year
    const month = parseInt(parts[1]) - 1; // Parse month (subtract 1 for zero-indexed month)
    const day = parseInt(parts[2]); // Parse day

    if (isNaN(year) || isNaN(month) || isNaN(day)) return null; // Validate parsed values

    const dateObj = new Date(year, month, day); // Create Date object
    if (isNaN(dateObj.getTime())) return null; // Validate Date object

    const isoString = dateObj.toISOString(); // Convert to ISO string
    return isoString;
}

export function convertDateToISO(dateString) {
  // Tách các phần của ngày tháng năm
  const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());

  // Lấy thời gian hiện tại
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  // Thêm thời gian thực vào đối tượng ngày
  parsedDate.setHours(hours, minutes, seconds, milliseconds);

  // Chuyển đổi sang định dạng ISO 8601
  const isoString = formatISO(parsedDate);
  return isoString;
}