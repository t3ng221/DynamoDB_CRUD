const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
});

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

exports.createUser = async (id, name, email) => {
  const params = {
    TableName: "users",
    Item: {
      id: id,
      name: name,
      email: email,
    },
  };

  try {
    await docClient.put(params).promise();
    console.log("User created successfully:");
  } catch (err) {
    console.error("Error creating User:", err);
    throw err;
  }
};

exports.getUserDetails = async (userId) => {
  const params = {
    TableName: "users",
    Key: {
      id: userId,
    },
  };

  try {
    const data = await docClient.get(params).promise();
    console.log("User details:", data);
    return data;
  } catch (err) {
    console.error("Error getting User details:", err);
    throw err;
  }
};
exports.getUserDetailsByEmail = async (email) => {
  const params = {
    TableName: "users",
    IndexName: "email",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  try {
    const data = await docClient.query(params).promise();
    console.log("User details BY Email:", data.Items);
    const userDetails = data.Items[0];
    if (userDetails) {
      return { name: userDetails.name, email: userDetails.email };
    }
  } catch (err) {
    console.error("Error getting User details by email:", err);
    throw err;
  }
};

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
    return true;
  } catch (err) {
    console.error("Error deleting User:", err);
    throw err;
  }
};
