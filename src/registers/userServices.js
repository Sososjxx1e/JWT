import axios from "../setupAxios/axios";

const registerNewUser = async (Email, Username, Phone, Password) => {
  return await axios.post("/api/v1/register", {
    Email,
    Username,
    Phone,
    Password,
  });
};
const loginUser = async (valuelogin, password) => {
  return await axios.post("/api/v1/login", {
    valuelogin,
    password,
  });
};

const fetchAllUser = async (page, limit) => {
  return await axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};
const deleteUser = async (user) => {
  return await axios.delete(`/api/v1/user/delete`, {
    data: { id: user.id },
  });
};
const createNewUser = async (userdata) => {
  return await axios.post("/api/v1/user/create", {
    ...userdata,
  });
};
const updateCurrentUser = async (userdata) => {
  return await axios.put("/api/v1/user/update", {
    ...userdata,
  });
};
const getUserAccount = async () => {
  return axios.get("/api/v1/account");
};
export {
  registerNewUser,
  getUserAccount,
  loginUser,
  fetchAllUser,
  deleteUser,
  createNewUser,
  updateCurrentUser,
};
