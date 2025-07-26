// utils/auth.js (create this file)
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  // You can also add token expiry check here if using JWT
  return Boolean(token); // Just check if token exists
};
    