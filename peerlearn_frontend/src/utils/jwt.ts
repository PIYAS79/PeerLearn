// import { jwtDecode } from "jwt-decode";

// export const decodedToken = (token: string) => {
//   return jwtDecode(token);
// };
import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  try {
    if (!token || token.split('.').length !== 3) {
      return null;
    }
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};