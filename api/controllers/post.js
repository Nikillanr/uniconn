import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }

    const q =
      "SELECT p.*, u.id as userid, name, profilePic FROM posts as p JOIN users as u ON (u.id = p.userid) LEFT JOIN relationships as r ON (p.userid = r.followedUserId) WHERE r.folowerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";

    db.query(q, [userInfo.id, userInfo.id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    const q = "INSERT INTO posts (de, img, createdAt, userid) VALUES (?,?,?,?)";
    const values = [
      req.body.de, // Make sure to handle undefined or null values
      req.body.img, // Make sure to handle undefined or null values
      moment().format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    console.log(values);

    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error inserting post:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while creating the post." });
      }
      return res.status(200).json({ message: "Post has been created" });
    });
  });
};
