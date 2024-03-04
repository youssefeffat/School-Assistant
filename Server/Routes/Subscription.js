const express = require('express');
const router = express.Router();
const {Pool}  = require('pg')
const bodyParser = require('body-parser');
// const pool = require("./dataBase.js");


//Subscription
router.post('/', async (req, res) => {   
    try {
        const {email} = req.body;
        const createMessageQuery = `
            INSERT INTO Subscription (Mail)
            VALUES ($1)
            RETURNING *
        `;
        const newMessage = await pool.query(createMessageQuery, [email]);
        res.status(200).send("Message Sent");

    } catch (error) {
        console.error("Error during message:", error.message);
        res.status(400).send(error.message);
    }
});

module.exports = router;