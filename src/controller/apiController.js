import RegisterSevices from "../services/RegisterSevices";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "Ok",
    data: "test-api",
  });
};
const handleRegister = async (req, res) => {
  try {
    if (!req.body.Email || !req.body.Phone || !req.body.Password) {
      return res.status(200).json({
        EM: "error from sever",
        EC: 1,
        DT: "",
      });
    }
    if (req.body.Password && req.body.Password.length < 3) {
      return res.status(200).json({
        EM: "your password must have more than 3 letter",
        EC: 1,
        DT: "",
      });
    }
    // service create user
    let data = await RegisterSevices.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from sever",
      EC: "",
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let userdata = await RegisterSevices.handleUserLogin(req.body);
    // set cookie

    if (userdata && userdata.DT && userdata.DT.access_token) {
      res.cookie("jwt", userdata.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: userdata.EM,
      EC: userdata.EC,
      DT: userdata.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from sever",
      EC: "",
      DT: "",
    });
  }
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
