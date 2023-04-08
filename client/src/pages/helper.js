import axios from "axios";
// Base url:-https://brave-housecoat-fox.cyclic.app/
export const getBlog = async () => {
  const res = await axios.get(`https://brave-housecoat-fox.cyclic.app/blogs/get/blog`);
  const data = await res.data;
  return data;
};

export const getUser = async () => {
    const res = await axios.get(`https://brave-housecoat-fox.cyclic.app/users/get`);
    const data = await res.data;
    return data;
  };