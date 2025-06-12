import axiosBaseURL from "../../../baseUrl";

export const FetchAgents = () => {
  const data = axiosBaseURL.get("/api/v1/cms/get-active-agents");
  return data;
};

export const AgentUserData = (slug) => {
  const data = axiosBaseURL.get(
    `/api/v1/cms/get-active-agents`
  );
  return data;
};

