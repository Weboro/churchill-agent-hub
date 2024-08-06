import axiosBaseURL from "../../baseUrl";

export const fetchAgentLinks = () => {
  return axiosBaseURL.get("/api/v1/cms/agent/agent-links");
};

export const fetchRecordedWebinar = () => {
  return axiosBaseURL.get("/api/v1/cms/agent/recorded-webinar");
};

export const fetchStaffDirectory = () => {
  return axiosBaseURL.get("/api/v1/cms/agent/staff-directory");
};

export const fetchUpcomingWebinar = () => {
  return axiosBaseURL.get("/api/v1/cms/agent/upcoming-webinar");
};

export const fetchNews = (slug) => {
  return axiosBaseURL.get(`/api/v1/edu_hub/news${slug ? `/${slug}` : ""}`);
};
