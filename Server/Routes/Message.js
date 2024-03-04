const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwtGenerator = require("../Utils/jwtGenerator");
const authorize = require("../Middleware/authorize");
// const pool = require("./dataBase.js");
// Contact
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const createMessageQuery = `
            INSERT INTO Message (UserName, Mail, Message)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const newMessage = await pool.query(createMessageQuery, [name, email, message]);
        res.status(200).send("Message Sent");

    } catch (error) {
        console.error("Error during message:", error.message);
        res.status(400).send(error.message);
    }
});
module.exports = router;