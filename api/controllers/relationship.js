import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = async (req, res) => {
  const q = "SELECT folowerUserId from relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, result) => {
    if (err) {
      console.error("Error while liking", err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the comment." });
    }
    return res
      .status(200)
      .json(result.map((relationship) => relationship.folowerUserId));
  });
};

export const addRelationships = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    const q =
      "INSERT INTO relationships (folowerUserId, followedUserId) VALUES (?, ?)";
    const values = [userInfo.id, req.body.userid];

    console.log(values);

    db.query(q, values, (err, result) => {
      if (err) {
        console.error("err following", err);
        return res
          .status(500)
          .json({ error: "An error occurred while following the user" });
      }
      return res.status(200).json({ message: "following" });
    });
  });
};

export const deleteRelationships = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    const q =
      "DELETE FROM relationships WHERE folowerUserId = ? AND followedUserId = ?";

    db.query(q, [userInfo.id, req.query.userId], (err, result) => {
      if (err) {
        console.error("Error deleting like", err);
        return res
          .status(500)
          .json({ error: "An error occurred while deleting the like" });
      }
      return res.status(200).json({ message: "Unfollowed" });
    });
  });
};
