const UserModel = require("./user.model");
const logger = require("../../logger");

const addUser = async (data) => {
  try {
    const response = await UserModel.create(data);
    return response;
  } catch (err) {
    logger.error({ operation: "addUser", error: err.message });
    return err.message;
  }
};

const updateUser = async ({ data, email }) => {
  try {
    const response = await UserModel.update(data, { where: { email: email } });
    return response;
  } catch (err) {
    logger.error({ operation: "updateUser", error: err.message });
    return err.message;
  }
};
const getUsers = async () => {
  try {
    const response = await UserModel.findAll();
    return response;
  } catch (err) {
    logger.error({ operation: "getUsers", error: err.message });
    return err.message;
  }
};
const getSingleUser = async (email) => {
  try {
    const response = await UserModel.findOne({ where: { email: email } });
    return response;
  } catch (err) {
    logger.error({ operation: "getUsers", error: err.message });
    return err.message;
  }
};
const deleteUser = async (email) => {
  try {
    const response = await UserModel.destroy({ where: { email: email } });
    return response;
  } catch (err) {
    logger.error({ operation: "deleteUser", error: err.message });
    return err.message;
  }
};
module.exports = { addUser, getUsers, updateUser, deleteUser, getSingleUser };
