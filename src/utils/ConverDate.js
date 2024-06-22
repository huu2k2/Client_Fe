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
  
   return `${day}/${month}/${year}`; 
  }