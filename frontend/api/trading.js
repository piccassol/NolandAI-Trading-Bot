import axios from "axios";

const API_URL = "http://your-backend-ip:8000";  // Replace with your backend URL

export const getTokenPrice = async (tokenAddress) => {
  const res = await axios.get(`${API_URL}/prices/${tokenAddress}`);
  return res.data;
};

export const executeTrade = async (symbol, orderType, amount) => {
  const res = await axios.post(`${API_URL}/trade/${symbol}/${orderType}/${amount}`);
  return res.data;
};
