import express from "express";
import { createListing } from "./listing.controller.js";
const router = express.Router();

router.post("/", createListing);

export const listingRoutes = router;
