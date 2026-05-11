import API from "../lib/axios";

export const list = (type, p = 1, seriesId) => {
  return API.get(
    `/admin/tests/${type}?page=${p}&limit=20${seriesId ? `&seriesId=${seriesId}` : ""}`,
  );
};
export const listSeries = (page = 1) => {
  return API.get(`/test/series?page=${page}&limit=10`);
};
export const listTests = (type, page = 1, seriesId) => {
  return API.get(
    `/test/${type}?page=${page}&limit=10${seriesId ? `&seriesId=${seriesId.trim()}` : ""}`,
  );
};
export const getTest = (type, id) => {
  return API.get(`/test/${type}/${id}`);
};
export const startAttempt = (testType, testId, userId) => {
  return API.post("/test/attempts/start", { testType, testId, userId });
};
export const saveAnswers = (attemptId, answers, writingResponses) => {
  return API.put(`/test/attempts/${attemptId}/save`, {
    answers,
    writingResponses,
  });
};
export const submitAttempt = (
  attemptId,
  answers,
  writingResponses,
  timeSpent,
) => {
  return API.post(`/test/attempts/${attemptId}/submit`, {
    answers,
    writingResponses,
    timeSpent,
  });
};
export const getResult = (attemptId) => {
  return API.get(`test/attempts/${attemptId}/result`);
};
export const getUserAttempts = (userId, testType) => {
  return API.get(
    `/test/attempts?userId=${userId}${testType ? `&testType=${testType}` : ""}`,
  );
};
export const studentTotalAttempt = (userId) => {
  return API.get(`/auth/totalAttempt/${userId}`);
};

// Get single attempt details
export const getAttemptDetails = async (attemptId) => {
  try {
    const response = await API.get(`/test-attempts/${attemptId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Submit a test attempt
export const submitTestAttempt = async (attemptId, attemptData) => {
  try {
    const response = await API.put(
      `/test-attempts/${attemptId}/submit`,
      attemptData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new attempt
export const createTestAttempt = async (attemptData) => {
  try {
    const response = await API.post("/test-attempts", attemptData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update attempt progress
export const updateAttemptProgress = async (attemptId, progressData) => {
  try {
    const response = await API.patch(
      `/test-attempts/${attemptId}`,
      progressData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const selfPracticeList = (type, page) => {
  return API.get(`/test/selfPractice/${type}?page=${page}`);
};
export const selfPracticeById = ({ id, type }) => {
  return API.get(`/test/selfPractice/${type}/${id}`);
};
