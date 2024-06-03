import axios from "axios";
import { config } from "../src/common/config";
export const shortenUrl = async (originalUrl) => {
  try {
    const response = await axios.post(`${config.server_url}/shorten`, {
      originalUrl,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
