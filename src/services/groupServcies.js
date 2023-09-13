const { where } = require("sequelize");
const db = require("../../server/models");

const groupServiceRead = async () => {
  try {
    let data = await db.group.findAll({
      order: [["name", "ASC"]],
      attributes: ["id", "name", "description"],
    });
    if (data) {
      return {
        EM: "get group succes",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "unexpected group ",
        EC: -1,
        DT: "",
      };
    }
  } catch (e) {
    console.log("error controller:", e.message);
    return {
      EM: "ERROR FROM CONTROLLER",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  groupServiceRead,
};
