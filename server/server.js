const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    key: "user",
    secret: "session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
//database connection==============================================
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "igclonedb",
});
//sign in =========================================================
app.post("/sign", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;
  const phonenumber = req.body.phone;
  db.query(
    "SELECT username FROM user_table WHERE username = ?",
    username,
    (err, row) => {
      if (err) {
        console.log(err);
      }

      if (!row.length) {
        db.query(
          "INSERT INTO user_table (email,username,name,password,phonenumber) VALUES (?,?,?,?,?)",
          [email, username, name, password, phonenumber],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      } else {
        res.send({ message: "user exist !!!" });
      }
    }
  );
});

//login============================================================
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM user_table WHERE username = ? AND password= ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        req.session.user = result;
        console.log(req.session.user);
        res.send(result);
      } else {
        res.send({ message: "Wrong pass or user" });
      }
    }
  );
});
app.post("/users", (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT * FROM user_table WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "user doesnt exist" });
      }
    }
  );
});
app.get("/getusers", (req, res) => {
  db.query("SELECT * from user_table ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("user", { domain: "http::/localhost:3000" });
  });
});
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }

  if (req.session.user == null) {
    res.send({ loggedIn: false, user: "" });
  }
});

app.put("/update", (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const bio = req.body.bio;
  const userid = req.body.userid;
  db.query(
    "UPDATE user_table SET username = ? , name = ? , email = ? , phonenumber = ? , bio = ? WHERE userid = ?",
    [username, name, email, phonenumber, bio, userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "SELECT * FROM user_table WHERE username = ?",
          username,
          (err1, qer) => {
            if (err1) {
              console.log(err1);
            }
            if (qer.length > 0) {
              req.session.user = qer;
              res.send(qer);
            } else {
              res.send({ message: "error" });
            }
          }
        );
      }
    }
  );
});
app.post("/getting", (req, res) => {
  const idUser = req.body.idUser;

  db.query(
    "SELECT username FROM user_followers,user_table WHERE user_id = userid AND user_id =? ",
    [idUser],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/follow", (req, res) => {
  const userid = req.body.userid;
  const followingid = req.body.followingid;
  db.query(
    "INSERT INTO user_followers (user_id ,following_id) VALUES (?,?) ",
    [userid, followingid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/getfollowers", (req, res) => {
  const userid = req.body.idUser;
  db.query(
    "SELECT * FROM user_table WHERE userid = ? ",
    [userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(userid);
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
