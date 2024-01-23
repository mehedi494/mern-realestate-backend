import express from "express";
import { sign_up } from "./auth.controller.js";
const router = express.Router();
router.post("/sign-up", sign_up);

export const authRoutes = router;
