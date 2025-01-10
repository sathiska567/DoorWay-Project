import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/auth", // Replace with actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

const request = async (method, endpoint, data = {}, config = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data,
      ...config,
    });
    return response.data;
    
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const login = async (email, password) => {
  return await request("POST", "/login", { email, password });
};


export default {
  login
};
