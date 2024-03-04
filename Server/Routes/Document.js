// Import All Dependencies
const express = require('express');
const router = express.Router();
const {Pool}  = require('pg')
const bodyParser = require('body-parser');
// const pool = require("../dataBase.js");


router.post('/getTDs', async (req, res) => {
    const { firstChoice, secondChoice } = req.body;
    //console.log("getTDs", firstChoice, secondChoice);

    try {
      // Construct and execute SQL query
      const query = `
        SELECT User_name, Surname, Mail 
        FROM Users 
        WHERE User_name = $1 AND Surname = $2;
      `;
      const { rows } = await pool.query(query, [firstChoice, secondChoice ]);
        console.log(rows);
      // Send query results to frontend
      res.json(rows);
    } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/getTPs', async (req, res) => {
    const { firstChoice, secondChoice } = req.body;
    console.log("getTPs", firstChoice, secondChoice);

    try {
        // Construct and execute SQL query
        const query = `
        SELECT User_name, Surname, Mail 
        FROM Users 
        WHERE User_name = $1 AND Surname = $2;
        `;
        const { rows } = await pool.query(query, [firstChoice, secondChoice ]);
        console.log(rows);
        // Send query results to frontend
        res.json(rows);
    } catch (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/getCs', async (req, res) => {
    const { firstChoice, secondChoice } = req.body;
    console.log("getCs", firstChoice, secondChoice);

    try {
        // Construct and execute SQL query
        const query = `
        SELECT User_name, Surname, Mail 
        FROM Users 
        WHERE User_name = $1 AND Surname = $2;
        `;
        const { rows } = await pool.query(query, [firstChoice, secondChoice ]);
        console.log(rows);
        // Send query results to frontend
        res.json(rows);
    } catch (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;