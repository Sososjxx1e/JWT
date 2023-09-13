import db from "../../server/models/index";
import bcrypt, { hash } from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

import RegisterSevices from "../services/RegisterSevices";

const hashPassWordUser = (usersPassword) => {
  let hashPassWord = bcrypt.hashSync(usersPassword, salt);
  return hashPassWord;
};

const getAllUser = async () => {
  try {
    let user = await db.User.findAll({
      attributes: ["id", "email", "username", "phone"],
      include: {
        model: db.group,
        attributes: ["id", "name", "description"],
      },
      raw: true,
      nest: true,
    });

    if (user) {
      console.log("check user", user);
      return {
        EM: "get data success",
        EC: 0,
        DT: user,
      };
    } else {
      console.log("user dont have");
    }
  } catch (e) {
    console.log("handle error services:", e.message);
    return {
      EM: "error services from sever",
      EC: -2,
      DT: "",
    };
  }
};
const getUserPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      attributes: ["id", "email", "username", "phone", "sex", "address"],
      include: {
        model: db.group,
        attributes: ["id", "name", "description"],
      },
      order: [["id", "DESC"]],
      limit: limit,
    });

    let totalPage = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPage: totalPage,
      user: rows,
    };

    return {
      EM: "check offset limit",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log("error getuserpagination (services):", e.message);
    return {
      EM: "error from sever",
      EC: "",
      DT: "",
    };
  }
};

const createNewUser = async (data) => {
  try {
    let email = await RegisterSevices.checkEmail(data.email);
    let phone = await RegisterSevices.checkPhone(data.phone);
    if (email === true) {
      return {
        EM: "Email aready exsist",
        EC: 1,
        DT: "email",
      };
    }
    if (phone === true) {
      return {
        EM: "phone aready exsist",
        EC: 1,
        DT: "phone",
      };
    }
    let pass = hashPassWordUser(data.password);
    console.log("check data", data);
    await db.User.create({
      email: data.email,
      password: pass,
      phone: data.phone,
      username: data.username,
      address: data.address,
      sex: data.sex,
      groupId: data.group,
    });
    return {
      EM: "create ok ",
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e.message);
    return {
      EM: "error from sever",
      EC: -2,
      DT: "",
    };
  }
};

const updateAUser = async (data) => {
  try {
    if (!data.group) {
      return {
        EM: "empty group id from services",
        EC: 1,
        DT: "group",
      };
    }

    let user = await db.User.findOne({
      where: {
        id: data.id,
      },
    });

    if (user) {
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.group,
      });
      return {
        EM: "update success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "user not found ",
        EC: 2,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e.message);
    return {
      EM: "error from services",
      EC: "",
      DT: "",
    };
  }
};

const deleteAUser = async (id) => {
  try {
    let user = await db.User.destroy({
      where: { id: id },
    });
    if (user) {
      return {
        EM: "delete success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "user not exsist",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e.message);
    return {
      EM: "error services",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateAUser,
  deleteAUser,
  getUserPagination,
};
