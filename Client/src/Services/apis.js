const BASE_URL = "http://localhost:8000/api/v1";

// AUTH ENDPOINTS
export const AuthEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}




// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/Category/showAllCategories",
}

