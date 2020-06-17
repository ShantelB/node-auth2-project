const express = require("express");
const helmet = require("helmet");
const morgan = require('morgan');
const cors = require("cors");
// const session = require("express-session"); // install this library
// const KnexSessionStore = require("connect-session-knex")(session); // install library

const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
// const requiresAuth = require("./auth/requires-auth");
// const dbConnection = require("./database/connection");

const server = express();

// const sessionConfig = {
//   name: "monster",
//   secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
//   cookie: {
//     maxAge: 1000 * 60 * 10, // 10 mins in milliseconds
//     secure: process.env.COOKIE_SECURE || false, // true means use only over https
//     httpOnly: true, // JS code on the client cannot access the session cookie
//   },
//   resave: false,
//   saveUninitialized: true, // GDPR compliance, read the docs
//   store: new KnexSessionStore({
//     knex: dbConnection,
//     tablename: "sessions",
//     sidfieldname: "sid",
//     createtable: true,
//     clearInterval: 6000, // delete expired sessions - in milliseconds
//   }),
// };

server.use(logger);
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
// server.use(session(sessionConfig)); // turn on sessions

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send(`WELCOME TO WILLY WONKA'S CHOCOLATE FACTORY`)
});

server.get("/api", (req, res) => {
  res.send(`Keep Going!!!!`)
});

function logger(req, res, next){
  const {method, url} = req;

  const timestamp = Date.now().toString();

  console.log(`${method} to ${url} @ ${timestamp}`);
 
  next();
}

module.exports = server;
