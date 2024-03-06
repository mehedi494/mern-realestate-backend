import express from "express";
import { createListing,getUserListing } from "./listing.controller.js";
import { verifieUser } from "../../utils/verifieUser.js";
const router = express.Router();

router.post("/",verifieUser, createListing);
router.get("/:id", verifieUser,getUserListing);

export const listingRoutes = router;
