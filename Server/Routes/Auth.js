// Import All Dependencies
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwtGenerator = require("../Utils/jwtGenerator");
const authorize = require("../Middleware/authorize");
const pool = require("../dataBase.js");

/*----------------Authentication and Authorization Routes---------------------*/

// Registration
router.post('/Signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if the email already exists in the database
        const existingUser = await pool.query('SELECT * FROM Users WHERE Mail = $1', [email]);
        if (existingUser.rows.length > 0) {
            // If the email already exists, return an error response
            return res.status(401).send("Email address already exists");
        }
        // Hash the password before saving to the database
        const hashedPassword = await bcryptjs.hash(password, 10);
        // Insert user data into the database
        const createUserQuery = `
            INSERT INTO Users (User_name, Mail, Password)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const newUser = await pool.query(createUserQuery, [username, email, hashedPassword]);
        const jwtToken = jwtGenerator(newUser.rows[0].User_id);
        //res.status(200).send("Registered");
        res.json({ jwtToken });

    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(400).send(error.message);
    }
})

// Login User
router.post('/Login', async (req, res) => {

    // console.log(req.body.password);
    // console.log(req.body.username);
    // console.log(req.body.email);
    // console.log("Api got to the backend");
    
    const { email, password } = req.body;
    try {
        
        // Find User 
        const userQuery = `SELECT * FROM Users WHERE Mail = $1`;
        const userData = await pool.query(userQuery, [email]);
        const user = userData.rows[0];
        if (user) {
            //Verify Password
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
                // Generate Token
                const jwtToken = jwtGenerator(user.User_id);
                res.status(200).send("LoggedIn");
                res.json({ jwtToken });
            } else {
                res.status(410).send("Invalid Credentials");
            }

        } else {
            res.status(404).send("User not found");
        }

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(400).send(error.message);
    }
})

router.post("/verify", authorize, (req, res) => {
    console.log("Api got to the backend");
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

// Logout Page
router.get('/Logout', (req, res) => {
    res.clearCookie("jwt", { path: '/' })
    res.status(200).send("User Logged Out")
})





module.exports = router;