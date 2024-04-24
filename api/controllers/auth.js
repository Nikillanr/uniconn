import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK IF USER EXISTS

  const q = "SELECT * FROM users WHERE username = ?";
  if (req.body.username.length < 4)
    return res.status(400).json("Username must be at least 4 characters");
  if (req.body.password.length < 8)
    return res.status(400).json("Password must be at least 8 characters");
  if (!req.body.name || !/^[a-zA-Z\s]+$/.test(req.body.name)) {
    return res.status(400).json("Name must contain only letters and spaces");
  }
  if (!req.body.email || !req.body.email.endsWith("@learner.manipal.edu")) {
    return res
      .status(400)
      .json("Email must be a valid learner.manipal.edu email");
  }

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");
    //CREATE USER
    //HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q = "INSERT INTO users (username,email,password,name) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");
    const checkpassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkpassword)
      return res.status(400).json("Wrong password or username");
    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User logged out");
};
