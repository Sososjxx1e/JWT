import groupServcies from "../services/groupServcies";

const readGroup = async (req, res) => {
  try {
    let data = await groupServcies.groupServiceRead();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log("error group controller:", e.message);
    return res.status(500).json({
      EM: "ERROR FROM CONTROLLER",
      EC: -2,
      DT: "",
    });
  }
};

module.exports = {
  readGroup,
};
