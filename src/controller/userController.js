import Crudlistuser from "../services/Crudlistuser";

const createUser = async (req, res) => {
  try {
    //vadidate

    let data = await Crudlistuser.createNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      EM: "error from sever",
      EC: "",
      DT: "",
    });
  }
};
const readUser = async (req, res) => {
  try {
    console.log("check", req.cookies);

    if (req.query.limit && req.query.page) {
      let page = req.query.page;
      let limit = req.query.limit;
      let user = await Crudlistuser.getUserPagination(+page, +limit);
      return res.status(200).json({
        EM: user.EM,
        EC: user.EC,
        DT: user.DT,
      });
    } else {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log("handle error controller:", e.message);
    return res.status(500).json({
      EM: "error from sever",
      EC: "",
      DT: "",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    let data = await Crudlistuser.updateAUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      EM: "error from sever",
      EC: "",
      DT: "",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    let data = await Crudlistuser.deleteAUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      EM: "error from sever",
      EC: "",
      DT: "",
    });
  }
};
const getUserAccount = async (req, res) => {
  try {
    console.log("check user âkakakak", req.user, "and", req.token);
    return res.status(200).json({
      EM: "ok from getuser account",
      EC: 0,
      DT: req.user,
    });
  } catch (e) {
    console.log("error from usercontroller:", e.message);
  }
};

module.exports = {
  createUser,
  readUser,
  deleteUser,
  updateUser,
  getUserAccount,
};
