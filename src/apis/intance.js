import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra xem error.response có tồn tại không
    if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("token");
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/Accounts/refresh-token`, {}, {
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
              'accept': '*/*'
            }
          });
          const newToken = response.data.token;
          localStorage.setItem("token", newToken);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          // Xử lý trường hợp không có refreshToken
          console.error('Không tìm thấy refreshToken.');
        }
      } catch (refreshError) {
        // Xử lý lỗi khi làm mới token
        console.error('Lỗi khi làm mới token:', refreshError);
        localStorage.clear(); // Xóa token
        // Redirect hoặc xử lý logout
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
