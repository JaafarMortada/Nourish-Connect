import axios from "axios";
import { useStoreData } from "../global/store.jsx";




axios.defaults.baseURL = "http://127.0.0.1:8000";

export const sendRequest = async ({
  method = "GET",
  route,
  body,
  token = '',
  includeHeaders = true,
}) => {
  if (!route) throw Error("URL required");
  
  axios.defaults.headers.authorization = includeHeaders
    ? `Bearer ${token}`
    : "";

  try {
    const response = await axios.request({
      method,
      url: route,
      data: body,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
