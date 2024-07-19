const db = require("./dbConfig");

const createUser = async (username, email, password) => {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const [result] = await db.execute(sql, [username, email, password]);
  console.log("Signup", result);

  return result.insertId;
};

const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
};

module.exports = {createUser, findUserByEmail};
