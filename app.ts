import http from "http";
import express from "express";
var path = require("path");
// This will be our application entry. We'll setup our server here.
// Set up the express app
const app = express();

// // Log requests to the console.
// // app.use(logger("dev"));
// // app.use(cors()); // To resolve No 'Access-Control-Allow-Origin' header issue.
// // app.use(express.static(path.join(__dirname, 'public')));

// // // Body parsers
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(globalErrorHandler);

// // Checking the connection with Database
// // const models = require("./src/models");

// // Sync Database
// // models.sequelize
// //   .sync()
// //   .then(() => console.log("Nice! Database looks cool"))
// //   .catch((err) => {
// //     console.log("Shit man! this crap happened with Database Update! ", err);
// //     throw new Error(err);
// //   });

// // Routes


// // Running server
const port = parseInt(process.env.PORT, 10) || 2000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => console.log("Server is listening on port: ", port));
module.exports = app;

