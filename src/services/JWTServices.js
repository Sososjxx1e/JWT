import db from "../../server/models/index";

const getGroupWithRole = async (user) => {
  try {
    let role = await db.group.findAll({
      attributes: ["id", "name", "description"],
      where: {
        id: user.groupId,
      },
      include: {
        model: db.role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },

      nest: true,
    });
    console.log("check role", role);
    return role ? role : {};
  } catch (e) {
    console.log("check error services", e.message);
  }
};
module.exports = {
  getGroupWithRole,
};
