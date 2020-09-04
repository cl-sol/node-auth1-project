const express = require("express");
const server = express();
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const db = require("./data/dbconfig");
const userRouter = require("./routers/user/user-router");

server.use(session({
    resave: false, //avoids recreating sessions that haven't changed
    saveUninitialized: false, //to comply w GDPR laws
    secret: "keep it secret, keep it safe", //cryptographiaclly sign cookie
    store: new KnexSessionStore({
        knex: db,
        createtable: true
    })
}))
server.use(express.json());
server.use("/api", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({
      message: "and we're live"
  });
});

module.exports = server;