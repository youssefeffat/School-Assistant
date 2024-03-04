
//--------------------------------------------------  Connect DataBase and Server -------------------------------------------------------//

const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "projet",
    host: "localhost",
    port: 5432,
    database: "projet"

});


module.exports = pool;



// require("dotenv").config();
// const {Client} = require("pg");

// const client = new Client({ 
//     user: "postgres",
//     host:"localhost", 
//     database:"projet",
//     password:"projet",
//     port:5432
// });



// // const isProduction = process.env.NODE_ENV === "production";
// // const connectString = 'postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}';

// client.connect(function(err) {
//     if (err) throw err;
//     //console.log("Database is Connected!");
//   });

// module.exports = Client;