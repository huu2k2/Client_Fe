
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
const Pagination = ({currentPage, setCurrentPage , totalPages}) => {
  // Giả sử có 10 trang và trang hiện tại là 2


  // Tạo danh sách số trang cần hiển thị
  const createPageNumbers = (currentPage, totalPages) => {
    const pageNumbers = [];
    const maxPagesToShow = 6; // Tổng số trang tối đa để hiển thị
    const half = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      // Nếu tổng số trang nhỏ hơn hoặc bằng số trang tối đa có thể hiển thị
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Nếu tổng số trang lớn hơn số trang tối đa có thể hiển thị
      if (currentPage <= half) {
        // Nếu trang hiện tại gần đầu danh sách
        for (let i = 1; i <= maxPagesToShow - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - half) {
        // Nếu trang hiện tại gần cuối danh sách
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Nếu trang hiện tại ở giữa danh sách
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - half + 1; i <= currentPage + half - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pages = createPageNumbers(currentPage, totalPages);

  const handlePageChange = (page) => {
    if (page === '...') return; // Không thay đổi trang khi nhấn vào "..."
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  return (
    <div className="w-[1360px] h-[38px] relative">
      <div className="w-[1360px] h-px absolute top-0 left-0 bg-gray-200" />
      <div className="w-[1360px] absolute top-0 left-0 flex justify-between items-center">
        {/* Phần nút "Trước" */}
        <div
          className={`flex-col justify-start items-start inline-flex cursor-pointer ${currentPage > 1 ? '' : 'text-gray-300'}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <div className="self-stretch h-0.5" />
          <div className="self-stretch pr-1 pt-4 flex justify-start items-center gap-3">
            <BsArrowLeft className="w-5 h-5" />
            <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Trước
            </div>
          </div>
        </div>

        {/* Phần các số trang */}
        <div className="flex items-center">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`flex-col justify-start items-start inline-flex cursor-pointer }`}
              onClick={() => handlePageChange(page)}
            >
              <div className={`self-stretch h-0.5 ${currentPage === page ? 'bg-rose-500' : ''}`} />
              <div className="self-stretch px-4 pt-4 flex justify-center items-start">
                <div className={`text-center text-sm font-medium leading-tight ${currentPage === page ? 'text-rose-600' : 'text-gray-500'}`}>
                  {page}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phần nút "Tiếp theo" */}
        <div
          className={`flex-col justify-start items-start inline-flex cursor-pointer ${currentPage < totalPages ? '' : 'text-gray-300'}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <div className="self-stretch h-0.5" />
          <div className="self-stretch pl-1 pt-4 flex justify-start items-center gap-3">
            <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">Tiếp theo</div>
            <BsArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
