import express from "express";
import { createListing, deleteListing, updateListing } from "./listing.controller.js";
import { verifieUser } from "../../utils/verifieUser.js";
const router = express.Router();

router.post("/", verifieUser, createListing);
router.delete("/delete/:id", verifieUser, deleteListing);
router.post("/update/:id", verifieUser, updateListing);

export const listingRoutes = router;
