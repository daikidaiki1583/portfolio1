const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 9000;

const db = mysql.createPool({
  host: "ip-10-0-24-237.ap-northeast-1.compute.internal",
  user: "guestuser",
  port: 3306,
  password: "mfSndby1s#",
  database: "training",
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.json({ type: "application/json" }));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/api/get/training", (req, res) => {
  const sqlSelect = "SELECT * FROM training order by id";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
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

app.listen(port, () => {
  console.log(`listening at　port:${port}`);
});
