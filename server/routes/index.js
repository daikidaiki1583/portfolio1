const express = require("express");
const app = express();
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const session = require("express-session");
const bodyparser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DBSERHOS,
  user: "guestuser",
  port: 3306,
  password: process.env.DBPASS,
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
app.use(
  session({
    secret: "testing",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//筋トレメニュー一覧取得
app.get("/api/get/training", (req, res) => {
  const sqlSelect = "SELECT * FROM training order by tr_id";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//削除
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM trainingrecord WHERE id = ?;";
  db.query(sqlDelete, [id], (err, result) => {
    if (err) console.log(err);
  });
});

//筋トレ記録取得
app.get("/api/get/trainingrecord/", (req, res) => {
  const { uid } = req.user;
  const { dt } = req.query;
  const sqlSelect = `SELECT id,name,menu,count FROM trainingrecord as tr inner join user as u on tr.userid = u.uid inner join training as t on tr.trainingid = t.tr_id where dt = "${dt}" AND userid = ${uid} order by createdAt`;
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//総トレーニング回数取得
app.get("/api/get/counttraining", (req, res) => {
  const { uid } = req.user;
  const sql = `select count(distinct dt) from trainingrecord where userid = ${uid};`;
  db.query(sql, (err, result) => {
    if (err) return console.log(err);
    console.log(result);
    res.send(result);
  });
});

//トレーニング期間取得
app.get("/api/get/trainingperiod", (req, res) => {
  const { uid } = req.user;
  const sql = `select MAX(dt),MIN(dt) from trainingrecord where userid = ${uid};`;
  db.query(sql, (err, result) => {
    if (err) return console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.get("/api/get/trainingrecord/alluser", (req, res) => {
  const { dt } = req.query;
  const sqlSelect = `SELECT id,name,menu,count FROM trainingrecord as tr inner join user as u on tr.userid = u.uid inner join training as t on tr.trainingid = t.tr_id where dt = "${dt}" order by createdAt desc;`;
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get("/api/get/trainingrecord/count/menu", (req, res) => {
  const { uid } = req.user;
  const sql = `select training.menu, sum(trainingrecord.count) as sum from trainingrecord inner join training on trainingrecord.trainingid = training.tr_id where trainingrecord.userid = "${uid}" group by training.menu;`;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//折れ線グラフ
app.get("/api/get/trainingrecord/graph/:trainingid", (req, res) => {
  const { uid } = req.user;
  const { trainingid } = req.params;
  const sqlSelect = `select trainingrecord.dt as date,sum(trainingrecord.count) as sum from trainingrecord inner join training on trainingrecord.trainingid = training.tr_id where trainingrecord.trainingid = "${trainingid}" AND trainingrecord.userid = "${uid}" group by trainingrecord.dt order by trainingrecord.dt;`;
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

//記録追加
app.post("/api/insert/", (req, res) => {
  const { uid } = req.user;
  const { dt, trainingid, count } = req.body;
  const sqlInsert =
    "INSERT trainingrecord (userid,dt,trainingid,count) values (?,?,?,?);";
  db.query(sqlInsert, [uid, dt, trainingid, count], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
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

passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      const pass = username === "ゲスト" ? process.env.GUESTUSERPASS : password;

      db.query(
        `select * from user where name = '${username}';`,
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          bcrypt.compare(pass, user[0].password, (err, result) => {
            if (err) return console.log(err);
            if (result) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user[0].uid);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializeUser");
  const sqlFind = `select * from user where uid = ${id}; `;
  db.query(sqlFind, (err, user) => {
    if (err) console.log(err);
    done(null, user[0]);
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

app.get("/api/getuser/", (req, res) => {
  if (req.user) {
    const { uid, name } = req.user;
    res.send({ uid, name });
  } else {
    res.send(null);
  }
});

app.get("/logout", (req, res) => {
  req.logOut();
  res.send("sucess");
});

//httpsサーバー
const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("/etc/letsencrypt/archive/kintrecord.link/privkey1.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/archive/kintrecord.link/cert1.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/archive/kintrecord.link/chain1.pem"),
};
const port = 9000;
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`listening at　port:${port}`);
});
