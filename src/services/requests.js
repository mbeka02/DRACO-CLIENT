import axios from "axios";
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const fetchUser = async () => {
  const response = await instance.get(`/api/v1/user/showUser`, {
    // withCredentials: true,
  });
  return response.data;
};
const fetchAvatar = async () => {
  const response = await instance.get(`/api/v1/user/avatar`);
  return response.data;
};
const fetchProfile = async () => {
  const response = await instance.get(`/api/v1/user/profile`);
  return response.data;
};
const fetchAllPosts = async () => {
  const response = await instance.get("/api/v1/test/posts");
  return response.data;
};

const fetchUserPosts = async () => {
  const response = await instance.get("/api/v1/test/posts/myPosts");
  return response.data;
};

const fetchComments = async (postId) => {
  const response = await instance.get(`/api/v1/test/posts/${postId}`);
  return response.data;
};

const fetchTutors = async () => {
  const response = await instance.get("/api/v1/tutors");
  return response.data;
};

const fetchTutor = async (tutorId) => {
  const response = await instance.get(`/api/v1/tutors/${tutorId}`);
  return response.data;
};

export {
  fetchUser,
  fetchProfile,
  fetchAvatar,
  fetchTutors,
  fetchTutor,
  fetchComments,
  fetchAllPosts,
  fetchUserPosts,
};
