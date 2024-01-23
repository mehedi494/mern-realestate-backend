import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.json({messsage:"from user "});
});

export const userRoutes = router;
