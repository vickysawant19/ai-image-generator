import axios from "axios";
import { serverUrl } from "./serverUrl";

export const getImage = async (prompt) => {
  try {
    const response = await axios.post(
      `${serverUrl()}generate`,
      { prompt },
      { timeout: 60000 }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    throw new Error("Failed to fetch the image. Please try again later.");
  }
};

export const savePost = async (post) => {
  try {
    const response = await axios.post(`${serverUrl()}post`, post);
    return response.data; // Return the relevant response data
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      console.error("Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    // Throw a custom error with context for the caller
    throw new Error("Failed to save the post. Please try again later.");
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${serverUrl()}post`);
    return response.data;
  } catch (error) {
    // Log specific error details
    if (error.response) {
      console.error("Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    throw new Error("Failed to fetch posts. Please try again later.");
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${serverUrl()}post`, { _id: id });
    return response.data;
  } catch (error) {
    console.error("Error Message:", error.message);
    throw new Error("Failed to delete post. Please try again later.");
  }
};
