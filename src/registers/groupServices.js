import axios from "../setupAxios/axios";

const fetchGroup = async () => {
  return await axios.get(`/api/v1/group/read`);
};

export { fetchGroup };
