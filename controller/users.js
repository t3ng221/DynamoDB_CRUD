const Users = require("../models/User");
const uuid = require("uuid");
exports.getUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    const userData = await Users.getUserDetails(id);
    ctx.body = { successCode: "User Details Fetched", userData };
  } catch (error) {
    console.log(error);
  }
};
exports.createUser = async (ctx) => {
  try {
    const { name } = ctx.request.body;
    const id = uuid.v4();
    const data = await Users.createUser(id, name);
    ctx.body = { data, message: "Created Successfully." };
  } catch (error) {
    console.log(error);
  }
};
exports.updateUser = async (ctx) => {
  try {
    const { name } = ctx.request.body;
    const { id } = ctx.params;
    const data = await Users.updateUser(id, name);
    ctx.body = { data, message: "Updated Successfully." };
  } catch (error) {
    console.log(error);
  }
};
exports.removeUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    const data = await Users.deleteUser(id);
    ctx.body = { data, message: "Deleted Successfully." };
  } catch (error) {
    console.log(error);
  }
};
