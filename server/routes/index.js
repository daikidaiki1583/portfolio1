const express = require("express");
const app = express();
const port = 9000;

const bodyparser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const mysql = require("mysql");
const db = mysql.createPool({
  host: "ip-10-0-24-237.ap-northeast-1.compute.internal",
  user: "guestuser",
  port: 3306,
  password: "mfSndby1s#",
  database: "training",
});

app.use(
  cors({
    credentials: true,
    origin: "https://kintrecord.link",
  })
);

app.use(express.json());
app.use(bodyparser.json({ type: "application/json" }));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/api/get/training", (req, res) => {
  const sqlSelect = "SELECT * FROM training order by tr_id";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM trainingrecord WHERE id = ?;";
  db.query(sqlDelete, [id], (err, result) => {
    if (err) console.log(err);
  });
});

app.get("/api/get/trainingrecord", (req, res) => {
  const { dt } = req.query;
  const sqlSelect = `SELECT * FROM trainingrecord join training on trainingrecord.trainingid = training.tr_id where dt = "${dt}" order by createdAt`;
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get("/api/get/trainingrecord/graph", (req, res) => {
  const { start, end } = req.query;
  const sqlSelect = `SELECT * FROM trainingrecord join training on trainingrecord.trainingid = training.tr_id where dt <= "${end}" and dt >= "${start}" order by createdAt`;
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get("/api/get/trainingrecord/distinct/", (req, res) => {
  // const { dt } = req.query;
  const sqlSelect = `SELECT DISTINCT dt FROM trainingrecord order by dt desc limit 5`;
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/api/insert/:userid/", (req, res) => {
  const userid = req.params.userid;
  const { dt, trainingid, count } = req.body;
  const sqlInsert =
    "INSERT trainingrecord (userid,dt,trainingid,count) values (?,?,?,?);";
  db.query(sqlInsert, [userid, dt, trainingid, count], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//サインイン
app.post("/signin/", (req, res) => {
  const { username, password } = req.body;
  const sqlInsert = "INSERT user (name,password) values (?,?);";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return console.log(err);
    db.query(sqlInsert, [username, hash], (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(result);
    });
  });
});
// パスワード更新処理　追加必要

const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({
    secret: "testing",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      db.query(
        `select * from user where name = '${username}';`,
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) return console.log(err);
            console.log(result);
            done(null, user);
          });
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user[0].id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializeUser");
  const sqlFind = `select * from user where id = ${id}; `;
  db.query(sqlFind, (err, user) => {
    if (err) console.log(err);
    console.log(user[0]);
    done(null, user[0].name);
  });
});

app.post(
  "/login/",
  passport.authenticate("local", {
    session: true,
  }),
  (req, res) => {
    res.send(req.user);
  }
);

app.get("/api/getuser", (req, res) => {
  res.send(req.user);
});

const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("/etc/letsencrypt/archive/kintrecord.link/privkey1.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/archive/kintrecord.link/cert1.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/archive/kintrecord.link/chain1.pem"),
};

const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`listening at　port:${port}`);
});
