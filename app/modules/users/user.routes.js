import express from "express";
import { update } from "./user.controller.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.json({messsage:"from user "});
});
router.post("/update/:id",update )

export const userRoutes = router;
