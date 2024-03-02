import express from "express";
import { deleteUser, updateUser } from "./user.controller.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.json({ messsage: "from user " });
});
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export const userRoutes = router;
