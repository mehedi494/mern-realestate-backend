import express from "express";
import { googleSignIn, signOut, sign_in, sign_up } from "./auth.controller.js";
const router = express.Router();
router.post("/sign-up", sign_up);
router.post("/sign-in", sign_in);
router.post("/google", googleSignIn);
router.delete("/sign-out", signOut);

export const authRoutes = router;
