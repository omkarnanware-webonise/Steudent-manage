const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const saltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Pass@1234",
  database: "student_db",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const rollno = req.body.rollno;
  const dept = req.body.dept;

  db.query(
    "INSERT INTO student(name, address, rollno, dept) VALUES (?,?,?,?)",
    [name, address, rollno, dept],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Data Inserted");
      }
    }
  );
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const rollno = req.body.rollno;
  const dept = req.body.dept;
  db.query(
    "UPDATE student SET name = ?,address = ?,rollno = ?,dept = ? WHERE id = ?",
    [name, address, rollno, dept, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM student WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // const userRole = req.body.userRole;
  db.query(
    "SELECT * FROM userInfo WHERE username= ?",
    username,
    // userRole,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            res.send(result);
          } else {
            res.send({ message: "Please enter valid input" });
          }
        });
      } else {
        res.send({ message: "User does not exist" });
      }
    }
  );
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO userInfo (username ,password ) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.listen(5000, () => {
  console.log("server is running on 5000");
});
