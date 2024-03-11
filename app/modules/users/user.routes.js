import express from "express";
import { verifieUser } from "../../utils/verifieUser.js";
import {
  deleteUser,
  getUser,
  getUserListing,
  updateUser,
} from "./user.controller.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.json({ messsage: "from user " });
});
router.post("/update/:id", verifieUser, updateUser);
router.delete("/delete/:id", verifieUser, deleteUser);

// only specifice users show his profile listings
router.get("/listings/:id", verifieUser, getUserListing);

// get user by _id  for another user send email 
router.get("/:id", verifieUser, getUser);

export const userRoutes = router;
