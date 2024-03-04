const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(User_id) {
  const payload = {
    user: {
      id: User_id
    }
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;