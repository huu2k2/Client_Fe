import axios from "axios";

const API_URL = import.meta.env.VITE_APP_ROOM_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Bộ lọc yêu cầu để thêm token vào header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Bộ lọc phản hồi để xử lý làm mới token
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra lỗi có phải là 401 Unauthorized và nếu đây không phải là lần thử lại
    if (error.response && (error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      // const refreshToken = sessionStorage.getItem("token"); // Đảm bảo bạn có token làm mới riêng
      try {
        // sessionStorage.clear()
        //   window.location.href = '/login';
         
        // if (refreshToken) {
        //   const response = await axios.post(`http://14.225.254.188:8080/api/Accounts/refresh-token`, {refreshToken}, {
        //     headers: {
        //       'Authorization': `Bearer ${refreshToken}`,
        //       'accept': '*/*'
        //     }
        //   });

        //   const newToken = response.data.token;
        //   sessionStorage.setItem("token", newToken);
        //   axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        //   originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        //   return axiosInstance(originalRequest);
        // } else {
        //   // Xử lý trường hợp không có refreshToken
        //   console.error('Không tìm thấy refresh token.');
        // }
      } catch (refreshError) {
        // Xử lý lỗi khi làm mới token
        console.error('Lỗi khi làm mới token:', refreshError);
        // sessionStorage.clear(); // Xóa tất cả các token
        // Điều hướng đến trang đăng nhập hoặc hiển thị thông báo cho người dùng
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
