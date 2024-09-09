// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export function decodeToken(token) {
  try {
    // Giải mã token và trả về payload
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
