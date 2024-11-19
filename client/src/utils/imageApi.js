import axios from "axios";
import { serverUrl } from "./serverUrl";

export const getImage = async (prompt) => {
  try {
    const response = await axios.post(`${serverUrl()}generate`, { prompt });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching the image:", error);
    throw error;
  }
};

export const savePost = async (post) => {
  try {
    let response = await axios.post(`${serverUrl()}post`, post);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async () => {
  console.log(`${serverUrl()}/generate`);
  try {
    let data = await axios.get(`${serverUrl()}post`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
