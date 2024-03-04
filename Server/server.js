// Import All Dependencies
const dotenv = require('dotenv');
const express = require('express');
// const {Pool}  = require('pg')
const bodyParser = require('body-parser');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const pool = require('./database');
// const router = express.Router();
// const authorize = require("./Middleware/authorize");

// Configure ENV File & Require Connection File
dotenv.config();
const port = process.env.PORT || 3001;

// Create Server
const app = express();

// Middleware
const authenticate = require('./Middleware/authorize');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));


//Routes

app.use("/Authentification", require("./Routes/Auth"));
app.use("/Message", require("./Routes/Message"));
app.use("/Subscription", require("./Routes/Subscription"));
app.use("/Document", require("./Routes/Document"));  

{/*------------------------------------------APIs------------------------------------------------------------ */}

app.get('/', (req, res) => {
    res.send("Hello World");
    res.json({ message: "Welcome to bezkoder application." });
    res.status(200).send("Welcome to bezkoder application.");
})

// Registration
app.post('/Signup', async (req, res) => {
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
        res.status(200).send("Registered");

    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(400).send(error.message);
    }
})

// Login User
app.post('/Login', async (req, res) => {

    console.log(req.body.password);
    console.log(req.body.username);
    console.log(req.body.email);
    console.log("Api got to the backend");
    
    //const { email, password } = req.body;
    try {
        const { email, password } = req.body;
        // Find User 
        const userQuery = `SELECT * FROM Users WHERE Mail = $1`;
        const userData = await pool.query(userQuery, [email]);
        const user = userData.rows[0];
        if (user) {
            //Verify Password
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
                // // Generate Token
                // const token = jwt.sign(
                //     { userId: user.user_id },
                //     process.env.JWT_SECRET, 
                //     {expiresIn: '24h'} 
                // );

                // res.cookie("jwt", token, {
                //     expires: new Date(Date.now() + 86400000),
                //     httpOnly: true
                // })
                res.status(200).send("LoggedIn");
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

// Login Admin User
app.post('/AdminLogin', async (req, res) => {

    console.log(req.body.password);
    console.log(req.body.username);
    console.log(req.body.email);
    console.log("Api got to the backend");
    
    //const { email, password } = req.body;
    try {
        const { email, password } = req.body;
        // Find User 
        const userQuery = `SELECT * FROM Users WHERE Mail = $1 AND Admin = True`;
        const userData = await pool.query(userQuery, [email]);
        const user = userData.rows[0];
        if (user) {
            //Verify Password
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
                // // Generate Token
                // const token = jwt.sign(
                //     { userId: user.user_id },
                //     process.env.JWT_SECRET, 
                //     {expiresIn: '24h'} 
                // );

                // res.cookie("jwt", token, {
                //     expires: new Date(Date.now() + 86400000),
                //     httpOnly: true
                // })
                res.status(200).send("LoggedIn");
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

// Logout Page
app.get('/Logout', (req, res) => {
    res.clearCookie("jwt", { path: '/' })
    res.status(200).send("User Logged Out")
})

// Authentication
app.get('/auth', authenticate, (req, res)=>{

})


// Contact
app.post('/Contact/message', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        //console.log("body:", req.body);
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
})

//Subscription
app.post('/Subscription', async (req, res) => {   
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
    })


// Dashboard
app.post('/getTDs', async (req, res) => {
    const { firstChoice, secondChoice } = req.body;
    console.log("-------------------");   
    console.log("getTDs", firstChoice, secondChoice);

    try {
      // Construct and execute SQL query
      const query = `
      SELECT DISTINCT d.Doc_id, d.Name, d.Type, d.File_type, d.Link
      FROM Document d
      JOIN Subject s ON d.Subject_id = s.Subject_id
      JOIN Promo p ON s.Promo_id = p.Promo_id
      JOIN Users u ON p.Promo_id = u.Promo_id
      WHERE Spe = $2
      AND Niveau = $1
      AND type = 'TD';
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

app.post('/getTPs', async (req, res) => {
    const { firstChoice, secondChoice } = req.body;
    console.log("getTPs", firstChoice, secondChoice);

    try {
        // Construct and execute SQL query
        const query = `
        SELECT DISTINCT d.Doc_id, d.Name, d.Type, d.File_type, d.Link
        FROM Document d
        JOIN Subject s ON d.Subject_id = s.Subject_id
        JOIN Promo p ON s.Promo_id = p.Promo_id
        JOIN Users u ON p.Promo_id = u.Promo_id
        WHERE Spe = $2
        AND Niveau = $1
        AND type = 'TP';
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

app.post('/getCs', async (req, res) => {
    const { firstChoice, secondChoice } = req.body;
    console.log("getCs", firstChoice, secondChoice);

    try {
        // Construct and execute SQL query
        const query = `
        SELECT DISTINCT d.Doc_id, d.Name, d.Type, d.File_type, d.Link
        FROM Document d
        JOIN Subject s ON d.Subject_id = s.Subject_id
        JOIN Promo p ON s.Promo_id = p.Promo_id
        JOIN Users u ON p.Promo_id = u.Promo_id
        WHERE Spe = $2
        AND Niveau = $1
        AND type = 'Cours';
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

app.post('/removeDoc', async (req, res) => {
    try {
        console.log("Receved req, body:",req.body);
        const {item} = req.body;
        console.log("Item:", item);
        console.log("Item.id :", item.doc_id);
        const createMessageQuery = `
            DELETE FROM Document WHERE Doc_id = $1;
        `;
        const newMessage = await pool.query(createMessageQuery, [item.doc_id]);
        res.status(200).send("Message Sent");
        console.log("here");
    } catch (error) {
        console.log("Error:", error);
        console.error("Error during message:", error.message);
        res.status(400).send(error.message);
    }
})

app.post('/addDoc', async (req, res) => {
    try {
        // console.log("Receved req, body:",req.body);
        const { docName, Subject, Type, Link } = req.body.Add;
        // Insert new doc into the database
        const createUserQuery = `
            INSERT INTO Document (name, type, link)
            VALUES ($1, $2, $3)
        `;
        const newDoc = await pool.query(createUserQuery, [docName, Type, Link]);
        res.status(200).send("Doc Added");

    } catch (error) {
        console.error("Error during adding the doc :", error.message);
        res.status(400).send(error.message);
    }
});

app.post('/updateDoc', async (req, res) => {
    try {
        console.log("Received req");
        console.log("Receved req, body:",req.body);
        const { doc_id, name, type, file_type, link } = req.body;
        console.log("Item:", doc_id);
        console.log("Item.id :", name);
        console.log("Item.id :", type);
        console.log("Item.id :", file_type);
        console.log("Item.id :", link);
        // Insert new doc into the database
        const createUserQuery = `
            UPDATE document
            SET Name = $2, Type = $3, Link = $4
            WHERE doc_id = $1;
        `;
        const newDoc = await pool.query(createUserQuery, [doc_id, name, type, link]);
        res.status(200).send("Doc Added");
        console.log("here");
    } catch (error) {
        console.error("Error during adding the doc :", error.message);
        res.status(400).send(error.message);
    }
});
// Run Server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})







