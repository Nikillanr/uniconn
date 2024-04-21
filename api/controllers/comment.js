import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q =
    "SELECT c.*, u.id as userid, name, profilePic FROM comments as c JOIN users as u ON (u.id = c.userid) WHERE c.postId = ? ORDER BY c.createdAt DESC";

  db.query(q, [req.query.postId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

export const addComments = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    const q =
      "INSERT INTO comments (de, createdAt, userid, postId) VALUES (?,?,?,?)";
    const values = [
      req.body.de, // Make sure to handle undefined or null values
      moment().format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];

    console.log(values);

    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error inserting post:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while creating the comment." });
      }
      return res.status(200).json({ message: "Comment has been created" });
    });
  });
};
