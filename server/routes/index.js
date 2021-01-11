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

app.get("api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM user";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`listening at　port:${port}　`);
});
