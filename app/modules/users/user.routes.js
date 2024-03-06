import express from "express";
import { verifieUser } from "../../utils/verifieUser.js";
import { deleteUser, updateUser } from "./user.controller.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.json({ messsage: "from user " });
});
router.post("/update/:id", verifieUser, updateUser);
router.delete("/delete/:id",verifieUser, deleteUser);


export const userRoutes = router;
