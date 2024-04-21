import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = async (req, res) => {
  const q = "SELECT userId from likes WHERE postId = ?";

  db.query(q, [req.query.postId], (err, result) => {
    if (err) {
      console.error("Error while liking", err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the comment." });
    }
    return res.status(200).json(result.map((like) => like.userId));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    const q = "INSERT INTO Likes (userId, postId) VALUES (?, ?)";
    const values = [userInfo.id, req.body.postId];

    console.log(values);

    db.query(q, values, (err, result) => {
      if (err) {
        console.error("err liking", err);
        return res
          .status(500)
          .json({ error: "An error occurred while liking the post." });
      }
      return res.status(200).json({ message: "Post has been liked" });
    });
  });
};

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    const q = "DELETE FROM Likes WHERE userId = ? AND postId = ?";

    db.query(q, [userInfo.id, req.query.postId], (err, result) => {
      if (err) {
        console.error("Error deleting like", err);
        return res
          .status(500)
          .json({ error: "An error occurred while deleting the like" });
      }
      return res.status(200).json({ message: "post hass been disliked" });
    });
  });
};
