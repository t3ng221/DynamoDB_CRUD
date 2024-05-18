const Users = require("../models/User");
const uuid = require("uuid");

exports.getUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { userData } = await Users.getUserDetails(id);
    ctx.response.ok("User Details Fetched", { ...userData });
  } catch (error) {
    ctx.response.internalServreError("Error fetching user details:", error);
  }
};
exports.getUserByEmail = async (ctx) => {
  try {
    const { email } = ctx.params;
    const userDetail = await Users.getUserDetailsByEmail(email);
    ctx.response.ok("User Details Fetched By Email", { ...userDetail });
  } catch (error) {
    ctx.response.internalServreError(
      "Error fetching user details by email",
      error
    );
  }
};

exports.createUser = async (ctx) => {
  try {
    const { name, email } = ctx.request.body;
    const id = uuid.v4();
    const data = await Users.createUser(id, name, email);
    console.log(data);
    ctx.response.ok("User created successfully", { ...data });
  } catch (error) {
    ctx.response.internalServreError("Error creating user:", error);
  }
};

exports.updateUser = async (ctx) => {
  try {
    const { name } = ctx.request.body;
    const { id } = ctx.params;
    const data = await Users.updateUser(id, name);
    ctx.response.ok("User updated successfully", { ...data });
  } catch (error) {
    ctx.response.internalServreError("Error updating user:", error);
  }
};

exports.removeUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    await Users.deleteUser(id);
    ctx.response.ok("User deleted successfully");
  } catch (error) {
    ctx.response.internalServreError("Error deleting user:", error);
  }
};
