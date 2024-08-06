import Axios from "axios";
const axiosBaseURL = Axios.create({
  baseURL: "https://backend.churchill.nsw.edu.au",
});

export default axiosBaseURL;

export const baseUrl = "https://backend.churchill.nsw.edu.au";
