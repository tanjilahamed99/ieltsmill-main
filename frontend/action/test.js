import API from "../lib/axios";

export const updateTestSession = ({ testId, sessionData }) => {
  return API.put(`/test/test-sessions/${testId}`, sessionData);
};

export const getTestSession = ({ testId }) => {
  return API.get(`/test/test-sessions/${testId}`);
};

export const deleteTestSession = ({ testId }) => {
  return API.delete(`/test/test-sessions/${testId}`);
};
