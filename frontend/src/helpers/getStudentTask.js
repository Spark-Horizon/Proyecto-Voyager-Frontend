import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const getPendingTask = async (student_id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/student/pending/${student_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getActSummaryTask = async (student_id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/student/activitysum/${student_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    throw error;
  }
};