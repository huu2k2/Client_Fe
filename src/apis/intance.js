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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("token");
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/Accounts/refresh-token`, { refreshToken });
          const newToken = response.data.token;
          localStorage.setItem("token", newToken);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          // Handle no refreshToken case
          console.error('No refreshToken found.');
        }
      } catch (refreshError) {
        // Handle refresh token error
        console.error('Failed to refresh token:', refreshError);
        localStorage.clear(); // Clear tokens
        // Redirect or handle logout
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
