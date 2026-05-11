import API from "../lib/axios";

export const adminSeriesList = (p = 1) => {
  return API.get(`/series?page=${p}&limit=20`);
};
export const adminSeriesCreate = (body) => {
  return API.post("/admin/series", body);
};
export const adminSeriesUpdate = (id, body) => {
  return API.put(`/admin/series/${id}`, body);
};
export const adminSeriesDelete = (id) => {
  return API.delete(`/admin/series/${id}`);
};

export const adminTestList = (type, p = 1, seriesId) => {
  return API.get(
    `/admin/tests/${type}?page=${p}&limit=20${seriesId ? `&seriesId=${seriesId}` : ""}`,
  );
};
export const adminGetTestOne = (type, id) => {
  return API.get(`/admin/test/${type}/${id}`);
};
export const adminTestCreate = (type, body) => {
  return API.post(`/admin/tests/${type}`, body);
};
export const adminTestUpdate = (type, id, body) => {
  return API.put(`/admin/tests/${type}/${id}`, body);
};
export const adminDeleteTest = (type, id) => {
  return API.delete(`/admin/tests/${type}/${id}`);
};
export const adminPublishTest = (type, id, pub) => {
  return API.patch(`/admin/tests/${type}/${id}/publish`, { isPublished: pub });
};
export const adminUploadAudio = (formData) => {
  return API.post("/admin/upload/audio", formData);
};
export const adminUploadImage = (formData) => {
  return API.post("/admin/upload/image", formData);
};

export const adminSelfPracticeCreate = ({ data, type }) => {
  return API.post(`/admin/selfPractice/${type}`, data);
};
export const adminSelfPracticeUpdate = ({ data, type, id }) => {
  return API.put(`/admin/selfPractice/${type}/${id}`, data);
};
export const adminSelfPracticeDelete = ({ id, type }) => {
  return API.delete(`/admin/selfPractice/${type}/${id}`);
};
