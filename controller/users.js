const Users = require("../models/User");
const uuid = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

exports.getUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    const userData = await Users.getUserDetails(id);
    ctx.ok("User Details Fetched", { ...userData });
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};
exports.getUserByEmail = async (ctx) => {
  try {
    const { email } = ctx.params;
    console.log(email);
    const userDetail = await Users.getUserDetailsByEmail(email);
    ctx.ok("User Details Fetched By Email", { ...userDetail });
  } catch (error) {
    console.error("Error fetching user details by email", error);
  }
};

exports.createUser = async (ctx) => {
  try {
    const { name, email } = ctx.request.body;
    const id = uuid.v4();
    const data = await Users.createUser(id, name, email);
    ctx.ok("User created successfully", { ...data });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

exports.updateUser = async (ctx) => {
  try {
    const { name } = ctx.request.body;
    const { id } = ctx.params;
    const data = await Users.updateUser(id, name);
    ctx.ok("User updated successfully", { ...data });
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

exports.removeUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    await Users.deleteUser(id);
    ctx.ok("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
