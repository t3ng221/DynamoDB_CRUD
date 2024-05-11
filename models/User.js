const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

AWS.config.update({
  accessKeyId: "uiegal",
  secretAccessKey: "gynlvr",
  endpoint: "http://localhost:8000",
  region: "us-east-1",
});

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

exports.createUser = async (id, name) => {
  const params = {
    TableName: "users",
    Item: {
      id: id,
      name: name,
    },
  };

  try {
    const data = await docClient.put(params).promise();
    console.log("User created successfully:", data);
    return data;
  } catch (err) {
    console.error("Error creating User:", err);
    throw err;
  }
};

// Function to get users details by ID
exports.getUserDetails = async (userId) => {
  const params = {
    TableName: "users",
    Key: {
      id: userId,
    },
  };

  try {
    const data = await docClient.get(params).promise();
    console.log("User details:", data.Item);
    return data.Item;
  } catch (err) {
    console.error("Error getting User details:", err);
    throw err;
  }
};

// Function to update user details
exports.updateUser = async (id, name) => {
  const params = {
    TableName: "users",
    Key: {
      id: id,
    },
    UpdateExpression: "set #n = :name",
    ExpressionAttributeNames: {
      "#n": "name",
    },
    ExpressionAttributeValues: {
      ":name": name,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await docClient.update(params).promise();
    console.log("User updated successfully:", data);
    return data.Attributes;
  } catch (err) {
    console.error("Error updating User:", err);
    throw err;
  }
};

// Function to delete a userId by ID
exports.deleteUser = async (id) => {
  const params = {
    TableName: "users",
    Key: {
      id: id,
    },
  };

  try {
    const data = await docClient.delete(params).promise();
    console.log("User deleted successfully:", data);
    return data;
  } catch (err) {
    console.error("Error deleting User:", err);
    throw err;
  }
};
