import axios from "axios";
export const getBlog = async () => {
  const res = await axios.get(`http://localhost:8080/blogs/get/blog`);
  const data = await res.data;
  return data;
};

export const getUser = async () => {
    const res = await axios.get(`http://localhost:8080/users/get`);
    const data = await res.data;
    return data;
  };